// ════════════════════════════════════════════════════════════
// Genre definitions — each genre specifies BPM, layer order,
// and a _schedule method that writes the step grid.
// Synthesis methods are shared across all genres.
// ════════════════════════════════════════════════════════════

const GENRES = {

  // ── TRAP ──────────────────────────────────────────────────
  trap: {
    label: 'Trap',
    bpm: 140,
    layers: [
      { id: 'tap',       threshold: 0.03, window: 0.12 },
      { id: 'kick',      threshold: 0.14, window: 0.14 },
      { id: 'hihat',     threshold: 0.26, window: 0.14 },
      { id: 'clap',      threshold: 0.36, window: 0.14 },
      { id: 'snare',     threshold: 0.46, window: 0.14 },
      { id: 'perc',      threshold: 0.55, window: 0.12 },
      { id: 'openhat',   threshold: 0.64, window: 0.12 },
      { id: '808bass',   threshold: 0.72, window: 0.14 },
      { id: 'rolls',     threshold: 0.84, window: 0.10 },
      { id: 'kick4otf',  threshold: 0.92, window: 0.08 },
    ],
  },

  // ── DANCEHALL ─────────────────────────────────────────────
  dancehall: {
    label: 'Dancehall',
    bpm: 92,
    layers: [
      { id: 'tap',       threshold: 0.03, window: 0.12 },
      { id: 'kick',      threshold: 0.12, window: 0.14 },
      { id: 'hihat',     threshold: 0.24, window: 0.14 },
      { id: 'snare',     threshold: 0.36, window: 0.14 },
      { id: 'perc',      threshold: 0.48, window: 0.12 },
      { id: 'bass',      threshold: 0.58, window: 0.14 },
      { id: 'openhat',   threshold: 0.70, window: 0.12 },
      { id: 'clap',      threshold: 0.80, window: 0.10 },
      { id: 'rolls',     threshold: 0.90, window: 0.10 },
    ],
  },

  // ── SOCA ──────────────────────────────────────────────────
  soca: {
    label: 'Soca',
    bpm: 138,
    layers: [
      { id: 'tap',       threshold: 0.03, window: 0.12 },
      { id: 'kick',      threshold: 0.12, window: 0.14 },
      { id: 'iron',      threshold: 0.24, window: 0.14 },
      { id: 'hihat',     threshold: 0.36, window: 0.14 },
      { id: 'snare',     threshold: 0.46, window: 0.14 },
      { id: 'bass',      threshold: 0.56, window: 0.12 },
      { id: 'clap',      threshold: 0.66, window: 0.12 },
      { id: 'openhat',   threshold: 0.76, window: 0.10 },
      { id: 'perc',      threshold: 0.84, window: 0.10 },
      { id: 'rolls',     threshold: 0.92, window: 0.08 },
    ],
  },

  // ── HIP-HOP ───────────────────────────────────────────────
  hiphop: {
    label: 'Hip-Hop',
    bpm: 90,
    layers: [
      { id: 'tap',       threshold: 0.03, window: 0.12 },
      { id: 'kick',      threshold: 0.14, window: 0.14 },
      { id: 'hihat',     threshold: 0.26, window: 0.14 },
      { id: 'snare',     threshold: 0.38, window: 0.14 },
      { id: 'bass',      threshold: 0.50, window: 0.14 },
      { id: 'perc',      threshold: 0.62, window: 0.12 },
      { id: 'openhat',   threshold: 0.72, window: 0.12 },
      { id: 'clap',      threshold: 0.82, window: 0.10 },
      { id: 'rolls',     threshold: 0.92, window: 0.08 },
    ],
  },
}


class CrescendoSynth {
  constructor(ctx, outputNode) {
    this.ctx = ctx
    this.outputNode = outputNode

    this.genre = 'trap'
    this.bpm = 140
    this.currentStep = 0
    this.nextStepTime = 0
    this.lookahead = 0.1
    this.tickInterval = 25
    this._timer = null
    this.running = false
    this.progress = 0
    this.barCount = 0

    this._noiseBuffer = null
    this._808shaper = null

    this.layers = GENRES.trap.layers
  }

  // ── Genre ───────────────────────────────────────────────

  setGenre(genre) {
    const def = GENRES[genre]
    if (!def) return
    this.genre = genre
    this.bpm = def.bpm
    this.layers = def.layers
  }

