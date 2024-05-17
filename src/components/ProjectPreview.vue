<template>
  <div class="preview-svg">
    <div class="laptop-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 430">
        <rect
          x="50"
          y="50"
          width="500"
          height="300"
          fill="yellow"
          stroke="red"
          stroke-width="3"
          rx="20"
        />
        <rect
          x="100"
          y="100"
          width="500"
          height="300"
          fill="pink"
          stroke="red"
          stroke-width="3"
          rx="20"
        />
        <!-- Add any additional laptop decoration elements here -->
      </svg>
    </div>
    <div class="screenshot-container">
      <img :src="screenshotUrl" alt="project-screenshot" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectPreview",
  props: {
    screenshotUrl: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.preview-svg {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.laptop-container {
  position: relative;
  inline-size: 500px;
  block-size: 300px;
}

.screenshot-container {
  position: absolute;
  inset-block-start:  60px;
  inline-size: 400px;
  block-size: 230px;
  overflow: hidden;
}

.screenshot-container img {
  display: block;
  inline-size: 100%;
  block-size: auto;
}
</style>
