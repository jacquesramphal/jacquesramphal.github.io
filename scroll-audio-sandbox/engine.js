class ScrollAudioEngine {
  constructor() {
    this.ctx = null
    this.gainNode = null
    this.analyser = null

    // Scratch mode
    this.fwdBuffer = null
    this.revBuffer = null
    this.scratchSource = null
    this.isForward = true
    this.scratchOffset = 0
    this.scratchStartCtxTime = 0
    this.scratchRate = 0
    this.scratchPlaying = false
    this.brakeTimer = null

    // Timeline mode
    this.timelineAudio = null
    this.timelineMediaSource = null

    this.mode = 'scratch'
    this.duration = 0
  }

  async init() {
    this.ctx = new AudioContext()
    this.gainNode = this.ctx.createGain()
    this.gainNode.gain.value = 1
    this.analyser = this.ctx.createAnalyser()
    this.analyser.fftSize = 512
    this.gainNode.connect(this.analyser)
    this.analyser.connect(this.ctx.destination)
  }

  async loadFile(file) {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = await this.ctx.decodeAudioData(arrayBuffer)
    this.duration = buffer.duration
    this.fwdBuffer = buffer
    this.revBuffer = this._reverse(buffer)
    this.scratchOffset = 0
    this.scratchPlaying = false

    // Timeline audio element — create new each load
    if (this.timelineMediaSource) this.timelineMediaSource.disconnect()
    if (this.timelineAudio) {
      this.timelineAudio.pause()
      URL.revokeObjectURL(this.timelineAudio.src)
    }
    const blob = new Blob([await file.arrayBuffer()], { type: file.type })
    this.timelineAudio = new Audio()
    this.timelineAudio.src = URL.createObjectURL(blob)
    this.timelineAudio.loop = true
    this.timelineMediaSource = this.ctx.createMediaElementSource(this.timelineAudio)
    this.timelineMediaSource.connect(this.gainNode)

    return buffer.duration
  }

  _reverse(buffer) {
    const rev = this.ctx.createBuffer(
      buffer.numberOfChannels,
      buffer.length,
      buffer.sampleRate
    )
    for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
      const src = buffer.getChannelData(ch)
      const dst = rev.getChannelData(ch)
      for (let i = 0; i < src.length; i++) {
        dst[i] = src[src.length - 1 - i]
      }
    }
    return rev
  }

  _scratchOffset() {
    if (!this.scratchPlaying) return this.scratchOffset
    const elapsed = this.ctx.currentTime - this.scratchStartCtxTime
    const raw = this.scratchOffset + elapsed * this.scratchRate
    return ((raw % this.duration) + this.duration) % this.duration
  }

  _startScratch(buffer, offset, rate) {
    if (this.scratchSource) {
      this.scratchSource.onended = null
      try { this.scratchSource.stop(0) } catch (_) {}
      this.scratchSource.disconnect()
    }
    const src = this.ctx.createBufferSource()
    src.buffer = buffer
    src.loop = true
    src.playbackRate.value = Math.max(rate, 0.001)
    src.connect(this.gainNode)
    const safe = ((offset % this.duration) + this.duration) % this.duration
    src.start(0, safe)
    this.scratchSource = src
    this.scratchStartCtxTime = this.ctx.currentTime
    this.scratchOffset = safe
    this.scratchRate = rate
    this.scratchPlaying = true
  }

  _brake() {
    if (!this.scratchSource || !this.scratchPlaying) return
    const now = this.ctx.currentTime
    this.scratchSource.playbackRate.cancelScheduledValues(now)
    this.scratchSource.playbackRate.linearRampToValueAtTime(0.001, now + 0.35)
    const captured = this.scratchSource
    setTimeout(() => {
      this.scratchOffset = this._scratchOffset()
      this.scratchRate = 0
      try { captured.stop(0) } catch (_) {}
      captured.disconnect()
      if (this.scratchSource === captured) {
        this.scratchSource = null
        this.scratchPlaying = false
      }
    }, 420)
  }

  onScroll(velocity, scrollProgress) {
    if (!this.fwdBuffer) return
    if (this.ctx.state === 'suspended') this.ctx.resume()

    if (this.mode === 'scratch') {
      this._handleScratch(velocity)
    } else {
      this._handleTimeline(scrollProgress)
    }
  }

  _handleScratch(velocity) {
    const speed = Math.min(Math.abs(velocity) * 0.06, 3.5)
    const forward = velocity >= 0

    if (Math.abs(velocity) < 0.05) {
      this._brake()
      return
    }

    if (!this.scratchPlaying) {
      this._startScratch(
        forward ? this.fwdBuffer : this.revBuffer,
        this.scratchOffset,
        speed
      )
      this.isForward = forward
    } else if (forward !== this.isForward) {
      // Direction flip — mirror position into opposite buffer
      const offset = this._scratchOffset()
      const mirrored = this.duration - offset
      this._startScratch(
        forward ? this.fwdBuffer : this.revBuffer,
        mirrored,
        speed
      )
      this.isForward = forward
    } else {
      // Same direction — just ramp rate
      this.scratchSource.playbackRate.linearRampToValueAtTime(
        Math.max(speed, 0.001),
        this.ctx.currentTime + 0.04
      )
      this.scratchRate = speed
    }

    clearTimeout(this.brakeTimer)
    this.brakeTimer = setTimeout(() => this._brake(), 130)
  }

  _handleTimeline(progress) {
    const audio = this.timelineAudio
    if (!audio) return

    const target = progress * this.duration
    const diff = Math.abs(audio.currentTime - target)

    if (diff > 0.5) {
      // Crossfade seek to reduce pop
      const now = this.ctx.currentTime
      this.gainNode.gain.cancelScheduledValues(now)
      this.gainNode.gain.linearRampToValueAtTime(0, now + 0.04)
      audio.currentTime = target
      this.gainNode.gain.linearRampToValueAtTime(1, now + 0.1)
    }

    if (audio.paused) audio.play().catch(() => {})
  }

  setMode(mode) {
    if (mode === this.mode) return
    if (this.mode === 'scratch') {
      clearTimeout(this.brakeTimer)
      this._brake()
    } else {
      if (this.timelineAudio) this.timelineAudio.pause()
    }
    this.mode = mode
  }

  getWaveformData() {
    if (!this.analyser) return null
    const data = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteTimeDomainData(data)
    return data
  }

  getFrequencyData() {
    if (!this.analyser) return null
    const data = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteFrequencyData(data)
    return data
  }

  getPlaybackRate() {
    if (this.mode === 'scratch') {
      return this.scratchPlaying ? this.scratchRate : 0
    }
    return this.timelineAudio && !this.timelineAudio.paused ? 1 : 0
  }

  getPosition() {
    if (this.mode === 'scratch') {
      return this.duration ? this._scratchOffset() / this.duration : 0
    }
    if (this.timelineAudio && this.duration) {
      return this.timelineAudio.currentTime / this.duration
    }
    return 0
  }
}
