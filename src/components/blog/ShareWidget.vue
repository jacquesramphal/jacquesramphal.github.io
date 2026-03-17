<template>
  <div class="share-widget">
    <SelectorCta
      v-model="isOpen"
      class="share-widget__selector"
      :label="label"
      icon="icon/share.svg"
      align="end"
      placement="top-end"
    >
      <template #menu="{ close }">
        <button class="selector-item" role="menuitem" @click.stop="shareTo('x'); close()">
          X
        </button>
        <button class="selector-item" role="menuitem" @click.stop="shareTo('linkedin'); close()">
          LinkedIn
        </button>
        <button class="selector-item" role="menuitem" @click.stop="shareTo('facebook'); close()">
          Facebook
        </button>
        <div class="selector-divider" role="separator"></div>
        <button class="selector-item" role="menuitem" @click.stop="copyLink(); close()">
          Copy link
        </button>
      </template>
    </SelectorCta>
  </div>
</template>

<script>
import SelectorCta from "@/components/Button/SelectorCta.vue";

export default {
  name: "ShareWidget",
  components: { SelectorCta },
  props: {
    label: {
      type: String,
      default: "Share",
    },
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    getShareUrl() {
      if (this.url && typeof this.url === "string" && this.url.trim().length > 0) {
        return this.url.trim();
      }
      if (typeof window !== "undefined" && window.location?.href) {
        return window.location.href;
      }
      return "";
    },
    getShareTitle() {
      if (this.title && typeof this.title === "string" && this.title.trim().length > 0) {
        return this.title.trim();
      }
      if (typeof document !== "undefined" && document.title) {
        return document.title;
      }
      return "";
    },
    shareTo(network) {
      const url = encodeURIComponent(this.getShareUrl());
      const text = encodeURIComponent(this.getShareTitle());

      let shareUrl = "";
      if (network === "x") {
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      } else if (network === "linkedin") {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      } else if (network === "facebook") {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      }

      if (shareUrl && typeof window !== "undefined") {
        window.open(shareUrl, "_blank", "noopener,noreferrer");
      }
    },
    async copyLink() {
      const link = this.getShareUrl();
      if (!link) return;

      try {
        await navigator.clipboard.writeText(link);
      } catch (e) {
        // Fallback for older browsers / non-secure contexts
        try {
          const el = document.createElement("textarea");
          el.value = link;
          el.setAttribute("readonly", "");
          el.style.position = "absolute";
          el.style.left = "-9999px";
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
        } catch (err) {
          // silently fail
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.share-widget {
  display: inline-flex;
  align-items: center;
}
</style>
