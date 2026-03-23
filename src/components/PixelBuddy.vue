<template>
  <div class="pixel-buddy-wrapper">
    <div
      ref="buddy"
      class="pixel-buddy"
      :class="[state, { flipped: facingLeft, dragging: isDragging, leaving: isLeaving }]"
      :style="{ transform: `translate(${x}px, ${y}px)` }"
      @mousedown.prevent="startDrag"
      @touchstart.prevent="startDrag"
      @contextmenu.prevent="showMenu"
    >
      <div class="character">
        <div class="head"></div>
        <div class="body">
          <!-- Jetpack -->
          <div class="jetpack">
            <div class="thrust-line"></div>
            <div class="thrust-line"></div>
            <div class="thrust-line"></div>
          </div>
        </div>
        <div class="legs">
          <div class="leg left"></div>
          <div class="leg right"></div>
        </div>
      </div>

      <!-- Context Menu -->
      <div
        v-if="menuVisible"
        class="context-menu"
        :style="{ left: menuX + 'px', top: menuY + 'px' }"
      >
        <button @click="doSitAndStay">{{ isStaying ? '🚶 Follow' : '🏠 Go Home' }}</button>
        <button @click="doTakeControl">{{ isControlled ? '🤖 Auto' : '🎮 Control (WASD)' }}</button>
        <button @click="doEmote">{{ emoteLabel }}</button>
        <button @click="doChat">💬 Chat</button>
        <button @click="doLeave">👋 Leave</button>
      </div>
    </div>

    <!-- Inspect Mode Highlight (teleported to body) -->
    <Teleport to="body">
      <div
        v-if="isControlled && highlightedElement"
        class="pixel-buddy-inspect-highlight"
        :style="highlightStyle"
      >
        <span class="inspect-label">{{ elementLabel }}</span>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: "PixelBuddy",
  data() {
    return {
      x: window.innerWidth - 60,
      y: window.innerHeight - 50,
      targetX: window.innerWidth - 60,
      targetY: window.innerHeight - 50,
      velocityY: 0,
      state: "sitting", // idle, walking, sitting, falling, dragged
      facingLeft: true,
      onElement: null,
      idleTimer: 0,
      gravity: 0.6,
      walkSpeed: 4,
      jumpStrength: -12,
      isDragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      menuVisible: false,
      menuX: 0,
      menuY: 0,
      isStaying: true,
      isFixedMode: true, // stays fixed to viewport, not page
      isReturningHome: false,
      homeX: window.innerWidth - 60,
      homeY: window.innerHeight - 50,
      isControlled: false,
      isDropping: false,
      keysPressed: { w: false, a: false, s: false, d: false, e: false },
      isJetpacking: false,
      hasDoubleJumped: false,
      wWasPressed: false,
      isSprinting: false,
      lastAPress: 0,
      lastDPress: 0,
      sprintSpeed: 8,
      lastTime: 0,
      isLeaving: false,
      emoteIndex: 0,
      emotes: ['👋 Wave', '💃 Dance', '😴 Sleep', '🎉 Celebrate'],
      stayScrollX: 0,
      stayScrollY: 0,
      stayPageX: 0,
      stayPageY: 0,
      // Inspect mode
      highlightedElement: null,
      highlightRect: { top: 0, left: 0, width: 0, height: 0 },
    };
  },
  computed: {
    emoteLabel() {
      return this.emotes[this.emoteIndex];
    },
    highlightStyle() {
      return {
        top: this.highlightRect.top + 'px',
        left: this.highlightRect.left + 'px',
        width: this.highlightRect.width + 'px',
        height: this.highlightRect.height + 'px',
      };
    },
    elementLabel() {
      if (!this.highlightedElement) return '';
      const tag = this.highlightedElement.tagName.toLowerCase();
      const classes = this.highlightedElement.className;
      const classStr = typeof classes === 'string' && classes.trim()
        ? '.' + classes.trim().split(/\s+/).slice(0, 2).join('.')
        : '';
      return tag + classStr;
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.stopDrag);
    window.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("touchend", this.stopDrag);
    window.addEventListener("click", this.hideMenu);
    window.addEventListener("scroll", this.handleScroll, true);
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    this.gameLoop();
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.stopDrag);
    window.removeEventListener("touchmove", this.handleTouchMove);
    window.removeEventListener("touchend", this.stopDrag);
    window.removeEventListener("click", this.hideMenu);
    window.removeEventListener("scroll", this.handleScroll, true);
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("keyup", this.handleKeyUp);
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  },
  methods: {
    startDrag(e) {
      this.isDragging = true;
      this.state = "dragged";
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.dragOffsetX = clientX - this.x;
      this.dragOffsetY = clientY - this.y;
    },
    stopDrag() {
      if (this.isDragging) {
        this.isDragging = false;
        // Set target to current position so it doesn't move until mouse moves
        this.targetX = this.x;
        this.targetY = this.y;
        if (this.isStaying) {
          // Update stay position - keep fixed to viewport
          this.isFixedMode = true;
          this.state = "sitting";
        } else {
          this.velocityY = 0;
          this.state = "falling";
        }
      }
    },
    handleTouchMove(e) {
      if (this.isDragging && e.touches) {
        this.x = e.touches[0].clientX - this.dragOffsetX;
        this.y = e.touches[0].clientY - this.dragOffsetY;
      }
    },
    handleMouseMove(e) {
      if (this.isDragging) {
        this.x = e.clientX - this.dragOffsetX;
        this.y = e.clientY - this.dragOffsetY;
        return;
      }
      this.targetX = e.clientX - 16;
      this.targetY = e.clientY - 20;
    },
    showMenu() {
      this.menuVisible = true;

      const menuWidth = 110;
      const menuHeight = 160;

      // Check horizontal bounds
      if (this.x + menuWidth + 30 > window.innerWidth) {
        this.menuX = -menuWidth - 10; // Show on left
      } else {
        this.menuX = 30; // Show on right
      }

      // Check vertical bounds
      if (this.y - menuHeight < 0) {
        this.menuY = 10; // Show below
      } else {
        this.menuY = -menuHeight; // Show above
      }
    },
    hideMenu() {
      this.menuVisible = false;
    },
    doSitAndStay() {
      if (this.isStaying) {
        // Currently staying -> start following
        this.isStaying = false;
        this.isFixedMode = false;
        this.isReturningHome = false;
      } else {
        // Walk back to home position (bottom right)
        this.isReturningHome = true;
        this.isFixedMode = false;
        this.isControlled = false;
        this.homeX = window.innerWidth - 60;
        this.homeY = window.innerHeight - 50;
      }
      this.menuVisible = false;
    },
    handleScroll() {
      // Only adjust for scroll if staying on page (not fixed to viewport)
      if (this.isStaying && !this.isFixedMode && !this.isLeaving) {
        this.x = this.stayPageX - window.scrollX;
        this.y = this.stayPageY - window.scrollY;
      }
    },
    handleResize() {
      // Update home position
      this.homeX = window.innerWidth - 60;
      this.homeY = window.innerHeight - 50;

      // If staying in fixed mode at home, update position to match
      if (this.isStaying && this.isFixedMode && !this.isReturningHome) {
        this.x = this.homeX;
        this.y = this.homeY;
      }

      // Keep character in bounds
      this.x = Math.max(0, Math.min(window.innerWidth - 32, this.x));
      this.y = Math.max(0, Math.min(window.innerHeight - 40, this.y));
    },
    doEmote() {
      const emoteType = this.emotes[this.emoteIndex].split(' ')[1].toLowerCase();
      this.state = "emote-" + emoteType;
      this.emoteIndex = (this.emoteIndex + 1) % this.emotes.length;
      this.menuVisible = false;
      // Reset emote after animation
      setTimeout(() => {
        if (this.state.startsWith("emote-")) {
          this.state = this.isStaying ? "sitting" : "idle";
        }
      }, 2000);
    },
    doTakeControl() {
      this.isControlled = !this.isControlled;
      if (this.isControlled) {
        this.isStaying = false;
        this.isFixedMode = false;
        this.isReturningHome = false;
        this.lastTime = 0; // Reset for fresh delta calculation
      } else {
        // Clear highlight when exiting control mode
        this.highlightedElement = null;
      }
      this.menuVisible = false;
    },
    updateInspectHighlight(element) {
      if (element !== this.highlightedElement) {
        this.highlightedElement = element;
        if (element) {
          const rect = element.getBoundingClientRect();
          this.highlightRect = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          };
        }
      } else if (element) {
        // Update position in case of scroll or layout shift
        const rect = element.getBoundingClientRect();
        this.highlightRect = {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };
      }
    },
    handleKeyDown(e) {
      if (!this.isControlled) return;
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'e'].includes(key)) {
        e.preventDefault();

        // Detect double-tap for sprint
        const now = performance.now();
        if (key === 'a' && !this.keysPressed.a) {
          if (now - this.lastAPress < 300) {
            this.isSprinting = true;
          }
          this.lastAPress = now;
        }
        if (key === 'd' && !this.keysPressed.d) {
          if (now - this.lastDPress < 300) {
            this.isSprinting = true;
          }
          this.lastDPress = now;
        }

        this.keysPressed[key] = true;
        if (key === 'e') {
          this.doInteract();
        }
      }
    },
    handleKeyUp(e) {
      if (!this.isControlled) return;
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'e'].includes(key)) {
        this.keysPressed[key] = false;
        // Stop sprinting when movement key released
        if (key === 'a' || key === 'd') {
          this.isSprinting = false;
        }
      }
    },
    doInteract() {
      if (this.state === 'punching') return;

      // Punch animation
      this.state = 'punching';

      // Click the element after a short delay (mid-punch)
      setTimeout(() => {
        const target = this.highlightedElement;
        if (target) {
          // Flash the highlight
          target.classList.add('pixel-buddy-clicked');
          setTimeout(() => {
            target.classList.remove('pixel-buddy-clicked');
          }, 200);

          target.click();
          // Also trigger focus for interactive elements
          if (typeof target.focus === 'function') {
            target.focus();
          }
        }
      }, 100);

      // Reset state after animation
      setTimeout(() => {
        if (this.state === 'punching') {
          this.state = 'idle';
        }
      }, 300);
    },
    doChat() {
      this.menuVisible = false;
      // Dispatch custom event to open chat
      window.dispatchEvent(new CustomEvent('pixel-buddy-chat'));
    },
    doLeave() {
      this.menuVisible = false;
      this.isLeaving = true;
      this.state = "leaving";
      // Walk off screen
      this.targetX = -100;
      this.isStaying = false;
      setTimeout(() => {
        this.$el.style.display = "none";
      }, 2000);
    },
    isElementSolid(el) {
      if (!el || el === document.body || el === document.documentElement) return false;
      if (el === this.$refs.buddy || el.closest(".pixel-buddy")) return false;
      if (el.closest(".pixel-buddy-wrapper")) return false;

      const tag = el.tagName;
      const style = window.getComputedStyle(el);

      if (style.display === "none" || style.visibility === "hidden") return false;
      if (parseFloat(style.opacity) < 0.1) return false;

      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 3) return false;

      // Ignore elements outside the visible viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) return false;
      if (rect.right < 0 || rect.left > window.innerWidth) return false;

      // Media elements are always solid
      if (["IMG", "VIDEO", "CANVAS", "SVG", "PICTURE", "IFRAME"].includes(tag)) {
        return true;
      }

      // Check for background
      const bg = style.backgroundColor;
      const hasBg = bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent";
      const hasBgImage = style.backgroundImage !== "none";

      if (hasBg || hasBgImage) return true;

      // Text elements - check if they have actual text content
      const textTags = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "A", "BUTTON", "LABEL", "LI", "TD", "TH", "FIGCAPTION", "BLOCKQUOTE", "CODE", "PRE"];
      if (textTags.includes(tag)) {
        // Check for direct text content (not just whitespace)
        const hasText = Array.from(el.childNodes).some(
          node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
        );
        if (hasText) return true;
      }

      // Interactive elements
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return true;

      // Elements with borders that form a visible box
      const borderTop = parseFloat(style.borderTopWidth) || 0;
      const borderBottom = parseFloat(style.borderBottomWidth) || 0;
      if (borderTop >= 1 || borderBottom >= 1) return true;

      // HR elements
      if (tag === "HR") return true;

      return false;
    },

    findGround(x, y) {
      const charWidth = 16;
      const charHeight = 40;
      const scanPoints = 5; // Points across character width
      const scanDepth = 200; // How far down to scan
      const scanStep = 2; // Pixel precision for vertical scan

      let highestGround = window.innerHeight - charHeight;
      let groundElement = null;

      // Scan multiple points across character's feet
      for (let i = 0; i < scanPoints; i++) {
        const scanX = x + (charWidth / (scanPoints - 1)) * i;

        // Scan downward from current position to find ground
        for (let scanY = y + charHeight; scanY < y + charHeight + scanDepth; scanY += scanStep) {
          const elements = document.elementsFromPoint(scanX, scanY);

          for (const el of elements) {
            if (!this.isElementSolid(el)) continue;

            const rect = el.getBoundingClientRect();

            // Check if we're hitting the top edge of this element
            const elementTop = rect.top;
            if (Math.abs(scanY - elementTop) < scanStep + 2) {
              const surfaceY = elementTop - charHeight;
              if (surfaceY < highestGround && surfaceY >= y - 10) {
                highestGround = surfaceY;
                groundElement = el;
              }
              break;
            }
          }
        }
      }

      return { y: highestGround, element: groundElement };
    },
    gameLoop() {
      // Skip movement logic while dragging or menu open
      if (this.isDragging || this.menuVisible) {
        this.animationFrame = requestAnimationFrame(() => this.gameLoop());
        return;
      }

      // WASD control mode
      if (this.isControlled) {
        // Delta time for consistent speed
        const now = performance.now();
        const delta = this.lastTime ? (now - this.lastTime) / 16.67 : 1; // Normalize to 60fps
        this.lastTime = now;
        const currentSpeed = this.isSprinting ? this.sprintSpeed : this.walkSpeed;
        const speed = currentSpeed * delta;

        let moving = false;

        // Find ground (skip ground detection briefly when dropping)
        const ground = this.isDropping ? { y: window.innerHeight - 40, element: null } : this.findGround(this.x, this.y);
        const groundY = ground.y;
        const isGrounded = this.y >= groundY - 2 && this.velocityY >= 0;

        // Update inspect highlight
        this.updateInspectHighlight(ground.element);

        // Horizontal movement (consistent speed)
        if (this.keysPressed.a) {
          this.x -= speed;
          this.facingLeft = true;
          moving = true;
        }
        if (this.keysPressed.d) {
          this.x += speed;
          this.facingLeft = false;
          moving = true;
        }

        // Jump / Double Jump / Jetpack
        const wJustPressed = this.keysPressed.w && !this.wWasPressed;

        const jumpBoost = this.isSprinting ? 1.4 : 1;

        if (this.keysPressed.w) {
          if (isGrounded && wJustPressed) {
            // First jump from ground (only on fresh press)
            this.velocityY = this.jumpStrength * jumpBoost;
            this.y -= 2;
            this.hasDoubleJumped = false;
            this.isJetpacking = false;
          } else if (!isGrounded && wJustPressed && !this.hasDoubleJumped) {
            // Double jump activates jetpack (fresh press in air)
            this.isJetpacking = true;
            this.hasDoubleJumped = true;
            this.velocityY = this.jumpStrength * 0.7 * jumpBoost;
          } else if (!isGrounded && wJustPressed && this.hasDoubleJumped && !this.isJetpacking) {
            // Resume jetpack (W pressed again in air after releasing)
            this.isJetpacking = true;
            this.velocityY = Math.min(this.velocityY, 0); // Kill downward momentum
          }

          // Jetpack thrust while held
          if (this.isJetpacking) {
            this.velocityY += -1.2 * delta;
            this.velocityY = Math.max(this.velocityY, -8); // Cap upward speed
          }
        } else {
          // Released W - stop jetpacking (but can resume)
          this.isJetpacking = false;
        }

        this.wWasPressed = this.keysPressed.w;

        // Drop through platforms
        if (this.keysPressed.s && isGrounded) {
          this.isDropping = true;
          this.y += 10;
          this.velocityY = 2;
          setTimeout(() => { this.isDropping = false; }, 200);
        }

        // Apply gravity only when airborne
        if (!isGrounded || this.velocityY < 0) {
          this.velocityY += this.gravity * delta;
          this.y += this.velocityY * delta;
        }

        // Land on ground
        const isAnimating = this.state === 'punching' || this.state.startsWith('emote-');
        if (this.y >= groundY && !this.isDropping) {
          this.y = groundY;
          this.velocityY = 0;
          this.isJetpacking = false;
          this.hasDoubleJumped = false;
          if (!isAnimating) {
            this.state = moving ? (this.isSprinting ? "sprinting" : "walking") : "idle";
          }
        } else if (!isGrounded) {
          if (!isAnimating) {
            this.state = this.isJetpacking ? "jetpacking" : "falling";
          }
        } else {
          if (!isAnimating) {
            this.state = moving ? (this.isSprinting ? "sprinting" : "walking") : "idle";
          }
        }

        // Keep in bounds
        this.x = Math.max(0, Math.min(window.innerWidth - 32, this.x));

        // Top boundary - scroll page up at flying speed
        const scrollMultiplier = 3;
        if (this.y <= 0) {
          if (window.scrollY > 0 && this.velocityY < 0) {
            // Scroll faster than flying speed
            const scrollBy = Math.min(Math.abs(this.velocityY) * delta * scrollMultiplier, window.scrollY);
            window.scrollBy(0, -scrollBy);
            this.y = 0;
            // Keep velocity to maintain scroll speed
          } else {
            this.y = 0;
            this.velocityY = 0;
          }
        }

        // Bottom boundary - scroll page down at falling speed
        if (this.y >= window.innerHeight - 40) {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (window.scrollY < maxScroll && this.velocityY > 0) {
            // Scroll faster than falling speed (4x the up speed)
            const scrollBy = Math.min(this.velocityY * delta * scrollMultiplier * 4, maxScroll - window.scrollY);
            window.scrollBy(0, scrollBy);
            this.y = window.innerHeight - 40;
            // Keep falling velocity to maintain scroll speed
          } else {
            // At bottom of page - stop
            this.y = window.innerHeight - 40;
            this.velocityY = 0;
            this.isDropping = false;
          }
        }

        this.animationFrame = requestAnimationFrame(() => this.gameLoop());
        return;
      }

      // If returning home, walk toward home position
      if (this.isReturningHome) {
        const dx = this.homeX - this.x;
        const distanceX = Math.abs(dx);

        // Find ground and apply gravity
        const ground = this.findGround(this.x, this.y);
        const groundY = ground.y;
        const isGrounded = this.y >= groundY - 1;

        if (distanceX > 5) {
          this.facingLeft = dx < 0;
          this.x += Math.sign(dx) * Math.min(this.walkSpeed, distanceX);
          if (isGrounded) {
            this.state = "walking";
          }
        } else {
          // Arrived home
          this.isReturningHome = false;
          this.isStaying = true;
          this.isFixedMode = true;
          this.x = this.homeX;
          this.y = this.homeY;
          this.facingLeft = true;
          this.state = "sitting";
        }

        // Apply gravity while walking home
        if (!isGrounded) {
          this.velocityY += this.gravity;
          this.y += this.velocityY;
          this.state = "falling";
          if (this.y >= groundY) {
            this.y = groundY;
            this.velocityY = 0;
          }
        } else {
          this.y = groundY;
          this.velocityY = 0;
        }

        this.animationFrame = requestAnimationFrame(() => this.gameLoop());
        return;
      }

      // If staying, hold position completely - no gravity, no movement
      if (this.isStaying && !this.isLeaving) {
        if (!this.state.startsWith("emote-")) {
          this.state = "sitting";
        }
        this.animationFrame = requestAnimationFrame(() => this.gameLoop());
        return;
      }

      const dx = this.targetX - this.x;
      const distanceX = Math.abs(dx);

      // Find ground below
      const ground = this.findGround(this.x, this.y);
      const groundY = ground.y;
      const isGrounded = this.y >= groundY - 1;

      // Horizontal walking
      if (distanceX > 5) {
        this.facingLeft = dx < 0;
        const moveX = Math.sign(dx) * Math.min(this.walkSpeed, distanceX);
        this.x += moveX;

        if (isGrounded) {
          this.state = "walking";
        }
        this.idleTimer = 0;
      } else if (isGrounded) {
        this.idleTimer++;
        if (this.idleTimer > 90 && ground.element) {
          this.state = "sitting";
          this.onElement = ground.element;
        } else {
          this.state = "idle";
        }
      }

      // Gravity
      if (!isGrounded) {
        this.velocityY += this.gravity;
        this.y += this.velocityY;
        this.state = "falling";

        // Land on ground
        if (this.y >= groundY) {
          this.y = groundY;
          this.velocityY = 0;
        }
      } else {
        this.y = groundY;
        this.velocityY = 0;

        // Jump if cursor is significantly above
        if (this.targetY < this.y - 80 && distanceX < 100) {
          this.velocityY = this.jumpStrength;
          this.y -= 1; // Unstick from ground
        }
      }

      // Keep in bounds
      this.x = Math.max(0, Math.min(window.innerWidth - 32, this.x));
      this.y = Math.max(0, Math.min(window.innerHeight - 40, this.y));

      this.animationFrame = requestAnimationFrame(() => this.gameLoop());
    },
  },
};
</script>

