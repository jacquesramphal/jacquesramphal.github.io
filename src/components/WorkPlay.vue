<template>
  <div id="workplay">
    <div id="grid-parent" class="grid-parent container">
      <ThumbSmall title="Small Card 1" />
      <ThumbSmall title="Small Card 2" />
      <ThumbSmall title="Small Card 3" />
      <ThumbSmall title="Small Card 4" /> 
      <ThumbMedium title="Wide Card 1" />
      <ThumbLarge title="Hero Card 1" />
      <!-- <span class="grid-card yellow">
        <span class="caption"><p>This is a label</p></span>
        <a class="zoom"
          ><img draggable="false" src="@/assets/images/j.svg"
        /></a>
      </span>
      <span class="grid-card grey">
        <span class="caption"><p>This is a label</p></span>
        <a class="zoom"
          ><img draggable="false" src="@/assets/images/gob.svg"
        /></a>
      </span>
      <span class="grid-card pink">
        <a class="gif hidemobile" />
        <a class="showmobile"
          ><img draggable="false" src="@/assets/images/avatar.svg"
        /></a>
      </span>
      <span class="grid-card grey">
        <span class="caption"><p>This is a label</p></span>
        <a class="zoom"
          ><img draggable="false" src="@/assets/images/template-m.svg"
        /></a>
      </span>
      <span class="grid-card twowide rose">
        <span class="caption"><p>This is a label</p></span>
        <a class="zoom"
          ><img draggable="false" src="@/assets/images/dod.svg"
        /></a>
      </span>
      <span class="grid-card hero blue">
        <span class="caption"><p>This is a label</p></span>
        <a href="project.html" class="zoom"
          ><img draggable="false" src="@/assets/images/glo.svg"
        /></a>
      </span> -->
    </div>
  </div>
</template>

<script>
import ThumbSmall from "@/components/ThumbSmall.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";

export default {
  name: "WorkPlay",
  components: {
    ThumbSmall,
    ThumbMedium,
    ThumbLarge,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding-top: 0 !important;
}
.gif {
  display: none;
  background-image: url("../assets/images/avatar.svg");
  background-size: 100%;
  background-repeat: no-repeat;
  -webkit-transition: none;
  border-radius: 4px !important;
}
.gif:hover {
  background-image: url("../assets/images/avatar-h.svg");
}
.gif:active {
  background-image: url("../assets/images/avatar-a.svg");
}
.twowide {
  grid-column: 1 / 4;
}
.hero {
  grid-column: 1 / 4;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  .gif {
    display: block;
  }

  .twowide {
    grid-column: 1 / 3;
  }
  .hero {
    grid-column: 1 / 3;
  }

  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
    .twowide {
      grid-column: 2 / -1;
    }
    .hero {
      grid-column: 1 / 4;
    }
  }
}
</style>
