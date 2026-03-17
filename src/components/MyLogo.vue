<template>
  <div 
    id="MyLogo" 
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <svg
      :block-size="size"
      viewBox="0 0 35 43"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>J Unicorn - UX Generalist</title>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="Group" transform="translate(1.000000, 1.000000)">
          <rect
            id="Rectangle"
            fill-rule="nonzero"
            x="0"
            y="0"
            width="33"
            block-size="40"
          ></rect>
          <g
            id="monogram"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :class="{ 'theme-colors': !isHovered }"
          >
            <line
              x1="7.87671568"
              y1="32.2940555"
              x2="13.3684216"
              y2="26.8023105"
              id="Path"
              :stroke="isHovered ? '#FFC972' : 'currentColor'"
            ></line>
            <line
              x1="28.2714969"
              y1="36.7954314"
              x2="29.3954283"
              y2="35.6715"
              id="Path"
              :stroke="isHovered ? '#FFBCCD' : 'currentColor'"
            ></line>
            <path
              d="M30.8347073,0 C31.6940468,0.859339425 31.7038862,2.26257319 30.8347073,3.11197581 L30.8258421,3.12093842 L22.7435118,11.2032688"
              id="Path"
              :stroke="isHovered ? '#00D2C5' : 'currentColor'"
            ></path>
            <path
              d="M5.31616476,22.4065375 L3.76007944,23.9626229 L3.76017686,23.9626229 C2.88320446,24.8040371 1.50754048,24.8219623 0.648201053,23.9626229 C-0.21114032,23.1032834 -0.220979713,21.7000497 0.648201053,20.8506471 L0.648103633,20.8505496 L1.27051828,20.228135"
              id="Path"
              :stroke="isHovered ? '#00D2C5' : 'currentColor'"
            ></path>
            <path
              d="M19.631536,4.97926845 C20.4908754,5.83860787 21.8665394,5.82068264 22.7435118,4.97926845 L26.3223229,1.40035989"
              id="Path"
              :stroke="isHovered ? '#F85CA5' : 'currentColor'"
            ></path>
            <line
              x1="20.4961361"
              y1="1.19534007"
              x2="21.6203597"
              y2="0.0711164018"
              id="Path"
              :stroke="isHovered ? '#FFBCCD' : 'currentColor'"
            ></line>
            <path
              d="M26.4779022,26.140928 L29.24774,23.3710903 L29.239849,23.3632967 C30.1167239,22.5218825 31.4924853,22.5039573 32.3517273,23.3632967 C33.2111642,24.2226361 33.2210036,25.6258699 32.3517273,26.4752725 L32.0795366,26.7633426"
              id="Path"
              :stroke="isHovered ? '#FFC972' : 'currentColor'"
            ></path>
            <path
              d="M19.9426946,14.004086 C19.0735158,14.8534886 19.0833552,16.2567223 19.9426946,17.1160618 C20.802034,17.9754012 22.177698,17.957476 23.0546704,17.1160618 L26.1667436,14.0039885 L29.239849,10.9308832 C30.1167239,10.089469 31.4924853,10.0715438 32.3517273,10.9308832"
              id="Path"
              :stroke="isHovered ? '#FFC972' : 'currentColor'"
            ></path>
            <path
              d="M25.8554876,39.2114407 C24.9786126,40.0528549 23.6028512,40.0707801 22.7435118,39.2114407 C21.8841724,38.3521013 21.874333,36.9488675 22.7435118,36.0994649 L29.5899755,29.2529038"
              id="Path"
              :stroke="isHovered ? '#00D2C5' : 'currentColor'"
            ></path>
            <path
              d="M32.0795366,14.3152446 L9.98425511,36.4106235 C9.1150763,37.2600261 9.12491569,38.6632599 9.98425511,39.5225993 C10.8435945,40.3819387 12.2192585,40.3640135 13.0962309,39.5225993 L13.7186456,38.9001847 L23.3497548,29.2690755"
              id="Path"
              :stroke="isHovered ? '#80CCEB' : 'currentColor'"
            ></path>
            <path
              d="M5.31616476,34.8546356 C4.43919237,35.6960498 3.06352838,35.713975 2.20418896,34.8546356 C1.34484953,33.9952962 1.33501014,32.5920624 2.20418896,31.7426598 L10.917731,23.0289522 C11.7869098,22.1795496 11.7770704,20.7763158 10.917731,19.9169764 C10.0583915,19.057637 8.68269832,19.0755622 7.80572592,19.9169764"
              id="Path"
              :stroke="isHovered ? '#F85CA5' : 'currentColor'"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "MyLogo",
  props: {
    size: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      isHovered: false
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  color: inherit;
}

/* Theme colors */
.theme-colors {
  color: black; /* Default light theme */
}

@media (prefers-color-scheme: dark) {
  .theme-colors {
    color: white;
  }
}

:root.light-theme .theme-colors {
  color: black;
}

:root.dark-theme .theme-colors {
  color: white;
}

/* Monogram styling */
#monogram {
  transition: all 0.5s ease-in-out;
  z-index: 10000;
}

#monogram:hover {
  stroke-dasharray: 100;
  animation: dash infinite 10s ease-in-out;
}

#MyLogo {
  block-size: 3.6rem;
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    block-size: 4rem;
  }

  @media only screen and (min-width: 1201px) {
    block-size: 4.8rem;
  }
}

</style>