<style scoped>
.pixel-buddy-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 9999;
}

.pixel-buddy {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: auto;
  cursor: grab;
  image-rendering: pixelated;
  transition: none;
  user-select: none;
}

.pixel-buddy.dragging {
  cursor: grabbing;
}

/* Dragged animation - legs dangle */
.pixel-buddy.dragged .legs {
  animation: dangle 0.3s ease-in-out infinite;
}

.pixel-buddy.dragged .character {
  animation: wiggle 0.2s ease-in-out infinite;
}

@keyframes dangle {
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

@keyframes wiggle {
  0%, 100% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(2deg);
  }
}

.character {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pixel-buddy.flipped .character {
  transform: scaleX(-1);
}

/* Head - 16x16 pixel art style */
.head {
  width: 16px;
  height: 16px;
  background: #ffcc99;
  border: 2px solid #333;
  border-radius: 2px;
  position: relative;
  box-shadow:
    inset 4px 4px 0 #ffe0b3,
    inset -2px -2px 0 #cc9966;
}

/* Eyes */
.head::before {
  content: "";
  position: absolute;
  top: 4px;
  left: 2px;
  width: 4px;
  height: 4px;
  background: #333;
  box-shadow: 6px 0 0 #333;
}

/* Mouth */
.head::after {
  content: "";
  position: absolute;
  bottom: 2px;
  left: 5px;
  width: 6px;
  height: 2px;
  background: #333;
}

/* Body */
.body {
  width: 12px;
  height: 12px;
  background: #4a90d9;
  border: 2px solid #333;
  margin-top: -2px;
  position: relative;
  box-shadow:
    inset 2px 2px 0 #6ab0ff,
    inset -2px -2px 0 #2a70b9;
}

/* Legs container */
.legs {
  display: flex;
  gap: 2px;
  margin-top: -2px;
}

.leg {
  width: 4px;
  height: 8px;
  background: #333;
  border-radius: 0 0 2px 2px;
}

/* Walking animation */
.pixel-buddy.walking .leg.left {
  animation: walk-left 0.2s steps(2) infinite;
}

.pixel-buddy.walking .leg.right {
  animation: walk-right 0.2s steps(2) infinite;
}

@keyframes walk-left {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@keyframes walk-right {
  0%,
  100% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(0);
  }
}

/* Sprinting animation - faster legs, forward lean */
.pixel-buddy.sprinting .character {
  transform: rotate(8deg);
}

.pixel-buddy.sprinting.flipped .character {
  transform: scaleX(-1) rotate(8deg);
}

.pixel-buddy.sprinting .leg.left {
  animation: sprint-left 0.1s steps(2) infinite;
}

.pixel-buddy.sprinting .leg.right {
  animation: sprint-right 0.1s steps(2) infinite;
}

@keyframes sprint-left {
  0%, 100% { transform: translateY(0) rotate(-10deg); }
  50% { transform: translateY(-4px) rotate(10deg); }
}

@keyframes sprint-right {
  0%, 100% { transform: translateY(-4px) rotate(10deg); }
  50% { transform: translateY(0) rotate(-10deg); }
}

/* Falling animation */
.pixel-buddy.falling .character {
  animation: fall-spin 0.3s linear infinite;
}

.pixel-buddy.falling .legs {
  transform: rotate(15deg);
}

@keyframes fall-spin {
  0%,
  100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

/* Sitting animation */
.pixel-buddy.sitting .body {
  height: 8px;
}

.pixel-buddy.sitting .legs {
  transform: rotate(90deg) translateX(4px);
  gap: 0;
}

.pixel-buddy.sitting .leg {
  height: 6px;
  width: 6px;
}

/* Idle animation - subtle breathing */
.pixel-buddy.idle .character {
  animation: breathe 1.5s ease-in-out infinite;
}

@keyframes breathe {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1px);
  }
}

