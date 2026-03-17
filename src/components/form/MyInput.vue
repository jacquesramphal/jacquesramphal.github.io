<template>
  <div id="input" class="">
    <label :for="id">{{ label }}</label><br />
    <input
      v-if="type === 'text' || type === 'password' || type === 'email'"
      :id="id"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      required
    />
    <input
      v-else-if="type === 'checkbox' || type === 'radio'"
      :id="id"
      :type="type"
      :name="name"
      required
    />
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    id: {
      type: String,
      default: "id",
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
  },
};
</script>