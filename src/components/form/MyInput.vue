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

/* Default (large) text field. This component owns its own geometry rather than
   inheriting it from form.scss, for two reasons: `size` is a prop, so a global
   sheet can't express the variants below; and all.css imports form.scss BEFORE
   typography.scss, so an element-level rule there loses to any prose rule at
   equal specificity — which is how this field ended up with --lineHeight-body
   and stood 2px taller than the button beside it. Scoped styles carry the
   [data-v-*] attribute and win over both globals.
   Every value is a shared FORM CONTROLS token, so the button reads the same
   numbers and the two can't drift apart again. */
input[type='text'],
input[type='email'],
input[type='password'] {
  padding: var(--control-pad-block-start-lg) var(--control-pad-inline-lg)
    var(--control-pad-block-end-lg);
  font-size: var(--font-500);
  line-height: var(--control-lineHeight);
  /* Invisible, but it reserves the space a button spends on its stroke. */
  border: var(--control-border-width) solid transparent;
  border-radius: var(--spacing-xxs);
  box-sizing: border-box;
  width: 100%;
}

.input-wrap {
  display: flex;
  align-items: center;
  width: 100%;
}

/* form.scss gives every input a --spacing-field bottom margin so stacked forms
   breathe. Inside a field row that margin is dead space below the control: it
   made the wrap 10px taller than the input and pushed a sibling button out of
   alignment. Rows own their own gaps. */
.input-wrap input {
  margin-block-end: 0;
}

/* When submit button is present, the wrap becomes the visual "field" — so it,
   not the input, has to carry the control stroke. --border supplies the themed
   colour; the width comes from the control token so this field matches a button
   of the same size instead of landing 2px short on --border's 1px. */
.input-wrap--with-submit {
  border: var(--border);
  border-width: var(--control-border-width);
  border-radius: var(--spacing-xxs);
  background-color: var(--background);
  box-sizing: border-box;
  padding: 0 var(--spacing-xs) 0 0;
}

.input-wrap--with-submit:focus-within {
  outline: 2px solid var(--foreground); /* design-guard:ignore */
  outline-offset: 0;
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

/* Small variant: same geometry as button--small. */
.input-wrap--small input {
  padding: var(--control-pad-block-start-sm) var(--control-pad-inline-sm)
    var(--control-pad-block-end-sm);
  font-size: var(--font-400);
  border-radius: var(--spacing-xxs);
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