/* Context Menu */
.context-menu {
  position: absolute;
  background: #222;
  border: 2px solid #444;
  border-radius: 4px;
  padding: 4px 0;
  min-width: 100px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 10000;
  pointer-events: auto;
}

.context-menu button {
  display: block;
  width: 100%;
  padding: 6px 12px;
  background: none;
  border: none;
  color: #fff;
  font-family: monospace;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
}

.context-menu button:hover {
  background: #444;
}

/* Jetpack */
.jetpack {
  position: absolute;
  top: 4px;
  left: -6px;
  width: 4px;
  height: 8px;
  background: #666;
  border: 1px solid #333;
  border-radius: 1px;
  opacity: 0;
  transition: opacity 0.1s;
}

.pixel-buddy.jetpacking .jetpack {
  opacity: 1;
}

.thrust-line {
  position: absolute;
  bottom: -2px;
  width: 2px;
  height: 0;
  background: linear-gradient(to bottom, #ff6600, #ffcc00, transparent);
  opacity: 0;
}

.thrust-line:nth-child(1) { left: 0; }
.thrust-line:nth-child(2) { left: 1px; }
.thrust-line:nth-child(3) { left: 2px; }

.pixel-buddy.jetpacking .thrust-line {
  opacity: 1;
  animation: thrust 0.15s ease-out infinite;
}

.pixel-buddy.jetpacking .thrust-line:nth-child(1) {
  animation-delay: 0s;
}
.pixel-buddy.jetpacking .thrust-line:nth-child(2) {
  animation-delay: 0.05s;
}
.pixel-buddy.jetpacking .thrust-line:nth-child(3) {
  animation-delay: 0.1s;
}

@keyframes thrust {
  0% {
    height: 4px;
    opacity: 1;
    bottom: -2px;
  }
  100% {
    height: 12px;
    opacity: 0;
    bottom: -14px;
  }
}

/* Jetpacking body wobble */
.pixel-buddy.jetpacking .character {
  animation: jetpack-hover 0.2s ease-in-out infinite;
}

.pixel-buddy.jetpacking .legs {
  animation: jetpack-legs 0.1s ease-in-out infinite;
}

@keyframes jetpack-hover {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-2px) rotate(2deg); }
}

