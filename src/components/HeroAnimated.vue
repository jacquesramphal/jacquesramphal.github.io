<template>
  <div id="bg" class="fullvh" :style="bgStyle">
    <svg width="64px" height="64px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Your SVG content here -->
    </svg>
    <svg
      width="446"
      height="446"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      >
      <g id="moon" filter="url(#filter0_i)">
        <path
          d="M446 223C446 346.16 346.16 446 223 446C99.8405 446 0 346.16 0 223C0 99.8405 99.8405 0 223 0C346.16 0 446 99.8405 446 223Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_i"
          x="0"
          y="0"
          width="446"
          height="446"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="85" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.741667 0 0 0 0 0.741667 0 0 0 0 0.741667 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: "HeroAnimated",
  data() {
    return {
      isDaytime: true, // Assume it's daytime initially
    };
  },
  computed: {
    bgStyle() {
      // Determine background color and moon animation state based on time of day
      return {
        backgroundColor: this.isDaytime ? "#FEDCA1" : "#000000", // Change colors as needed
      };
    },
  },
  created() {
    // Check the time of day and update isDaytime accordingly
    this.checkTimeOfDay();
    // Update time every minute
    setInterval(this.checkTimeOfDay, 60000);
  },
  methods: {
    checkTimeOfDay() {
      const now = new Date();
      const currentHour = now.getHours();

      // Define your daytime and nighttime hours
      const daytimeStartHour = 6;
      const daytimeEndHour = 18;

      // Determine if it's daytime based on the current hour
      this.isDaytime = currentHour >= daytimeStartHour && currentHour < daytimeEndHour;
    },
  },
};
</script>

<style scoped>
* {
  color: inherit;
  mix-blend-mode: normal;
}
#bg {
  width: 100vw;
  min-height: 320px;
}

/* ---- ANIMATIONS ---- */

svg {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

#moon {
  animation: moonMove 8s linear infinite;
}

@keyframes moonMove {
  0%, 100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}
</style>
