class ScrollAudioEngine {
  constructor() {
    this.ctx = null
    this.gainNode = null
    this.analyser = null
    this.synth = null
    this.mode = 'crescendo'
  }

  async init() {
    this.ctx = new AudioContext()
    this.gainNode = this.ctx.createGain()
    this.gainNode.gain.value = 1
    this.analyser = this.ctx.createAnalyser()
    this.analyser.fftSize = 512
    this.gainNode.connect(this.analyser)
    this.analyser.connect(this.ctx.destination)
    this.synth = new CrescendoSynth(this.ctx, this.gainNode)
  }

  onScroll(velocity, scrollProgress) {
    if (this.ctx.state === 'suspended') this.ctx.resume()
    if (this.synth) this.synth.setProgress(scrollProgress)
  }

  setMode(mode) {
    if (this.mode === 'crescendo' && this.synth && mode !== 'crescendo') {
      this.synth.stop()
    }

    this.mode = mode

    if (mode === 'crescendo' && this.ctx && this.synth) {
      if (this.ctx.state === 'suspended') this.ctx.resume()
      this.synth.start()
    }
  }

  getWaveformData() {
    if (!this.analyser) return null
    const data = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteTimeDomainData(data)
    return data
  }

  getPlaybackRate() {
    return this.synth && this.synth.running ? 1 : 0
  }

  getPosition() {
    return this.synth ? this.synth.getBeatPosition() : 0
  }
}