@keyframes jetpack-legs {
  0%, 100% { transform: rotate(5deg); }
  50% { transform: rotate(-5deg); }
}

/* Flipped jetpack hover - account for scaleX(-1) */
.pixel-buddy.jetpacking.flipped .character {
  animation: jetpack-hover-flipped 0.2s ease-in-out infinite;
}

@keyframes jetpack-hover-flipped {
  0%, 100% { transform: scaleX(-1) translateY(0) rotate(-2deg); }
  50% { transform: scaleX(-1) translateY(-2px) rotate(2deg); }
}

/* Punching animation */
.pixel-buddy.punching .character {
  animation: punch-lunge 0.3s ease-out;
}

.pixel-buddy.punching .body::after {
  content: "";
  position: absolute;
  top: 2px;
  right: -10px;
  width: 10px;
  height: 4px;
  background: #ffcc99;
  border: 2px solid #333;
  border-radius: 2px;
  animation: punch-arm 0.3s ease-out;
}

.pixel-buddy.punching.flipped .body::after {
  right: auto;
  left: -10px;
}

@keyframes punch-lunge {
  0% { transform: translateX(0); }
  40% { transform: translateX(8px); }
  100% { transform: translateX(0); }
}

.pixel-buddy.punching.flipped .character {
  animation: punch-lunge-left 0.3s ease-out;
}

