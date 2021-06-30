<template>
  <span class="grid-card thumbdetail">
    <span tabindex="0" class="caption">
    <h6 tabIndex="0" class="">{{ title }}</h6>
    <br/>
      <p tabIndex="0" class="subtle">{{ details }}</p>
  
      </span>
        <span class="overlay">
    </span>
    <a class="">
      <img 
        draggable="false" 
        :src="require(`@/assets/images/${filename}`)"
        :alt="(`${alt}`)"
      />
    </a>
  </span>
</template>

<script>

export default {
  name: "ThumbDetail",
 
  props: {
    title: {
      type: String,
      default: "Default Caption",
    },
    details: {
      type: String,
      default: "Lorem ipsum doler optima sit amet doler optima sit amet optima sit amet amet doler optima sit amet optima sit amet optima sit amet amet doler optima sit amet optima sit amet ",
    },
    filename: {
      type: String,
      default: "template-v2.svg",
    },
    alt: {
      type: String,
      default: "This is an image",
    },
  },
};
</script>

<style scoped>
@import "../assets/styles/all.css";

.thumbdetail {
  background-color: black;
  grid-column: 1 / 4;
      grid-template-rows: repeat(2, 1fr);
      grid-gap: 2.8rem;
      height: 90vh;

}
.caption{

color: white !important;
}

  .grid-card:hover .caption  {
  color: white !important;

  }

/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {

  .thumbdetail {
    grid-column: 1 / 3;
          grid-template-rows: none;
      height: auto;

          grid-template-columns: repeat(2, 1fr);

  }
.caption{
      grid-column: 1 / 2;

 

}
}

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .grid-parent {
      grid-template-columns: repeat(3, 1fr);
    }
    .thumbdetail {
      grid-column: span 2;
    }}
    
</style>
