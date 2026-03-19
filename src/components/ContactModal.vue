<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="modal-close" @click="close" aria-label="Close">&times;</button>

        <TextBlock
          :title="projectTitle"
          as="h3"
          description="I can't share this one publicly, but I'd be happy to walk you through it."
        />

        <MyButton
          type="solid"
          label="Send me an email"
          :link="mailtoLink"
        />
      </div>
    </div>
  </Teleport>
</template>

<script>
import TextBlock from '@/components/text/TextBlock/TextBlock.vue';
import MyButton from '@/components/Button/Button.vue';

export default {
  name: 'ContactModal',
  components: {
    TextBlock,
    MyButton,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    projectTitle: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: 'hello@jacquesramphal.com',
    },
  },
  emits: ['close'],
  computed: {
    mailtoLink() {
      const subject = encodeURIComponent(`Re: ${this.projectTitle}`);
      const body = encodeURIComponent(`Hi Jacques,\n\nI'd like to learn more about ${this.projectTitle}.\n\n`);
      return `mailto:${this.email}?subject=${subject}&body=${body}`;
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', this.handleKeydown);
      } else {
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', this.handleKeydown);
      }
    },
  },
  methods: {
    handleKeydown(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    },
    close() {
      this.$emit('close');
    },
  },
  beforeUnmount() {
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: var(--spacing-md);
}

.modal-content {
  background: var(--background);
  color: var(--foreground);
  border-radius: var(--spacing-xs);
  padding: var(--spacing-lg);
  max-width: 768px;
  width: 100%;
  position: relative;
  box-shadow: var(--shadow-z5);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
}

.modal-close {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  background: none;
  border: none;
  font-size: var(--font-600);
  cursor: pointer;
  color: var(--foreground);
  opacity: 0.6;
  transition: opacity 0.2s;
  line-height: 1;
  padding: var(--spacing-xxs);

  &:hover {
    opacity: 1;
  }
}

</style>

<style lang="scss">
body.modal-open #headernav {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}
</style>