@keyframes punch-lunge-left {
  0% { transform: scaleX(-1) translateX(0); }
  40% { transform: scaleX(-1) translateX(8px); }
  100% { transform: scaleX(-1) translateX(0); }
}

@keyframes punch-arm {
  0% { width: 4px; right: -4px; }
  40% { width: 14px; right: -14px; }
  100% { width: 10px; right: -10px; }
}

/* Emote: Wave */
.pixel-buddy[class*="emote-wave"] .character {
  animation: wave-anim 0.4s ease-in-out 4;
}

@keyframes wave-anim {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-15deg); }
  75% { transform: rotate(15deg); }
}

/* Emote: Dance */
.pixel-buddy[class*="emote-dance"] .character {
  animation: dance-anim 0.3s ease-in-out infinite;
}

.pixel-buddy[class*="emote-dance"] .legs {
  animation: dance-legs 0.15s steps(2) infinite;
}

@keyframes dance-anim {
  0%, 100% { transform: translateX(-2px) rotate(-5deg); }
  50% { transform: translateX(2px) rotate(5deg); }
}

@keyframes dance-legs {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(-1); }
}

/* Emote: Sleep */
.pixel-buddy[class*="emote-sleep"] .head::before {
  background: transparent;
  box-shadow: none;
}

.pixel-buddy[class*="emote-sleep"] .head::after {
  width: 8px;
  height: 1px;
  bottom: 6px;
  left: 4px;
}

