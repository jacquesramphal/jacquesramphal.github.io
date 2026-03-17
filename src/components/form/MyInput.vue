<template>
  <div id="input" class="">
    <label v-if="!hideLabel && label" :for="id">{{ label }}</label
    ><br v-if="!hideLabel && label" />

    <!-- Text / email / password — optionally with inline submit button -->
    <div
      v-if="type === 'text' || type === 'password' || type === 'email'"
      class="input-wrap"
      :class="{
        'input-wrap--with-submit': submitButton,
        'input-wrap--small': size === 'small',
      }"
    >
      <input
        ref="inputEl"
        :id="id"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :class="[inputClass, { 'input-field--has-submit': submitButton }]"
        :disabled="disabled"
        :required="required"
        :maxlength="maxlength || undefined"
        :autocomplete="autocomplete || undefined"
        :value="modelValue === undefined ? undefined : modelValue"
        v-bind="$attrs"
        @input="onTextInput"
      />
      <button
        v-if="submitButton"
        class="input-submit-btn"
        type="button"
        :disabled="submitDisabled"
        @click="$emit('submit')"
        aria-label="Submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          width="16"
          height="16"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>

    <!-- Checkbox / radio -->
    <input
      v-else-if="type === 'checkbox' || type === 'radio'"
      ref="inputEl"
      :id="id"
      :type="type"
      :name="name"
      :class="inputClass"
      :disabled="disabled"
      :required="required"
      :checked="modelValue === undefined ? undefined : !!modelValue"
      v-bind="$attrs"
      @change="onToggleChange"
    />
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  inheritAttrs: false,
  emits: ['update:modelValue', 'input', 'change', 'submit'],
  props: {
    id: {
      type: String,
      default: 'id',
    },
    modelValue: {
      type: [String, Boolean, Number],
      default: undefined,
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: 'name',
    },
    label: {
      type: String,
      default: 'This is a label',
    },
    placeholder: {
      type: String,
      default: 'This is a placeholder',
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: [String, Array, Object],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: true,
    },
    maxlength: {
      type: Number,
      default: null,
    },
    autocomplete: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default', // 'default' | 'small'
    },
    submitButton: {
      type: Boolean,
      default: false,
    },
    submitDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    focus() {
      if (this.$refs.inputEl && typeof this.$refs.inputEl.focus === 'function') {
        this.$refs.inputEl.focus();
      }
    },
    onTextInput(e) {
      const value = e?.target?.value ?? '';
      this.$emit('update:modelValue', value);
      this.$emit('input', e);
    },
    onToggleChange(e) {
      const checked = !!e?.target?.checked;
      this.$emit('update:modelValue', checked);
      this.$emit('change', e);
    },
  },
};
</script>

<style scoped>
#input {
  width: 100%;
}

.input-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(var(--spacing-md) * 2);
  padding: 0 var(--spacing-xs) 0 0;
}

/* When submit button is present, the wrap becomes the visual "field" */
.input-wrap--with-submit {
  border: transparent;
  border-radius: var(--radius-sm);
  background-color: var(--background-darker);
  box-sizing: border-box;
}

.input-wrap--with-submit:focus-within {
  outline: 2px solid var(--foreground); /* design-guard:ignore */
  outline-offset: 0;
  background: inherit;
}

/* Strip the input of its own visual styles — the wrapper is the field now */
.input-wrap--with-submit input {
  flex: 1;
  min-width: 0;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  outline: none !important;
  margin: 0 !important;
}

.input-submit-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--spacing-md);
  height: var(--spacing-md);
  padding: 0;
  border: none;
  border-radius: 50%; /* design-guard:ignore */
  background: var(--background-reversed, var(--color-black));
  color: var(--foreground-reversed, var(--color-white));
  cursor: pointer;
  transition: opacity 0.2s;
}

.input-submit-btn svg {
  stroke: var(--foreground-reversed, var(--color-white));
  display: block;
}

.input-submit-btn:hover:not(:disabled) {
  opacity: 0.8;
}

.input-submit-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.input-submit-btn:focus-visible {
  outline: 2px solid var(--color-action); /* design-guard:ignore */
  outline-offset: 2px; /* design-guard:ignore */
}

/* Small variant */
.input-wrap--small {
  height: auto;
}

.input-wrap--small input {
  padding: var(--spacing-xxs) var(--spacing-xxxs) var(--spacing-xxs) var(--spacing-xs);
  font-size: var(--font-400);
  height: auto;
}

.input-wrap--small .input-submit-btn {
  width: 22px; /* design-guard:ignore */
  height: 22px; /* design-guard:ignore */
}

.input-wrap--small .input-submit-btn svg {
  width: 12px; /* design-guard:ignore */
  height: 12px; /* design-guard:ignore */
}
</style>
