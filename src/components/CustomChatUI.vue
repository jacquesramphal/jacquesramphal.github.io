<template>
  <teleport to="body">
    <div class="custom-chat-ui">
      <!-- Floating Chat Button -->
      <button
        v-if="!isOpen"
        class="chat-button"
        :style="buttonStyle"
        @click="openChat"
        :aria-label="buttonLabel"
      >
        <img
          v-if="buttonIconSrc"
          :src="buttonIconSrc"
          :alt="buttonLabel"
          class="chat-button-icon"
        />
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="chat-button-icon"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      <!-- Chat Window -->
      <transition name="chat-window">
        <div v-if="isOpen">
          <div v-if="isFullscreen" class="chat-backdrop" aria-hidden="true" />
          <div
            class="chat-window"
            :class="[
              `chat-window--pos-${buttonPosition}`,
              { 'chat-window--fullscreen': isFullscreen },
            ]"
            :style="windowStyle"
          >
          <!-- Chat Header -->
          <div class="chat-header" :style="headerStyle">
            <div class="chat-header-info">
              <img
                v-if="titleAvatarSrc"
                :src="titleAvatarSrc"
                alt="Bot avatar"
                class="chat-header-avatar"
              />
              <h3 class="chat-header-title">{{ title }}</h3>
            </div>
            <div class="chat-header-actions">
              <button
                class="chat-header-button"
                @click="toggleFullscreen"
                :aria-label="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
                v-if="allowFullscreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="20"
                  height="20"
                >
                  <path
                    v-if="isFullscreen"
                    d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
                  />
                  <path
                    v-else
                    d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                  />
                </svg>
              </button>
              <button
                class="chat-header-button"
                @click="closeChat"
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="20"
                  height="20"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Chat Messages Container -->
          <div class="chat-messages" ref="messagesContainer">
            <!-- Welcome Message -->
            <div
              v-if="messages.length === 0 && welcomeMessage"
              class="chat-message chat-message--welcome"
            >
              <p class="chat-welcome-text">{{ welcomeMessage }}</p>
            </div>

            <!-- Starter Prompts -->
            <div
              v-if="messages.length === 0 && starterPrompts.length > 0"
              class="chat-starter-prompts"
            >
              <button
                v-for="(prompt, index) in starterPrompts"
                :key="index"
                class="chat-starter-prompt"
                @click="sendMessage(prompt)"
              >
                {{ prompt }}
              </button>
            </div>

            <!-- Messages -->
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="chat-message"
              :class="{
                'chat-message--bot': message.role === 'bot',
                'chat-message--user': message.role === 'user',
              }"
            >
              <img
                v-if="message.role === 'bot' && botAvatarSrc && showBotAvatar"
                :src="botAvatarSrc"
                alt="Bot"
                class="chat-message-avatar"
              />
              <img
                v-if="message.role === 'user' && userAvatarSrc && showUserAvatar"
                :src="userAvatarSrc"
                alt="User"
                class="chat-message-avatar"
              />
              <div
                class="chat-message-bubble"
                :style="message.role === 'bot' ? botMessageStyle : userMessageStyle"
                v-html="formatMessage(message.text)"
              ></div>
            </div>

            <!-- Loading Indicator -->
            <div v-if="isLoading" class="chat-message chat-message--bot">
              <img
                v-if="botAvatarSrc && showBotAvatar"
                :src="botAvatarSrc"
                alt="Bot"
                class="chat-message-avatar"
              />
              <div class="chat-loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="chat-error">
              <p>{{ error }}</p>
            </div>
          </div>

          <!-- Chat Input -->
          <div class="chat-input-container" :style="inputContainerStyle">
            <input
              v-model="inputMessage"
              type="text"
              :placeholder="inputPlaceholder"
              class="chat-input"
              :style="inputStyle"
              @keyup.enter="handleSend"
              @input="handleInput"
              ref="inputRef"
            />
            <button
              class="chat-send-button"
              @click="handleSend"
              :disabled="!canSend || isLoading"
              :style="sendButtonStyle"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="20"
                height="20"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          <!-- Character Limit Warning -->
          <div v-if="showCharWarning" class="chat-warning">
            <p>{{ maxCharsWarningMessage }}</p>
          </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "CustomChatUI",
  props: {
    // Webhook Configuration
    webhookUrl: {
      type: String,
      default:
        "https://orium.app.n8n.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat",
    },
    metadata: {
      type: Object,
      default: () => ({}),
    },

    // Button Configuration
    buttonPosition: {
      type: String,
      default: "bottom-right", // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    },
    buttonSize: {
      type: Number,
      default: 50,
    },
    buttonIconSrc: {
      type: String,
      default: "https://www.svgrepo.com/show/339963/chat-bot.svg",
    },
    buttonBackgroundColor: {
      type: String,
      default: "var(--background)",
    },
    buttonLabel: {
      type: String,
      default: "Open chat",
    },

    // Window Configuration
    width: {
      type: [Number, String],
      default: 400,
    },
    height: {
      type: [Number, String],
      default: 600,
    },
    backgroundColor: {
      type: String,
      default: "var(--background)",
    },
    borderRadius: {
      type: String,
      default: "12px",
    },
    allowFullscreen: {
      type: Boolean,
      default: true,
    },
    autoFullscreenOnDesktop: {
      type: Boolean,
      default: false,
    },
    desktopBreakpoint: {
      type: Number,
      default: 1024,
    },
    mobileFullscreenBreakpoint: {
      type: Number,
      default: 768,
    },
    fullscreenOnMobile: {
      type: Boolean,
      default: true,
    },

    // Header Configuration
    title: {
      type: String,
      default: "Rambot",
    },
    titleAvatarSrc: {
      type: String,
      default: "https://www.svgrepo.com/show/339963/chat-bot.svg",
    },
    headerBackgroundColor: {
      type: String,
      default: "var(--background)",
    },

    // Messages Configuration
    welcomeMessage: {
      type: String,
      default:
        "Hey! I’m Jake Ramphal’s site guide. Looking to learn about his projects, design work, or writing? Just ask—I’ll point you in the right direction.",
    },
    errorMessage: {
      type: String,
      default: "Please connect me to n8n first",
    },
    starterPrompts: {
      type: Array,
      default: () => [
        "Who is Jake Ramphal?",
        "What is Jake Ramphal's work?",
        "What is Jake Ramphal's writing?",
      ],
    },
    starterPromptFontSize: {
      type: Number,
      default: 15,
    },
    fontSize: {
      type: Number,
      default: 16,
    },
    renderHTML: {
      type: Boolean,
      default: false,
    },
    clearChatOnReload: {
      type: Boolean,
      default: false,
    },

    // Avatar Configuration
    botAvatarSrc: {
      type: String,
      default: "https://www.svgrepo.com/show/334455/bot.svg",
    },
    userAvatarSrc: {
      type: String,
      default: "https://www.svgrepo.com/show/532363/user-alt-1.svg",
    },
    showBotAvatar: {
      type: Boolean,
      default: true,
    },
    showUserAvatar: {
      type: Boolean,
      default: true,
    },
    avatarSize: {
      type: Number,
      default: 40,
    },
    avatarBorderRadius: {
      type: [Number, String],
      default: 25,
    },

    // Bot Message Styling
    botMessageBackgroundColor: {
      type: String,
      default: "var(--background-darker)",
    },
    botMessageTextColor: {
      type: String,
      default: "var(--foreground)",
    },
    botMessageBorderRadius: {
      type: Number,
      default: 6,
    },

    // User Message Styling
    userMessageBackgroundColor: {
      type: String,
      default: "var(--background-reversed)",
    },
    userMessageTextColor: {
      type: String,
      default: "var(--foreground-reversed)",
    },
    userMessageBorderRadius: {
      type: Number,
      default: 6,
    },

    // Input Configuration
    inputPlaceholder: {
      type: String,
      default: "Type your query",
    },
    inputBackgroundColor: {
      type: String,
      default: "var(--background)",
    },
    inputTextColor: {
      type: String,
      default: "var(--foreground)",
    },
    inputBorderRadius: {
      type: Number,
      default: 6,
    },
    sendButtonColor: {
      type: String,
      default: "var(--link)",
    },
    sendButtonBorderRadius: {
      type: Number,
      default: 50,
    },
    maxChars: {
      type: Number,
      default: 50,
    },
    maxCharsWarningMessage: {
      type: String,
      default:
        "You exceeded the characters limit. Please input less than 50 characters.",
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      isFullscreen: false,
      fullscreenForcedByMobile: false,
      viewportWidth: typeof window !== "undefined" ? window.innerWidth : 1024,
      messages: [],
      inputMessage: "",
      isLoading: false,
      error: null,
      showCharWarning: false,
      sessionId: null,
      bodyScrollLocked: false,
      scrollLockY: 0,
    };
  },
  created() {
    this.sessionId = this.getOrCreateSessionId();
  },
  computed: {
    isDesktop() {
      return this.viewportWidth >= this.desktopBreakpoint;
    },
    isMobile() {
      return this.viewportWidth <= this.mobileFullscreenBreakpoint;
    },
    resolvedMetadata() {
      const safeLocation =
        typeof window !== "undefined" && window?.location?.href
          ? window.location.href
          : null;
      const safeReferrer =
        typeof document !== "undefined" && document?.referrer
          ? document.referrer
          : null;
      const safeUserAgent =
        typeof navigator !== "undefined" && navigator?.userAgent
          ? navigator.userAgent
          : null;
      const safeTimezone =
        typeof Intl !== "undefined" && Intl?.DateTimeFormat
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : null;

      return {
        ...(this.metadata || {}),
        url: safeLocation,
        referrer: safeReferrer,
        userAgent: safeUserAgent,
        timezone: safeTimezone,
        timestamp: new Date().toISOString(),
      };
    },
    buttonStyle() {
      const positions = {
        // Match the old inline widget spacing (20px edge)
        // Uses your numeric scale: --size-5 == 2rem (20px since html is 10px)
        "bottom-right": { bottom: "var(--size-5)", right: "var(--size-5)" },
        "bottom-left": { bottom: "var(--size-5)", left: "var(--size-5)" },
        "top-right": { top: "var(--size-5)", right: "var(--size-5)" },
        "top-left": { top: "var(--size-5)", left: "var(--size-5)" },
      };

      return {
        width: `${this.buttonSize}px`,
        height: `${this.buttonSize}px`,
        backgroundColor: this.buttonBackgroundColor,
        ...positions[this.buttonPosition],
      };
    },
    windowStyle() {
      if (this.isFullscreen) {
        return {
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          borderRadius: "0",
          bottom: "0",
          right: "0",
          top: "0",
          left: "0",
        };
      }

      const edge = "var(--size-5)"; // 20px
      const positions = {
        "bottom-right": {
          right: edge,
          bottom: edge,
        },
        "bottom-left": {
          left: edge,
          bottom: edge,
        },
        "top-right": {
          right: edge,
          top: edge,
        },
        "top-left": {
          left: edge,
          top: edge,
        },
      };

      return {
        width: typeof this.width === "number" ? `${this.width}px` : this.width,
        height:
          typeof this.height === "number" ? `${this.height}px` : this.height,
        backgroundColor: this.backgroundColor,
        borderRadius: this.borderRadius,
        ...positions[this.buttonPosition],
      };
    },
    headerStyle() {
      return {
        backgroundColor: this.headerBackgroundColor,
      };
    },
    botMessageStyle() {
      return {
        backgroundColor: this.botMessageBackgroundColor,
        color: this.botMessageTextColor,
        borderRadius: `${this.botMessageBorderRadius}px`,
      };
    },
    userMessageStyle() {
      return {
        backgroundColor: this.userMessageBackgroundColor,
        color: this.userMessageTextColor,
        borderRadius: `${this.userMessageBorderRadius}px`,
      };
    },
    inputContainerStyle() {
      return {
        backgroundColor: this.inputBackgroundColor,
      };
    },
    inputStyle() {
      return {
        backgroundColor: this.inputBackgroundColor,
        color: this.inputTextColor,
        borderRadius: `${this.inputBorderRadius}px`,
      };
    },
    sendButtonStyle() {
      return {
        color: this.sendButtonColor,
        borderRadius: `${this.sendButtonBorderRadius}px`,
      };
    },
    canSend() {
      if (!this.inputMessage.trim()) return false;
      if (this.maxChars && this.inputMessage.length > this.maxChars)
        return false;
      return true;
    },
  },
  methods: {
    generateSessionId() {
      return (
        Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
      );
    },
    lockBodyScroll() {
      if (this.bodyScrollLocked) return;
      if (typeof window === "undefined" || typeof document === "undefined") return;

      this.scrollLockY = window.scrollY || window.pageYOffset || 0;

      // More reliable than just `overflow: hidden` (esp. iOS Safari)
      document.body.style.position = "fixed";
      document.body.style.top = `-${this.scrollLockY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";

      this.bodyScrollLocked = true;
    },
    unlockBodyScroll() {
      if (!this.bodyScrollLocked) return;
      if (typeof window === "undefined" || typeof document === "undefined") return;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, this.scrollLockY || 0);
      this.bodyScrollLocked = false;
    },
    syncFullscreenRootClass() {
      // HeaderNav sits at z-index: 100000; make fullscreen chat reliably overlay it.
      const cls = "chat-fullscreen-open";
      if (typeof document === "undefined") return;
      if (this.isFullscreen) {
        document.documentElement.classList.add(cls);
        this.lockBodyScroll();
      } else {
        document.documentElement.classList.remove(cls);
        this.unlockBodyScroll();
      }
    },
    getOrCreateSessionId() {
      const storageKey = `chat-session-${this.webhookUrl}`;
      if (this.clearChatOnReload) {
        try {
          localStorage.removeItem(storageKey);
        } catch (e) {
          // ignore
        }
        return this.generateSessionId();
      }

      try {
        const existing = localStorage.getItem(storageKey);
        if (existing) return existing;
        const created = this.generateSessionId();
        localStorage.setItem(storageKey, created);
        return created;
      } catch (e) {
        return this.generateSessionId();
      }
    },
    openChat() {
      this.isOpen = true;
      // On mobile, default to fullscreen (so we also lock scroll + overlay nav).
      // On desktop, always open in the windowed state (fullscreen only when user selects it).
      if (this.fullscreenOnMobile && this.isMobile) {
        this.isFullscreen = true;
        this.fullscreenForcedByMobile = true;
      } else {
        this.isFullscreen = false;
        this.fullscreenForcedByMobile = false;
      }
      this.syncFullscreenRootClass();
      this.$nextTick(() => {
        if (this.autoFocus && this.$refs.inputRef) {
          this.$refs.inputRef.focus();
        }
      });
    },
    closeChat() {
      this.isOpen = false;
      this.isFullscreen = false;
      this.fullscreenForcedByMobile = false;
      this.syncFullscreenRootClass();
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      // Any manual toggle means fullscreen state is user-driven now.
      this.fullscreenForcedByMobile = false;
      this.syncFullscreenRootClass();
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    handleInput() {
      if (this.maxChars && this.inputMessage.length > this.maxChars) {
        this.showCharWarning = true;
        setTimeout(() => {
          this.showCharWarning = false;
        }, 3000);
      } else {
        this.showCharWarning = false;
      }
    },
    async handleSend() {
      if (!this.canSend || this.isLoading) return;

      const messageText = this.inputMessage.trim();
      this.inputMessage = "";
      this.showCharWarning = false;

      // Add user message
      this.messages.push({
        role: "user",
        text: messageText,
        timestamp: new Date(),
      });

      this.$nextTick(() => {
        this.scrollToBottom();
      });

      // Send to webhook
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(this.webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            // Match the n8nchatui widget payload shape
            action: "sendMessage",
            chatInput: messageText,
            sessionId: this.sessionId,
            metadata: this.resolvedMetadata,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Handle various n8n response formats
        let botResponse = this.errorMessage;
        
        if (typeof data === 'string') {
          botResponse = data;
        } else if (data?.response) {
          botResponse = data.response;
        } else if (data?.message) {
          botResponse = data.message;
        } else if (data?.text) {
          botResponse = data.text;
        } else if (data?.output) {
          // n8n sometimes wraps responses in output
          botResponse = typeof data.output === 'string' ? data.output : data.output?.message || data.output?.response || this.errorMessage;
        } else if (Array.isArray(data) && data.length > 0) {
          // Handle array responses
          botResponse = typeof data[0] === 'string' ? data[0] : data[0]?.message || data[0]?.response || this.errorMessage;
        } else if (data?.data) {
          botResponse = typeof data.data === 'string' ? data.data : data.data?.message || data.data?.response || this.errorMessage;
        }

        // Add bot message
        this.messages.push({
          role: "bot",
          text: botResponse,
          timestamp: new Date(),
        });

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        console.error("Chat error:", error);
        this.error = this.errorMessage;
        this.messages.push({
          role: "bot",
          text: this.errorMessage,
          timestamp: new Date(),
        });
      } finally {
        this.isLoading = false;
      }
    },
    sendMessage(message) {
      this.inputMessage = message;
      this.handleSend();
    },
    formatMessage(text) {
      if (this.renderHTML) {
        return text;
      }
      // Escape HTML if not rendering HTML
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML.replace(/\n/g, "<br>");
    },
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.messagesContainer) {
          this.$refs.messagesContainer.scrollTop =
            this.$refs.messagesContainer.scrollHeight;
        }
      });
    },
    handleResize() {
      // Keep viewport-derived computed props reactive (prevents "sticky" mobile/desktop behavior)
      this.viewportWidth = window.innerWidth;

      if (!this.isOpen) return;

      // If the viewport becomes mobile-sized while chat is open, force fullscreen.
      if (this.fullscreenOnMobile && this.isMobile) {
        if (!this.isFullscreen) {
          this.isFullscreen = true;
          this.fullscreenForcedByMobile = true;
          this.syncFullscreenRootClass();
        }
        return;
      }
      // If fullscreen was forced by mobile, revert to windowed when leaving mobile width.
      if (this.fullscreenForcedByMobile && this.isFullscreen) {
        this.isFullscreen = false;
        this.fullscreenForcedByMobile = false;
        this.syncFullscreenRootClass();
      }
      // Desktop: do not auto-enter fullscreen on resize.
    },
    handleEscapeKey(event) {
      if (event.key === "Escape" && this.isOpen) {
        // On mobile we treat fullscreen as the default state, so Escape should close.
        if (this.fullscreenOnMobile && this.isMobile) {
          this.closeChat();
          return;
        }
        if (this.isFullscreen) {
          this.isFullscreen = false;
          this.fullscreenForcedByMobile = false;
          this.syncFullscreenRootClass();
        } else {
          this.closeChat();
        }
      }
    },
  },
  mounted() {
    // Initialize viewportWidth + keep it updated (even when chat is closed)
    this.viewportWidth = window.innerWidth;
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("keydown", this.handleEscapeKey);

    // Load messages from localStorage if not clearing on reload
    if (!this.clearChatOnReload) {
      const savedMessages = localStorage.getItem(`chat-messages-${this.webhookUrl}`);
      if (savedMessages) {
        try {
          this.messages = JSON.parse(savedMessages);
        } catch (e) {
          console.error("Error loading saved messages:", e);
        }
      }
    }

    // Note: desktop should not auto-open fullscreen; fullscreen is user-selected.
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("keydown", this.handleEscapeKey);
    // Clean up just in case
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("chat-fullscreen-open");
    }
    this.unlockBodyScroll();
  },
  watch: {
    messages: {
      handler(newMessages) {
        // Save messages to localStorage
        if (!this.clearChatOnReload) {
          localStorage.setItem(
            `chat-messages-${this.webhookUrl}`,
            JSON.stringify(newMessages)
          );
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.custom-chat-ui {
  position: relative;
  z-index: 9999;
  font-family: var(--fontFamily-primary);

  /* Component-local tokens (mapped to your global tokens) */
  --chat-surface: var(--background);
  --chat-surface-2: var(--background-darker);
  --chat-ink: var(--foreground);
  --chat-border: var(--border);
  --chat-shadow: var(--shadow-deep);
  --chat-shadow-hover: var(--shadow-hover);
  --chat-radius: var(--spacing-xs);
  --chat-radius-lg: var(--spacing-sm);
  /* Focus ring uses your action color token */
  --chat-ring: 0 0 0 0.3rem rgba(100, 21, 255, 0.18); /* fallback */
}

@supports (color: color-mix(in srgb, #000 50%, transparent)) {
  .custom-chat-ui {
    --chat-ring: 0 0 0 0.3rem
      color-mix(in srgb, var(--color-action) 22%, transparent);
  }
}

/* Chat Button */
.chat-button {
  position: fixed;
  cursor: pointer;
  border: var(--chat-border);
  box-shadow: var(--shadow-z4);
  color: var(--chat-ink);
  border-radius: var(--chat-radius);
  background: var(--chat-surface);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 9998;

  &:hover {
    transform: scale(1.05);
    box-shadow: var(--chat-shadow-hover);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-z4), var(--chat-ring);
  }

  .chat-button-icon {
    width: 60%;
    height: 60%;
    object-fit: contain;
    filter: var(--filter);
  }
}

/* Chat Window */
.chat-window {
  position: fixed;
  display: flex;
  flex-direction: column;
  box-shadow: var(--chat-shadow);
  z-index: 9999;
  overflow: hidden;
  color: var(--chat-ink);
  background: var(--chat-surface);
  border: var(--chat-border);
  border-radius: var(--chat-radius-lg);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  max-height: min(76vh, 64rem);
  max-width: min(92vw, 44rem);
  transform-origin: bottom right;

  &--fullscreen {
    /* Header nav is z-index: 100000; ensure chat overlays everything */
    z-index: 100001;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    transform-origin: center;
  }

  &--pos-bottom-right {
    transform-origin: bottom right;
  }
  &--pos-bottom-left {
    transform-origin: bottom left;
  }
  &--pos-top-right {
    transform-origin: top right;
  }
  &--pos-top-left {
    transform-origin: top left;
  }

  @media (max-width: 768px) {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
    border-radius: 0 !important;
  }
}

/* Chat Header */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Match inline widget feel: a bit roomier, 20px horizontal */
  padding: var(--size-4) var(--size-5);
  border-bottom: var(--chat-border);
  min-height: 60px;

  &-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &-avatar {
    width: 40px;
    height: 40px;
    border-radius: var(--chat-radius);
    object-fit: cover;
    box-shadow: var(--shadow-light);
  }

  &-title {
    margin: 0;
    font-size: var(--font-500);
    font-weight: var(--fontWeight-bold);
    letter-spacing: var(--letterSpacing-tight);
  }

  &-actions {
    display: flex;
    gap: 0.5rem;
  }

  &-button {
    background: transparent;
    border: var(--chat-border);
    cursor: pointer;
    padding: var(--spacing-xxs);
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    border-radius: var(--chat-radius);
    transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;

    &:hover {
      background-color: var(--chat-surface-2);
      transform: translateY(-1px);
      box-shadow: var(--shadow-z1);
    }

    &:active {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--shadow-z1), var(--chat-ring);
    }

    svg {
      stroke: currentColor;
    }
  }
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--size-5);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  scroll-behavior: smooth;
  /* Match site default <p> scale */
  font-size: var(--font-500);
  line-height: var(--lineHeight-taller);
}

.chat-welcome-text {
  text-align: center;
  color: inherit;
  opacity: 0.7;
  margin: 0;
  padding: var(--spacing-sm);
  line-height: var(--lineHeight-taller);
}

.chat-starter-prompts {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.chat-starter-prompt {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--chat-surface-2);
  border: var(--chat-border);
  border-radius: var(--chat-radius);
  cursor: pointer;
  text-align: left;
  font-size: inherit;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
  color: inherit;

  &:hover {
    box-shadow: var(--shadow-z2);
    transform: translateX(4px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-z2), var(--chat-ring);
  }
}

.chat-message {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  max-width: 85%;

  &--welcome {
    max-width: 100%;
    justify-content: center;
  }

  &--bot {
    align-self: flex-start;
  }

  &--user {
    align-self: flex-end;
    flex-direction: row-reverse;
  }
}

.chat-message-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--chat-radius);
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: var(--shadow-light);
}

.chat-message-bubble {
  padding: var(--spacing-xs) var(--spacing-sm);
  line-height: var(--lineHeight-taller);
  word-wrap: break-word;
  border: var(--chat-border);
  box-shadow: var(--shadow-z1);
  font-size: inherit;

  :deep(a) {
    color: inherit !important;
    text-decoration-thickness: 0.1rem !important;
    text-underline-offset: 0.35rem;
  }
}

.chat-loading {
  display: flex;
  gap: 4px;
  padding: var(--spacing-xs) var(--spacing-sm);

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
    animation: chat-loading 1.4s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

@keyframes chat-loading {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.chat-error {
  padding: var(--spacing-sm);
  background-color: var(--chat-surface-2);
  color: var(--chat-ink);
  border: var(--chat-border);
  border-left: var(--spacing-xxxs) solid var(--color-danger);
  border-radius: var(--chat-radius);
  margin-top: 1rem;

  p {
    margin: 0;
  }
}

.chat-warning {
  padding: var(--spacing-xxs) var(--spacing-sm);
  background-color: var(--chat-surface-2);
  color: var(--chat-ink);
  border-top: var(--chat-border);
  border-left: var(--spacing-xxxs) solid var(--color-yellow);
  font-size: 0.875rem;
  text-align: center;

  p {
    margin: 0;
  }
}

/* Chat Input */
.chat-input-container {
  display: flex;
  gap: 0.5rem;
  padding: var(--size-4) var(--size-5);
  border-top: var(--chat-border);
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    var(--chat-surface)
  );
}

.chat-input {
  flex: 1;
  border: var(--chat-border);
  padding: var(--spacing-xs) var(--spacing-sm);
  outline: none;
  font-family: inherit;
  font-size: var(--font-500);
  line-height: var(--lineHeight-taller);

  &:focus {
    border-color: var(--link);
  }

  &:focus-visible {
    box-shadow: var(--chat-ring);
  }

  &::placeholder {
    opacity: 0.6;
  }
}

.chat-send-button {
  background: var(--chat-surface-2);
  border: var(--chat-border);
  cursor: pointer;
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  min-width: 44px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow-z2);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-z2), var(--chat-ring);
  }

  svg {
    stroke: currentColor;
  }
}

:root.chat-fullscreen-open #headernav {
  z-index: 0 !important;
}

:root.chat-fullscreen-open,
:root.chat-fullscreen-open body {
  /* Prevent background scrolling when chat is fullscreen */
  overflow: hidden !important;
  height: 100%;
  overscroll-behavior: none;
}

.chat-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100000;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.18);
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}

@supports (color: color-mix(in srgb, #000 50%, transparent)) {
  .chat-backdrop {
    background: color-mix(in srgb, var(--background-reversed) 12%, transparent);
  }
}

/* Transitions */
.chat-window-enter-active,
.chat-window-leave-active {
  transition: all 0.3s ease;
}

.chat-window-enter-from {
  opacity: 0;
  transform: scale(0.25);
}

.chat-window-enter-to {
  opacity: 1;
  transform: scale(1);
}

.chat-window-leave-from {
  opacity: 1;
  transform: scale(1);
}

.chat-window-leave-to {
  opacity: 0;
  transform: scale(0.25);
}

@media (prefers-reduced-motion: reduce) {
  .chat-button,
  .chat-window-enter-active,
  .chat-window-leave-active,
  .chat-starter-prompt,
  .chat-send-button,
  .chat-header-button {
    transition: none !important;
  }
}

/* Scrollbar Styling */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--color-xlight);
  border-radius: 3px;

  &:hover {
    background: var(--color-light);
  }
}
</style>

