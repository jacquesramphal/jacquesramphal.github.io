<template>
  <div id="input" class="">
    <label v-if="!hideLabel && label" :for="id">{{ label }}</label
    ><br v-if="!hideLabel && label" />
    <input
      v-if="type === 'text' || type === 'password' || type === 'email'"
      ref="inputEl"
      :id="id"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :class="inputClass"
      :disabled="disabled"
      :required="required"
      :maxlength="maxlength || undefined"
      :autocomplete="autocomplete || undefined"
      :value="modelValue === undefined ? undefined : modelValue"
      v-bind="$attrs"
      @input="onTextInput"
    />
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
  name: "MyInput",
  inheritAttrs: false,
  emits: ["update:modelValue", "input", "change"],
  props: {
    id: {
      type: String,
      default: "id",
    },
    modelValue: {
      // Only used when parent binds v-model
      type: [String, Boolean, Number],
      default: undefined,
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "name",
    },
    label: {
      type: String,
      default: "This is a label",
    },
    placeholder: {
      type: String,
      default: "This is a placeholder",
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: [String, Array, Object],
      default: "",
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
      default: "",
    },
  },
  methods: {
    focus() {
      if (this.$refs.inputEl && typeof this.$refs.inputEl.focus === "function") {
        this.$refs.inputEl.focus();
      }
    },
    onTextInput(e) {
      const value = e?.target?.value ?? "";
      this.$emit("update:modelValue", value);
      this.$emit("input", e);
    },
    onToggleChange(e) {
      const checked = !!e?.target?.checked;
      this.$emit("update:modelValue", checked);
      this.$emit("change", e);
    },
  },
};
</script>