  // ── Noise / shaper ─────────────────────────────────────

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
    src._offset = Math.random() * 1.5
    return src
  }

  _getShaper() {
    if (this._808shaper) return this._808shaper
    const shaper = this.ctx.createWaveShaper()
    const curve = new Float32Array(256)
    for (let i = 0; i < 256; i++) {
      const x = (i / 128) - 1
      curve[i] = (Math.PI + 3) * x / (Math.PI + 3 * Math.abs(x))
    }
    shaper.curve = curve
    shaper.oversample = '2x'
    shaper.connect(this.outputNode)
    this._808shaper = shaper
    return shaper
  }

  // ── Scheduler ──────────────────────────────────────────

  start() {
    if (this.running) return
    this.running = true
    this.currentStep = 0
    this.barCount = 0
    this.nextStepTime = this.ctx.currentTime + 0.05
    this._tick()
    this._timer = setInterval(() => this._tick(), this.tickInterval)
  }

  stop() {
    this.running = false
    if (this._timer) { clearInterval(this._timer); this._timer = null }
  }

  _stepDur() { return (60 / this.bpm) / 4 }

  _tick() {
    while (this.nextStepTime < this.ctx.currentTime + this.lookahead) {
      this._scheduleStep(this.currentStep, this.nextStepTime)
      const prev = this.currentStep
      this.currentStep = (this.currentStep + 1) % 16
      if (prev === 15) this.barCount++
      this.nextStepTime += this._stepDur()
    }
  }

  // ── Layer gain ─────────────────────────────────────────

  setProgress(p) { this.progress = Math.max(0, Math.min(1, p)) }

  _layerGain(id) {
    const layer = this.layers.find(l => l.id === id)
    if (!layer) return 0
    return Math.min(Math.max((this.progress - layer.threshold) / layer.window, 0), 1)
  }

  getActiveLayers() {
    return this.layers.filter(l => this._layerGain(l.id) > 0).length
  }

  getBeatPosition() { return this.currentStep / 16 }

  // ════════════════════════════════════════════════════════
  // STEP GRID — dispatches to genre-specific scheduler
  // ════════════════════════════════════════════════════════

  _scheduleStep(step, when) {
    switch (this.genre) {
      case 'trap':      this._stepTrap(step, when); break
      case 'dancehall': this._stepDancehall(step, when); break
      case 'soca':      this._stepSoca(step, when); break
      case 'hiphop':    this._stepHiphop(step, when); break
    }
  }

  // ── TRAP ───────────────────────────────────────────────

  _stepTrap(step, when) {
    const g = (id) => this._layerGain(id)
    const bar = this.barCount % 8
    const phrase = Math.floor(this.barCount / 8) % 4

    // Tap
    if (g('tap') > 0.01 && step % 2 === 1) {
      const swing = (step % 4 === 3) ? 0.009 : 0
      const baseVel = (bar >= 6) ? 0.26 : (bar === 4) ? 0.18 : (step % 4 === 1) ? 0.22 : 0.14
      this._tap(when + swing, g('tap') * baseVel)
    }

    // 808 bass
    if (g('808bass') > 0.01) {
      const bassPatterns = [
        [[0, 55, 1.0], [6, 49, 0.8], [10, 46, 0.7]],
        [[0, 55, 1.0], [3, 46, 0.7], [6, 49, 0.8], [11, 44, 0.65]],
        [[0, 55, 1.0], [4, 52, 0.75], [10, 46, 0.8]],
        [[0, 55, 1.0], [6, 49, 0.85], [8, 46, 0.7], [13, 44, 0.6]],
        [[0, 55, 1.0], [8, 49, 0.8], [13, 46, 0.7]],
        [[0, 55, 1.0], [6, 49, 0.85], [10, 46, 0.8]],
        [[0, 55, 1.0], [3, 46, 0.75], [6, 52, 0.9], [10, 49, 0.8]],
        [[0, 55, 1.0], [4, 52, 0.8], [6, 49, 0.85], [10, 46, 0.7], [14, 44, 0.6]],
      ]
      const patIdx = (phrase % 2 === 1 && (bar === 1 || bar === 5))
        ? (bar === 1 ? 3 : 2) : bar
      for (const [s, freq, accent] of bassPatterns[patIdx]) {
        if (step === s) this._808bass(when, g('808bass') * accent, freq)
      }
      // 808 run on bar 4
      if (bar === 4) {
        const run = [[8,55,0.9],[10,52,0.85],[12,49,0.9],[14,46,0.95],[15,44,1.0]]
        for (const [s,f,v] of run) { if (step === s) this._808bass(when, g('808bass')*v, f) }
      }
      if (bar === 6 && phrase >= 1) {
        const run = [[12,44,0.7],[13,46,0.8],[14,49,0.9],[15,55,1.0]]
        for (const [s,f,v] of run) { if (step === s) this._808bass(when, g('808bass')*v, f) }
      }
    }

    // Kick
    if (g('kick') > 0.01) {
      const kp = [[0,6],[0,6,10],[0,4,10],[0,6,10,14],[0,8,12],[0,6,10],[0,3,6,10],[0,6,10]]
      if (kp[bar].includes(step)) this._kick(when, g('kick') * (step === 0 ? 0.95 : 0.8))
    }

    // Hi-hat
    if (g('hihat') > 0.01) {
      const styles = {
        str: [.7,.25,.5,.3,.7,.25,.5,.35,.7,.25,.5,.3,.7,.25,.55,.4],
        tri: [.7,0,.45,.3,0,.45,.7,0,.45,.3,0,.45,.7,0,.45,.3],
        bld: [.3,.3,.35,.35,.4,.4,.45,.45,.5,.5,.55,.55,.6,.6,.65,.7],
        off: [0,.5,0,.5,0,.5,0,.5,0,.5,0,.5,0,.5,0,.5],
      }
      const map = ['str','str','tri','str','off','str','str','bld']
      const key = (phrase >= 2 && bar === 2) ? 'off' : (phrase >= 2 && bar === 0) ? 'tri' : map[bar]
      const v = styles[key][step]
      if (v > 0) this._hihat(when, false, g('hihat') * v * 0.55)
    }

    // Clap
    if (g('clap') > 0.01) {
      const cb = {0:[4,12],1:[4,12],2:[4],3:[4,12],4:[4,12],5:[4,12],6:[4,12],7:[4,10,12]}
      if (cb[bar].includes(step)) {
        this._clap(when, g('clap') * 0.75)
        this._clap(Math.max(this.ctx.currentTime, when - 0.012), g('clap') * 0.2)
      }
    }

    // Snare
    if (g('snare') > 0.01) {
      if (step === 4 || step === 12) this._snare(when, g('snare') * 0.9)
      const gm = [[7],[7,15],[3,11],[7,13],[3,9],[7,11],[3,7,15],[5,9,13]]
      if (gm[bar].includes(step)) this._snare(when, g('snare') * (bar === 6 ? 0.28 : 0.2))
    }

    // Perc
    if (g('perc') > 0.01) {
      const pp = [[2,10],[2,9,14],[6,14],[2,6,10,14],[6,12],[2,10],[2,6,9,14],[2,5,8,11,14]]
      if (pp[bar].includes(step)) this._rim(when, g('perc') * ((step===2||step===10)?0.6:0.4))
    }

    // Open hat
    if (g('openhat') > 0.01) {
      const oh = {0:[10],1:[3,10],2:[10],3:[6,14],4:[6,14],5:[3,10],6:[3,10],7:[6,10,14]}
      for (const s of oh[bar]) { if (step===s) this._hihat(when, true, g('openhat')*(s===10?0.5:0.35)) }
    }

    // Rolls
    if (g('rolls') > 0.01) {
      const dx = this._stepDur()
      if (bar===7 && step>=8) {
        const rv = g('rolls')*(0.2+(step-8)*0.1)
        this._snare(when, rv); this._snare(when+dx*0.5, rv*0.8)
      } else if (bar===3 && step>=12) {
        const td = dx/3
        for (let i=0;i<3;i++) this._hihat(when+td*i, false, g('rolls')*(0.25+i*0.08))
      } else if (bar===6 && (step===14||step===15)) {
        this._snare(when, g('rolls')*0.6); this._snare(when+dx*0.5, g('rolls')*0.45)
      } else if (bar===5 && step===14) {
        const td = dx/3
        for (let i=0;i<3;i++) this._hihat(when+td*i, false, g('rolls')*(0.3+i*0.1))
      }
      if (phrase>=2 && bar===7 && step<8 && step%2===0) this._kick(when, g('rolls')*0.4)
    }

    // 4otf
    if (g('kick4otf') > 0.01) {
      if (step%4===0) this._kick(when, g('kick4otf')*0.85)
      const bs = (bar%2===0)?14:13
      if (step===bs) this._808bass(when, g('kick4otf')*0.6, 46)
    }
  }

  // ── DANCEHALL ──────────────────────────────────────────
  // One-drop / steppers riddim, ~92 BPM
  // Offbeat skank, bass on 1&3, snare on 3 (one drop)

  _stepDancehall(step, when) {
    const g = (id) => this._layerGain(id)
    const bar = this.barCount % 8
    const phrase = Math.floor(this.barCount / 8) % 4

    // Tap — shaker on 16ths, lighter feel
    if (g('tap') > 0.01 && step % 2 === 1) {
      const vel = (bar >= 6) ? 0.2 : 0.15
      this._tap(when, g('tap') * vel)
    }

    // Kick — one-drop: beat 3 primary, variations add beat 1
    if (g('kick') > 0.01) {
      const kp = [
        [8],             // 0: pure one-drop
        [8],             // 1
        [0, 8],          // 2: add beat 1
        [8],             // 3
        [0, 8],          // 4: steppers
        [8],             // 5
        [0, 8],          // 6
        [0, 6, 8],       // 7: fill
      ]
      if (kp[bar].includes(step)) this._kick(when, g('kick') * (step === 8 ? 0.95 : 0.75))
    }

    // Hi-hat — offbeat skank (the and of each beat)
    if (g('hihat') > 0.01) {
      const skank = {
        off8:   [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],  // placeholder
        basic:  [0,.6,0,.5, 0,.6,0,.5, 0,.6,0,.5, 0,.6,0,.5],
        busy:   [.3,.6,.2,.5, .3,.6,.2,.5, .3,.6,.2,.5, .3,.6,.2,.5],
        accent: [0,.7,0,.4, 0,.5,0,.7, 0,.6,0,.4, 0,.7,0,.5],
      }
      // Offbeat 8ths as the core — steps 2, 6, 10, 14
      const barMap = ['basic','basic','accent','basic','basic','accent','busy','busy']
      const key = (phrase >= 2 && bar < 2) ? 'accent' : barMap[bar]
      const v = skank[key][step]
      if (v > 0) this._hihat(when, false, g('hihat') * v * 0.6)
    }

    // Snare — one drop on beat 3, ghost on 4
    if (g('snare') > 0.01) {
      if (step === 8) this._snare(when, g('snare') * 0.9)
      // Ghost variations
      const gm = [[],[14],[],[13,15],[],[14],[13],[11,13,15]]
      if (gm[bar].includes(step)) this._snare(when, g('snare') * 0.2)
    }

    // Perc — rimshot on offbeats, ska-style
    if (g('perc') > 0.01) {
      // Classic skank rim on the "and"
      const pp = [
        [2, 6, 10, 14],       // 0: full skank
        [2, 6, 10, 14],       // 1
        [2, 10, 14],          // 2: variation
        [2, 6, 10, 14],       // 3
        [6, 14],              // 4: half
        [2, 6, 10, 14],       // 5
        [2, 6, 10, 14],       // 6
        [2, 4, 6, 10, 12, 14],// 7: fill — busy
      ]
      if (pp[bar].includes(step)) this._rim(when, g('perc') * 0.5)
    }

    // Bass — round sub, root + fifth movement
    if (g('bass') > 0.01) {
      const bassPatterns = [
        [[0, 65, 1.0], [8, 65, 0.85]],                        // 0: root on 1 & 3
        [[0, 65, 1.0], [6, 55, 0.7], [8, 65, 0.85]],         // 1: walk up
        [[0, 65, 1.0], [8, 55, 0.9]],                          // 2: root-fifth
        [[0, 65, 1.0], [6, 55, 0.7], [8, 65, 0.85], [14, 73, 0.6]], // 3: walk
        [[0, 65, 1.0], [4, 55, 0.7], [8, 65, 0.9], [12, 55, 0.7]],  // 4: steppers bass
        [[0, 65, 1.0], [8, 65, 0.85]],                        // 5
        [[0, 65, 1.0], [3, 55, 0.6], [8, 65, 0.9], [11, 73, 0.65]], // 6: syncopated
        [[0, 65, 1.0], [4, 55, 0.7], [8, 65, 0.9], [10, 73, 0.7], [14, 55, 0.6]], // 7: busy
      ]
      const patIdx = (phrase % 2 === 1 && bar === 0) ? 2 : bar
      for (const [s, freq, accent] of bassPatterns[patIdx]) {
        if (step === s) this._bass(when, g('bass') * accent, freq)
      }
    }

    // Open hat
    if (g('openhat') > 0.01) {
      const oh = {0:[],1:[6],2:[],3:[6],4:[],5:[],6:[6],7:[6,14]}
      for (const s of oh[bar]) { if (step===s) this._hihat(when, true, g('openhat')*0.4) }
    }

    // Clap — accents on 3 stacked with snare, occasional 4
    if (g('clap') > 0.01) {
      const cl = {0:[8],1:[8],2:[8],3:[8],4:[8,12],5:[8],6:[8,12],7:[8,12]}
      if (cl[bar].includes(step)) this._clap(when, g('clap') * 0.6)
    }

    // Rolls — snare rolls and hat flutters on fill bars
    if (g('rolls') > 0.01) {
      const dx = this._stepDur()
      if (bar === 7 && step >= 12) {
        const rv = g('rolls') * (0.3 + (step - 12) * 0.15)
        this._snare(when, rv); this._snare(when + dx * 0.5, rv * 0.7)
      }
      if (bar === 3 && step === 14) {
        const td = dx / 3
        for (let i = 0; i < 3; i++) this._rim(when + td * i, g('rolls') * (0.3 + i * 0.1))
      }
    }
  }

  // ── SOCA ───────────────────────────────────────────────
  // Power soca / groovy soca, ~138 BPM
  // Driving 4otf kick, iron pattern, snare on 2&4

  _stepSoca(step, when) {
    const g = (id) => this._layerGain(id)
    const bar = this.barCount % 8
    const phrase = Math.floor(this.barCount / 8) % 4

    // Tap — shaker on every 16th, accent pattern
    if (g('tap') > 0.01) {
      const vels = [.2,.12,.16,.12, .2,.12,.16,.14, .2,.12,.16,.12, .2,.12,.18,.15]
      if (vels[step] > 0) this._tap(when, g('tap') * vels[step])
    }

    // Kick — 4 on the floor, variations add offbeats
    if (g('kick') > 0.01) {
      const kp = [
        [0, 4, 8, 12],                // 0: straight 4otf
        [0, 4, 8, 12],                // 1
        [0, 4, 8, 12, 14],            // 2: add pickup
        [0, 4, 8, 12],                // 3
        [0, 4, 8, 12],                // 4
        [0, 4, 6, 8, 12],             // 5: add syncopation
        [0, 4, 8, 12],                // 6
        [0, 4, 8, 10, 12, 14],        // 7: fill
      ]
      if (kp[bar].includes(step)) {
        const accent = (step % 4 === 0) ? 0.9 : 0.65
        this._kick(when, g('kick') * accent)
      }
    }

    // Iron — the signature soca bell pattern
    // Classic pattern: x..x..x.x..x..x. (offbeat emphasis)
    if (g('iron') > 0.01) {
      const ironPatterns = [
        [0,0,0,1, 0,0,1,0, 1,0,0,1, 0,0,1,0],  // 0: standard
        [0,0,0,1, 0,0,1,0, 1,0,0,1, 0,0,1,0],  // 1
        [1,0,0,1, 0,0,1,0, 0,0,1,0, 1,0,1,0],  // 2: variation
        [0,0,0,1, 0,0,1,0, 1,0,0,1, 0,0,1,0],  // 3
        [0,0,1,0, 1,0,0,1, 0,0,1,0, 1,0,0,1],  // 4: shifted
        [0,0,0,1, 0,0,1,0, 1,0,0,1, 0,0,1,0],  // 5
        [1,0,0,1, 0,1,1,0, 1,0,0,1, 0,1,1,0],  // 6: busy
        [1,0,1,1, 0,1,1,0, 1,0,1,1, 0,1,1,0],  // 7: fill — dense
      ]
      const pat = (phrase >= 2 && bar === 0) ? ironPatterns[2] : ironPatterns[bar]
      if (pat[step]) {
        const accent = (step === 3 || step === 11) ? 0.7 : 0.5
        this._bell(when, g('iron') * accent)
      }
    }

    // Hi-hat — 16ths with soca groove
    if (g('hihat') > 0.01) {
      const vels = [.6,.3,.45,.3, .6,.3,.45,.35, .6,.3,.45,.3, .6,.3,.5,.4]
      const busyVels = [.6,.4,.5,.4, .6,.4,.5,.45, .6,.4,.5,.4, .65,.45,.55,.5]
      const v = (bar >= 6) ? busyVels[step] : vels[step]
      this._hihat(when, false, g('hihat') * v * 0.5)
    }

    // Snare — 2 and 4
    if (g('snare') > 0.01) {
      if (step === 4 || step === 12) this._snare(when, g('snare') * 0.85)
      // Ghost notes
      const gm = [[],[7],[],[7,15],[],[7],[7,11],[5,7,9,11,13,15]]
      if (gm[bar].includes(step)) this._snare(when, g('snare') * 0.18)
    }

    // Bass — driving soca bass, syncopated
    if (g('bass') > 0.01) {
      const bassPatterns = [
        [[0, 65, 1.0], [6, 55, 0.8], [8, 65, 0.85]],
        [[0, 65, 1.0], [6, 55, 0.8], [10, 73, 0.7]],
        [[0, 65, 1.0], [4, 55, 0.75], [8, 65, 0.85], [12, 73, 0.7]],
        [[0, 65, 1.0], [6, 55, 0.8], [8, 65, 0.85]],
        [[0, 65, 1.0], [3, 73, 0.7], [6, 55, 0.8], [10, 65, 0.75]],
        [[0, 65, 1.0], [6, 55, 0.8], [8, 65, 0.85], [14, 73, 0.6]],
        [[0, 65, 1.0], [3, 55, 0.7], [6, 73, 0.85], [10, 55, 0.8]],
        [[0, 65, 1.0], [4, 55, 0.8], [6, 73, 0.85], [8, 65, 0.9], [12, 55, 0.75], [14, 73, 0.7]],
      ]
      for (const [s, freq, accent] of bassPatterns[bar]) {
        if (step === s) this._bass(when, g('bass') * accent, freq)
      }
    }

    // Clap — stacked on snare
    if (g('clap') > 0.01) {
      const cl = {0:[4,12],1:[4,12],2:[4,12],3:[4,12],4:[4,12],5:[4,12],6:[4,12],7:[4,8,12]}
      if (cl[bar].includes(step)) this._clap(when, g('clap') * 0.65)
    }

    // Open hat
    if (g('openhat') > 0.01) {
      const oh = {0:[2],1:[2,10],2:[2],3:[2,10],4:[2],5:[2,10],6:[2,10],7:[2,6,10,14]}
      for (const s of (oh[bar]||[])) { if (step===s) this._hihat(when, true, g('openhat')*0.4) }
    }

    // Perc — extra percussion, conga-style
    if (g('perc') > 0.01) {
      const pp = [[4,10],[4,10],[2,6,10,14],[4,10],[4,10],[4,10,14],[2,4,10,14],[2,4,6,8,10,12,14]]
      if (pp[bar].includes(step)) this._rim(when, g('perc') * 0.45)
    }

    // Rolls — snare rolls on fill bars
    if (g('rolls') > 0.01) {
      const dx = this._stepDur()
      if (bar === 7 && step >= 8) {
        const rv = g('rolls') * (0.2 + (step - 8) * 0.1)
        this._snare(when, rv); this._snare(when + dx * 0.5, rv * 0.8)
      }
      if (bar === 3 && step >= 12) {
        const td = dx / 3
        for (let i = 0; i < 3; i++) this._bell(when + td * i, g('rolls') * (0.3 + i * 0.1))
      }
    }
  }

  // ── HIP-HOP ────────────────────────────────────────────
  // Boom-bap, ~90 BPM
  // Sampled feel, kick on 1/2&, snare on 2&4, swing

  _stepHiphop(step, when) {
    const g = (id) => this._layerGain(id)
    const bar = this.barCount % 8
    const phrase = Math.floor(this.barCount / 8) % 4

    // Swing offset for boom-bap feel
    const swing = (step % 2 === 1) ? 0.012 : 0

    // Tap — vinyl crackle texture, constant
    if (g('tap') > 0.01) {
      // Light texture on every other 16th
      if (step % 4 === 0 || step % 4 === 3)
        this._tap(when, g('tap') * 0.12)
    }

    // Kick — boom-bap patterns
    if (g('kick') > 0.01) {
      const kp = [
        [0, 5, 10],             // 0: classic boom-bap (1, 2&, 3.5)
        [0, 5, 8],              // 1: variation
        [0, 5, 10],             // 2
        [0, 3, 5, 10],          // 3: busier
        [0, 5, 10],             // 4
        [0, 5, 8, 14],          // 5: variation
        [0, 3, 5, 10],          // 6
        [0, 5, 8, 10, 14],      // 7: fill
      ]
      const patIdx = (phrase >= 2 && bar === 0) ? 1 : bar
      if (kp[patIdx].includes(step)) {
        this._kick(when + swing, g('kick') * (step === 0 ? 0.95 : 0.8))
      }
    }

    // Hi-hat — 8ths with swing, some 16th bars
    if (g('hihat') > 0.01) {
      const styles = {
        eighth: [.6,0,.5,0, .6,0,.5,0, .6,0,.5,0, .6,0,.5,0],
        swing8: [.65,0,.45,0, .6,0,.5,0, .65,0,.45,0, .6,0,.55,0],
        s16th:  [.5,.25,.4,.2, .5,.25,.4,.25, .5,.25,.4,.2, .5,.3,.45,.35],
        open16: [.5,.3,.4,.25, .55,.3,.4,.3, .5,.3,.4,.25, .55,.3,.45,.4],
      }
      const map = ['swing8','swing8','eighth','swing8','eighth','s16th','swing8','open16']
      const key = (phrase >= 2 && bar === 1) ? 's16th' : map[bar]
      const v = styles[key][step]
      if (v > 0) this._hihat(when + swing, false, g('hihat') * v * 0.55)
    }

    // Snare — 2 and 4 with swing
    if (g('snare') > 0.01) {
      if (step === 4 || step === 12) this._snare(when + swing, g('snare') * 0.9)
      // Ghost snares
      const gm = [[],[7],[],[7,15],[3],[7],[3,11],[5,7,9,11]]
      if (gm[bar].includes(step)) this._snare(when + swing, g('snare') * 0.18)
    }

    // Bass — round sub-bass, boom-bap style
    if (g('bass') > 0.01) {
      const bassPatterns = [
        [[0, 55, 1.0], [5, 49, 0.8], [10, 55, 0.7]],
        [[0, 55, 1.0], [5, 49, 0.8]],
        [[0, 55, 1.0], [5, 49, 0.8], [10, 55, 0.75]],
        [[0, 55, 1.0], [3, 49, 0.6], [5, 55, 0.8], [10, 49, 0.7]],
        [[0, 55, 1.0], [5, 49, 0.8], [10, 55, 0.7]],
        [[0, 55, 1.0], [5, 49, 0.8], [8, 55, 0.7], [14, 49, 0.55]],
        [[0, 55, 1.0], [3, 49, 0.6], [5, 55, 0.8], [10, 49, 0.7]],
        [[0, 55, 1.0], [4, 49, 0.7], [5, 55, 0.8], [8, 49, 0.7], [10, 55, 0.75], [14, 49, 0.6]],
      ]
      for (const [s, freq, accent] of bassPatterns[bar]) {
        if (step === s) this._bass(when + swing, g('bass') * accent, freq)
      }
    }

    // Perc — vinyl-style pops and rim ticks
    if (g('perc') > 0.01) {
      const pp = [[2,10],[2,14],[10],[2,6,10,14],[2,10],[2,10,14],[2,6,10],[2,4,6,10,14]]
      if (pp[bar].includes(step)) this._rim(when + swing, g('perc') * 0.4)
    }

    // Open hat
    if (g('openhat') > 0.01) {
      const oh = {0:[],1:[6],2:[],3:[14],4:[],5:[6],6:[6,14],7:[6,10,14]}
      for (const s of oh[bar]) { if (step===s) this._hihat(when+swing, true, g('openhat')*0.4) }
    }

    // Clap — stacked on snare, some bars only
    if (g('clap') > 0.01) {
      const cl = {0:[4,12],1:[4,12],2:[12],3:[4,12],4:[4,12],5:[12],6:[4,12],7:[4,12]}
      if (cl[bar].includes(step)) this._clap(when + swing, g('clap') * 0.55)
    }

    // Rolls — snare rolls, scratchy fills
    if (g('rolls') > 0.01) {
      const dx = this._stepDur()
      if (bar === 7 && step >= 10) {
        const rv = g('rolls') * (0.25 + (step - 10) * 0.12)
        this._snare(when, rv); this._snare(when + dx * 0.5, rv * 0.75)
      }
      if (bar === 3 && step === 14) {
        this._snare(when, g('rolls') * 0.5)
        this._snare(when + dx * 0.33, g('rolls') * 0.4)
        this._snare(when + dx * 0.66, g('rolls') * 0.35)
      }
    }
  }

  // ════════════════════════════════════════════════════════
  // SYNTHESIS — shared across all genres
  // ════════════════════════════════════════════════════════

  _kick(when, vol) {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(150, when)
    osc.frequency.exponentialRampToValueAtTime(40, when + 0.06)
    osc.frequency.exponentialRampToValueAtTime(0.01, when + 0.35)
    gain.gain.setValueAtTime(vol, when)
    gain.gain.exponentialRampToValueAtTime(0.001, when + 0.35)

    const click = this.ctx.createOscillator()
    const clickGain = this.ctx.createGain()
    click.type = 'square'
    click.frequency.value = 1800
    clickGain.gain.setValueAtTime(vol * 0.15, when)
    clickGain.gain.exponentialRampToValueAtTime(0.001, when + 0.008)
    click.connect(clickGain)
    clickGain.connect(this.outputNode)
    click.start(when); click.stop(when + 0.015)

    osc.connect(gain)
    gain.connect(this.outputNode)
    osc.start(when); osc.stop(when + 0.4)
  }

  _808bass(when, vol, freq = 55) {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, when)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.55, when + 0.7)
    gain.gain.setValueAtTime(vol, when)
    gain.gain.setValueAtTime(vol * 0.85, when + 0.06)
    gain.gain.exponentialRampToValueAtTime(0.001, when + 0.95)
    osc.connect(gain)
    gain.connect(this._getShaper())
    osc.start(when); osc.stop(when + 1.0)

    const osc2 = this.ctx.createOscillator()
    const gain2 = this.ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(freq * 2, when)
    osc2.frequency.exponentialRampToValueAtTime(freq, when + 0.4)
    gain2.gain.setValueAtTime(vol * 0.22, when)
    gain2.gain.exponentialRampToValueAtTime(0.001, when + 0.35)
    osc2.connect(gain2)
    gain2.connect(this._getShaper())
    osc2.start(when); osc2.stop(when + 0.4)
  }

  // Round sub-bass — cleaner than 808, for dancehall/soca/hip-hop
  _bass(when, vol, freq = 55) {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, when)
    osc.frequency.setValueAtTime(freq * 0.98, when + 0.3)
    gain.gain.setValueAtTime(vol, when)
    gain.gain.setValueAtTime(vol * 0.7, when + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.001, when + 0.5)
    osc.connect(gain)
    gain.connect(this.outputNode)
    osc.start(when); osc.stop(when + 0.55)

    // Subtle second harmonic
    const osc2 = this.ctx.createOscillator()
    const gain2 = this.ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.value = freq * 2
    gain2.gain.setValueAtTime(vol * 0.1, when)
    gain2.gain.exponentialRampToValueAtTime(0.001, when + 0.2)
    osc2.connect(gain2)
    gain2.connect(this.outputNode)
    osc2.start(when); osc2.stop(when + 0.25)
  }

  _hihat(when, open, vol) {
    const src = this._noiseSource()
    const hp = this.ctx.createBiquadFilter()
    const gain = this.ctx.createGain()
    const decay = open ? 0.28 : 0.038
    hp.type = 'highpass'
    hp.frequency.value = open ? 6500 : 8000
    gain.gain.setValueAtTime(vol, when)
    gain.gain.exponentialRampToValueAtTime(0.001, when + decay)
    src.connect(hp); hp.connect(gain); gain.connect(this.outputNode)
    src.start(when, src._offset); src.stop(when + decay + 0.01)
  }

  _clap(when, vol) {
    for (let i = 0; i < 3; i++) {
      const ns = this._noiseSource()
      const bp = this.ctx.createBiquadFilter()
      const g = this.ctx.createGain()
      bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = 0.7
      const offset = i * 0.008
      const bv = vol * (i === 2 ? 1.0 : 0.5)
      g.gain.setValueAtTime(bv, when + offset)
      g.gain.exponentialRampToValueAtTime(0.001, when + offset + 0.12)
      ns.connect(bp); bp.connect(g); g.connect(this.outputNode)
      ns.start(when + offset, ns._offset); ns.stop(when + offset + 0.15)
    }
  }

  _snare(when, vol) {
    const ns = this._noiseSource()
    const bp = this.ctx.createBiquadFilter()
    const ng = this.ctx.createGain()
    bp.type = 'bandpass'; bp.frequency.value = 2800; bp.Q.value = 0.8
    ng.gain.setValueAtTime(vol * 0.7, when)
    ng.gain.exponentialRampToValueAtTime(0.001, when + 0.16)
    ns.connect(bp); bp.connect(ng); ng.connect(this.outputNode)
    ns.start(when, ns._offset); ns.stop(when + 0.2)

    const osc = this.ctx.createOscillator()
    const og = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(280, when)
    osc.frequency.exponentialRampToValueAtTime(180, when + 0.05)
    og.gain.setValueAtTime(vol * 0.35, when)
    og.gain.exponentialRampToValueAtTime(0.001, when + 0.08)
    osc.connect(og); og.connect(this.outputNode)
    osc.start(when); osc.stop(when + 0.1)
  }

  _rim(when, vol) {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'triangle'; osc.frequency.value = 820
    gain.gain.setValueAtTime(vol, when)
    gain.gain.exponentialRampToValueAtTime(0.001, when + 0.025)
    osc.connect(gain); gain.connect(this.outputNode)
    osc.start(when); osc.stop(when + 0.03)

    const ns = this._noiseSource()
    const hp = this.ctx.createBiquadFilter()
    const ng = this.ctx.createGain()
    hp.type = 'highpass'; hp.frequency.value = 3500
    ng.gain.setValueAtTime(vol * 0.5, when)
    ng.gain.exponentialRampToValueAtTime(0.001, when + 0.012)
    ns.connect(hp); hp.connect(ng); ng.connect(this.outputNode)
    ns.start(when, ns._offset); ns.stop(when + 0.02)
  }

  // Iron bell — metallic ping for soca
  _bell(when, vol) {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 1200
    gain.gain.setValueAtTime(vol * 0.4, when)
    gain.gain.exponentialRampToValueAtTime(0.001, when + 0.06)
    osc.connect(gain); gain.connect(this.outputNode)
    osc.start(when); osc.stop(when + 0.07)

    // Higher partial for metallic shimmer
    const osc2 = this.ctx.createOscillator()
    const gain2 = this.ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.value = 3200
    gain2.gain.setValueAtTime(vol * 0.15, when)
    gain2.gain.exponentialRampToValueAtTime(0.001, when + 0.035)
    osc2.connect(gain2); gain2.connect(this.outputNode)
    osc2.start(when); osc2.stop(when + 0.04)
  }

  _tap(when, vol) {
    const src = this._noiseSource()
    const bp = this.ctx.createBiquadFilter()
    const gain = this.ctx.createGain()
    bp.type = 'bandpass'; bp.frequency.value = 4200; bp.Q.value = 2.2
    gain.gain.setValueAtTime(vol, when)
    gain.gain.exponentialRampToValueAtTime(0.001, when + 0.014)
    src.connect(bp); bp.connect(gain); gain.connect(this.outputNode)
    src.start(when, src._offset); src.stop(when + 0.02)
  }
}
