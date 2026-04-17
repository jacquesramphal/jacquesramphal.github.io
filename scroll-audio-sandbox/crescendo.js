class CrescendoSynth {
  constructor(ctx, outputNode) {
    this.ctx = ctx
    this.outputNode = outputNode  // engine.gainNode — feeds into existing analyser chain

    this.bpm = 120
    this.currentStep = 0
    this.nextStepTime = 0
    this.lookahead = 0.1      // seconds ahead to schedule
    this.tickInterval = 25    // ms between scheduler ticks
    this._timer = null
    this.running = false
    this.progress = 0

    // Pre-generated noise buffer shared by all hit types
    this._noiseBuffer = null

    // Layer config: threshold = scroll progress where layer starts fading in
    // window = progress range over which it goes from 0 to 1
    this.layers = [
      { id: 'tap',       threshold: 0.05, window: 0.15 },
      { id: 'kick',      threshold: 0.20, window: 0.15 },
      { id: 'hihat',     threshold: 0.38, window: 0.15 },
      { id: 'snare',     threshold: 0.55, window: 0.15 },
      { id: 'openhat',   threshold: 0.72, window: 0.15 },
      { id: 'kick4otf',  threshold: 0.88, window: 0.12 },
    ]
  }

  // ── Noise buffer ──────────────────────────────────────────

  _getNoise() {
    if (this._noiseBuffer) return this._noiseBuffer
    const len = this.ctx.sampleRate * 2
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    this._noiseBuffer = buf
    return buf
  }

  _noiseSource() {
    const src = this.ctx.createBufferSource()
    src.buffer = this._getNoise()
    // random start offset so each hit sounds slightly different
    src._offset = Math.random() * 1.5
    return src
  }

  // ── Scheduler ─────────────────────────────────────────────

  start() {
    if (this.running) return
    this.running = true
    this.currentStep = 0
    this.nextStepTime = this.ctx.currentTime + 0.05
    this._tick()
    this._timer = setInterval(() => this._tick(), this.tickInterval)
  }

  stop() {
    this.running = false
    if (this._timer) { clearInterval(this._timer); this._timer = null }
  }

  _stepDur() {
    return (60 / this.bpm) / 4  // 16th note in seconds
  }

  _tick() {
    while (this.nextStepTime < this.ctx.currentTime + this.lookahead) {
      this._scheduleStep(this.currentStep, this.nextStepTime)
      this.currentStep = (this.currentStep + 1) % 16
      this.nextStepTime += this._stepDur()
    }
  }

  // ── Layer gain ────────────────────────────────────────────

  setProgress(p) {
    this.progress = Math.max(0, Math.min(1, p))
  }

  _layerGain(id) {
    const layer = this.layers.find(l => l.id === id)
    if (!layer) return 0
    return Math.min(Math.max((this.progress - layer.threshold) / layer.window, 0), 1)
  }

  getActiveLayers() {
    return this.layers.filter(l => this._layerGain(l.id) > 0).length
  }

  getBeatPosition() {
    return this.currentStep / 16
  }

  // ── Step grid ─────────────────────────────────────────────

  _scheduleStep(step, when) {
    const g = (id) => this._layerGain(id)

    // Tap: 16th off-beats (odd steps)
    if (step % 2 === 1 && g('tap') > 0.01)
      this._tap(when, g('tap') * 0.22)

    // Kick: beats 1 and 3 (steps 0, 8)
    if ((step === 0 || step === 8) && g('kick') > 0.01)
      this._kick(when, g('kick') * 0.9)

    // Closed hi-hat: 8th notes (even steps)
    if (step % 2 === 0 && g('hihat') > 0.01)
      this._hihat(when, false, g('hihat') * 0.45)

    // Snare: beats 2 and 4 (steps 4, 12)
    if ((step === 4 || step === 12) && g('snare') > 0.01)
      this._snare(when, g('snare') * 0.85)

    // Open hi-hat: beat 3.5 (step 10)
    if (step === 10 && g('openhat') > 0.01)
      this._hihat(when, true, g('openhat') * 0.5)

    // 4-on-the-floor kick (adds beats 2 + 4, steps 4 and 12)
    if ((step === 4 || step === 12) && g('kick4otf') > 0.01)
      this._kick(when, g('kick4otf') * 0.8)

    // 16th fills on last two steps of each beat
    if ((step === 14 || step === 15) && g('kick4otf') > 0.01)
      this._tap(when, g('kick4otf') * 0.18)
  }

  // ── Synthesis ─────────────────────────────────────────────

  _kick(when, vol) {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(110, when)
    osc.frequency.exponentialRampToValueAtTime(0.01, when + 0.42)

    gain.gain.setValueAtTime(vol, when)
    gain.gain.exponentialRampToValueAtTime(0.001, when + 0.42)

    osc.connect(gain)
    gain.connect(this.outputNode)
    osc.start(when)
    osc.stop(when + 0.48)
  }

  _hihat(when, open, vol) {
    const src = this._noiseSource()
    const hp = this.ctx.createBiquadFilter()
    const gain = this.ctx.createGain()
    const decay = open ? 0.28 : 0.042

    hp.type = 'highpass'
    hp.frequency.value = 7200

    gain.gain.setValueAtTime(vol, when)
    gain.gain.exponentialRampToValueAtTime(0.001, when + decay)

    src.connect(hp)
    hp.connect(gain)
    gain.connect(this.outputNode)
    src.start(when, src._offset)
    src.stop(when + decay + 0.01)
  }

  _snare(when, vol) {
    // Noise body
    const ns = this._noiseSource()
    const bp = this.ctx.createBiquadFilter()
    const ng = this.ctx.createGain()

    bp.type = 'bandpass'
    bp.frequency.value = 1600
    bp.Q.value = 0.9

    ng.gain.setValueAtTime(vol * 0.65, when)
    ng.gain.exponentialRampToValueAtTime(0.001, when + 0.18)

    ns.connect(bp)
    bp.connect(ng)
    ng.connect(this.outputNode)
    ns.start(when, ns._offset)
    ns.stop(when + 0.2)

    // Tone body
    const osc = this.ctx.createOscillator()
    const og = this.ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.value = 240

    og.gain.setValueAtTime(vol * 0.35, when)
    og.gain.exponentialRampToValueAtTime(0.001, when + 0.09)

    osc.connect(og)
    og.connect(this.outputNode)
    osc.start(when)
    osc.stop(when + 0.12)
  }

  _tap(when, vol) {
    const src = this._noiseSource()
    const bp = this.ctx.createBiquadFilter()
    const gain = this.ctx.createGain()

    bp.type = 'bandpass'
    bp.frequency.value = 4200
    bp.Q.value = 2.2

    gain.gain.setValueAtTime(vol, when)
    gain.gain.exponentialRampToValueAtTime(0.001, when + 0.014)

    src.connect(bp)
    bp.connect(gain)
    gain.connect(this.outputNode)
    src.start(when, src._offset)
    src.stop(when + 0.02)
  }
}