.pixel-buddy[class*="emote-sleep"] .character {
  animation: sleep-bob 1s ease-in-out infinite;
}

@keyframes sleep-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(2px); }
}

/* Emote: Celebrate */
.pixel-buddy[class*="emote-celebrate"] .character {
  animation: celebrate-jump 0.3s ease-out infinite;
}

@keyframes celebrate-jump {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.1); }
}

/* Leaving animation */
.pixel-buddy.leaving {
  animation: fade-out 2s ease-out forwards;
}

@keyframes fade-out {
  0% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}
</style>

<style>
/* Inspect highlight - global styles since it's teleported to body */
.pixel-buddy-inspect-highlight {
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  background: rgba(66, 133, 244, 0.15);
  border: 2px solid rgba(66, 133, 244, 0.8);
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(66, 133, 244, 0.3);
  transition: all 0.1s ease-out;
}

.pixel-buddy-inspect-highlight .inspect-label {
  position: absolute;
  bottom: 100%;
  left: -2px;
  background: rgba(66, 133, 244, 0.9);
  color: #fff;
  font-family: monospace;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 2px 2px 0 0;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Flash effect when element is clicked */
.pixel-buddy-clicked {
  animation: pixel-buddy-click-flash 0.2s ease-out !important;
}

@keyframes pixel-buddy-click-flash {
  0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.8); }
  50% { box-shadow: 0 0 0 8px rgba(66, 133, 244, 0.4); }
  100% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0); }
}
</style>
