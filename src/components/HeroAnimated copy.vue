<template>
  <div id="bg" class="fullvh ">
  
   <div id="test"></div>
<svg width="64px" block-size="64px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="core/image/j" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-0.000000, 0.000000)" fill="#FEDCA1">
            <rect id="Rectangle" x="0" y="0" width="64" block-size="64"></rect>
        </g>
        <g id="monogram" transform="translate(14.000000, 10.717642)" stroke="#FCB138" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <line x1="7.87671689" y1="32.4473913" x2="13.3684637" y2="26.9775856" id="stroke"></line>
            <line x1="28.271505" y1="36.9308234" x2="29.3954368" y2="35.811382" id="stroke"></line>
            <path d="M30.8346774,0.282358421 C31.6940171,1.13826483 31.7038565,2.53589277 30.8346774,3.38190207 L30.8258122,3.39082888 L22.7434791,11.4408708" id="stroke"></path>
            <path d="M5.3161651,22.5993638 L3.76007925,24.1492326 C2.88320398,24.9872854 1.50753953,25.005139 0.648199812,24.1492326 C-0.211139905,23.2933262 -0.220979301,21.8956983 0.648199812,21.049689 L1.27051725,20.4296638" id="stroke"></path>
            <path d="M19.6315509,5.24173499 C20.4908906,6.0976414 21.8665551,6.07978778 22.7435278,5.24173499 L26.3223401,1.67712395" id="stroke"></path>
            <line x1="20.2648984" y1="0.91295366" x2="21.8516129" y2="0.916129689" id="stroke" transform="translate(21.058256, 0.914542) rotate(-45.000000) translate(-21.058256, -0.914542) "></line>
            <path d="M26.4779,26.3188938 L29.2477387,23.5601214 L29.2398477,23.5523589 C30.116723,22.7143061 31.4924848,22.6964525 32.3517271,23.5523589 C33.2111643,24.4082653 33.2210037,25.8058933 32.3517271,26.6519026 L32.0795363,26.9388219" id="stroke"></path>
            <path d="M19.9426902,14.2305474 C19.073511,15.0765567 19.0833504,16.4741846 19.9426902,17.330091 C20.8020299,18.1859975 22.1776943,18.1681438 23.054667,17.330091 L26.1667413,14.2304504 L29.2398477,11.1696219 C30.116723,10.3315691 31.4924848,10.3137155 32.3517271,11.1696219" id="stroke"></path>
            <path d="M25.8554657,39.3371808 C24.9785904,40.1752336 23.6028285,40.1930872 22.7434888,39.3371808 C21.8841491,38.4812744 21.8743097,37.0836465 22.7434888,36.2376372 L29.5899548,29.4184277" id="stroke"></path>
            <path d="M32.0795363,14.5404532 L9.9842473,36.5475624 C9.11506819,37.3935717 9.12490758,38.7911997 9.9842473,39.6471061 C10.843587,40.5030125 12.2192515,40.4851589 13.0962242,39.6471061 L13.718639,39.0271779 L23.3497515,29.4345445" id="stroke"></path>
            <path d="M5.3161651,34.9977227 C4.43919241,35.8357755 3.06352796,35.8536291 2.20418824,34.9977227 C1.34484853,34.1418163 1.33500913,32.7441883 2.20418824,31.898179 L10.917704,23.2192822 C11.7868831,22.3732729 11.7770437,20.975645 10.917704,20.1197385 C10.0583643,19.2638321 8.6826998,19.2816857 7.80572711,20.1197385" id="stroke"></path>
        </g>
    </g>

</svg>
    <svg
      width="446"
      block-size="446"
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
          block-size="446"
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
  props: {
    header: {
      type: String,
      default: "Designer of web things",
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
  inline-size: 100vw;
  min-height: 320px;
   /* text-align: center; */
  /* color: var(--color-action2) 
  background-image: url("../assets/images/splash.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 100%; */
}

/* ---- ANIMATIONS ---- */

svg {
  overflow: hidden;
  inline-size: 100%;
  block-size: 100%;
}
#moon {
  animation: sunset 4s ease-in-out 2s infinite alternate;
}
#moon:active {
  animation-play-state: paused;
}


@keyframes sunset {
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(50%);
  }
  75% {
    transform: translateX(100%);
  }
  100% {
    transform: rotate(0%);
  }
}

@keyframes move {
  from { inset-block-start:  0; inset-inline-start:  0; }
  to   { inset-block-start:  100px; inset-inline-start:  100px; }
}





#test {
  border-radius: 100px;
  position: fixed;
  inline-size: 100px;
  block-size: 100px;
  background-color: red;
  animation: example 4s ease-in-out 2s infinite alternate;
}
#test:active {
  animation-play-state: paused;
}



@keyframes example {
  0% {
    background-color: red;
    inset-inline-start:  0px;
    inset-block-start:  0px;
  }
  25% {
    background-color: yellow;
    inset-inline-start:  200px;
    inset-block-start:  0px;
  }
  50% {
    background-color: blue;
    inset-inline-start:  200px;
    inset-block-start:  200px;
  }
  75% {
    background-color: green;
    inset-inline-start:  0px;
    inset-block-start:  200px;
  }
  100% {
    background-color: red;
    inset-inline-start:  0px;
    inset-block-start:  0px;
  }
}

/* Monogram styling */
#monogram {
    transition: all .5s ease-in-out;

}
    #monogram:hover {
      stroke-width: 3px;
  stroke-dasharray: 100;
  animation: dash infinite 10s ease-in-out;
}

@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}
</style>
