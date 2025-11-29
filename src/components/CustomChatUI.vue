<template>
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
      <div
        v-if="isOpen"
        class="chat-window"
        :class="{ 'chat-window--fullscreen': isFullscreen }"
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
              :style="
                message.role === 'bot'
                  ? botMessageStyle
                  : userMessageStyle
              "
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
    </transition>
  </div>
</template>

<script>
export default {
  name: "CustomChatUI",
  props: {
    // Webhook Configuration
    webhookUrl: {
      type: String,
      required: true,
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
      default: 60,
    },
    buttonIconSrc: {
      type: String,
      default: "https://www.svgrepo.com/show/339963/chat-bot.svg",
    },
    buttonBackgroundColor: {
      type: String,
      default: "#fff",
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
      default: "#ffffff",
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
      default: "#ffffff",
    },

    // Messages Configuration
    welcomeMessage: {
      type: String,
      default:
        "Hey! I'm Jake Ramphal's site guide. Looking to learn about his projects, design work, or writing? Just ask—I'll point you in the right direction.",
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
      default: "#fff",
    },
    botMessageTextColor: {
      type: String,
      default: "#050505",
    },
    botMessageBorderRadius: {
      type: Number,
      default: 6,
    },

    // User Message Styling
    userMessageBackgroundColor: {
      type: String,
      default: "#f2f2f2",
    },
    userMessageTextColor: {
      type: String,
      default: "#050505",
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
      default: "#ffffff",
    },
    inputTextColor: {
      type: String,
      default: "#1e1e1f",
    },
    inputBorderRadius: {
      type: Number,
      default: 6,
    },
    sendButtonColor: {
      type: String,
      default: "#000",
    },
    sendButtonBorderRadius: {
      type: Number,
      default: 50,
    },
    maxChars: {
      type: Number,
      default: null, // null means no limit
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
      messages: [],
      inputMessage: "",
      isLoading: false,
      error: null,
      showCharWarning: false,
      sessionId: this.generateSessionId(),
    };
  },
  computed: {
    isDesktop() {
      return window.innerWidth >= this.desktopBreakpoint;
    },
    buttonStyle() {
      const positions = {
        "bottom-right": { bottom: "20px", right: "20px" },
        "bottom-left": { bottom: "20px", left: "20px" },
        "top-right": { top: "20px", right: "20px" },
        "top-left": { top: "20px", left: "20px" },
      };

      return {
        width: `${this.buttonSize}px`,
        height: `${this.buttonSize}px`,
        backgroundColor: this.buttonBackgroundColor,
        borderRadius: "15px",
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
        };
      }

      return {
        width: typeof this.width === "number" ? `${this.width}px` : this.width,
        height:
          typeof this.height === "number" ? `${this.height}px` : this.height,
        backgroundColor: this.backgroundColor,
        borderRadius: this.borderRadius,
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
        fontSize: `${this.fontSize}px`,
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
    openChat() {
      this.isOpen = true;
      if (this.autoFullscreenOnDesktop && this.isDesktop) {
        this.isFullscreen = true;
      }
      this.$nextTick(() => {
        if (this.autoFocus && this.$refs.inputRef) {
          this.$refs.inputRef.focus();
        }
      });
    },
    closeChat() {
      this.isOpen = false;
      this.isFullscreen = false;
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
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
          },
          body: JSON.stringify({
            message: messageText,
            sessionId: this.sessionId,
            metadata: this.metadata,
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
      // Auto-adjust fullscreen if needed
      if (this.isDesktop && this.autoFullscreenOnDesktop) {
        this.isFullscreen = true;
      }
    },
    handleEscapeKey(event) {
      if (event.key === "Escape" && this.isOpen) {
        if (this.isFullscreen) {
          this.isFullscreen = false;
        } else {
          this.closeChat();
        }
      }
    },
  },
  mounted() {
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

    // Auto-open if configured for desktop
    if (this.autoFullscreenOnDesktop && this.isDesktop) {
      this.isOpen = true;
      this.isFullscreen = true;
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("keydown", this.handleEscapeKey);
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

<style lang="scss" scoped>
.custom-chat-ui {
  position: relative;
  z-index: 9999;
}

/* Chat Button */
.chat-button {
  position: fixed;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 9998;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  .chat-button-icon {
    width: 60%;
    height: 60%;
    object-fit: contain;
  }
}

/* Chat Window */
.chat-window {
  position: fixed;
  bottom: 80px;
  right: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  overflow: hidden;

  &--fullscreen {
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
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
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 60px;

  &-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  &-title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
  }

  &-actions {
    display: flex;
    gap: 0.5rem;
  }

  &-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
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
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scroll-behavior: smooth;
}

.chat-welcome-text {
  text-align: center;
  color: inherit;
  opacity: 0.7;
  margin: 0;
  padding: 1rem;
}

.chat-starter-prompts {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.chat-starter-prompt {
  padding: 0.75rem 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  font-size: inherit;
  transition: all 0.2s;
  color: inherit;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: translateX(4px);
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
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.chat-message-bubble {
  padding: 0.75rem 1rem;
  line-height: 1.5;
  word-wrap: break-word;
}

.chat-loading {
  display: flex;
  gap: 4px;
  padding: 0.75rem 1rem;

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
  padding: 1rem;
  background-color: #fee;
  color: #c33;
  border-radius: 8px;
  margin-top: 1rem;

  p {
    margin: 0;
  }
}

.chat-warning {
  padding: 0.5rem 1rem;
  background-color: #fff3cd;
  color: #856404;
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
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.chat-input {
  flex: 1;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1rem;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: rgba(0, 0, 0, 0.3);
  }

  &::placeholder {
    opacity: 0.6;
  }
}

.chat-send-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  min-width: 44px;

  &:hover:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    stroke: currentColor;
  }
}

/* Transitions */
.chat-window-enter-active,
.chat-window-leave-active {
  transition: all 0.3s ease;
}

.chat-window-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.chat-window-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

/* Scrollbar Styling */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>

