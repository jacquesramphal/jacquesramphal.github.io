<template>
  <div id="textarea" class="">
    <label :for="`${name}`">{{ label }}</label
    ><br />
    <textarea
      cols="1"
      :rows="rows"
      :id="`${id}`"
      :name="`${name}`"
      :placeholder="`${placeholder}`"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "TextArea",
  emits: ['update:modelValue'],
  props: {
    id: {
      type: String,
      default: "id",
    },
    name: {
      type: String,
      default: "name",
    },
    label: {
      type: String,
      default: "This is label",
    },
    placeholder: {
      type: String,
      default: "This is an placeholder",
    },
    modelValue: {
      type: String,
      default: "",
    },
    rows: {
      type: [String, Number],
      default: 3,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
#textarea {
  width: 100%;
}

textarea {
  font-family: var(--fontFamily-primary) !important;
  font-weight: var(--fontWeight-medium) !important;
}
</style>
