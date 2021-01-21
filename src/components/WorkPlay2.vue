<template>
  <div id="workplay">
    <div id="grid-parent" class="grid-parent container">
      <ThumbLarge
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="500"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="blue"
        title="Fortune 100"
        filename="glo.svg"
      />
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="0"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="yellow"
        title="Monogram"
        filename="j.svg"
      />
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="grey"
        title="Giftbook"
        filename="gob.svg"
      />
      <ThumbSmall2
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="pink hidemobile"
        title=""
        filename="avatar.svg"
      />
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="200"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="pink showmobile"
        title="Avatar"
        filename="avatar.svg"
      />
      <ThumbSmall
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="300"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="grey"
        title="Small Template"
        filename="template-m.svg"
      />
      <ThumbMedium
        data-aos="fade"
        data-aos-duration="1000"
        data-aos-delay="400"
        data-aos-once="true"
        data-aos-anchor-placement="top"
        class="rose"
        title="DevopsDays"
        filename="dod.svg"
      />
      
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
import ThumbSmall2 from "@/components/ThumbSmall2.vue";
import ThumbMedium from "@/components/ThumbMedium.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";

export default {
  name: "WorkPlay2",
  components: {
    ThumbSmall,
    ThumbSmall2,
    ThumbMedium,
    ThumbLarge,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-size: 10px;
}
.container {
  padding-top: 0 !important;
}
.twowide {
  grid-column: 1 / 4;
}
.hero {
  grid-column: 1 / 4;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
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

<style scoped>
@import "../assets/styles/all.css";
</style>
