<template>
  <PageWrapper id="project" class="">
    <HeroProject title="Project Title" class="" />

    <DetailCard2 id="detail1" class="" />

    <Wrapper id="" class="">
      <Container>
        <ThumbLarge
          class=""
          title=""
          filename="templates/template-lg.svg"
          alt="Jacques working at Myplanet"
          caption="This is caption text."
          style="background-color: #ffdd9d"
        />
      </Container>
    </Wrapper>
    <DetailCard id="detail2" class="topborder" header="The Solution" />
    <Wrapper id="" class="">
      <Container>
        <ThumbLarge
          class=""
          title=""
          filename="templates/template-lg.svg"
          alt="Jacques working at Myplanet"
          caption="This is caption text."
          style="background-color: #ffdd9d"
        />
      </Container>
    </Wrapper>
    <Wrapper class="  ">
      <Container>
        <!-- <h4 style="margin-bottom: 4rem; text-align: center;">More Projects</h4> -->
        <div class="grid-parent">
          <div>
            <h4 style="margin-bottom: 4rem">More Projects</h4>
            <router-link to="Work" style="margin-top: 4rem">
              <p>All Recent Work</p></router-link
            >
          </div>
          <ThumbSmall alt="Project Template" title="Project Template" />
          <ThumbSmall alt="Project Template" title="Project Template" />
        </div>
        <!-- <router-link
          :to="{ path: '/Work' + '#recentwork' }"
          style="margin-top: 4rem;"
          ><p>All Recent Work</p></router-link
        >
-->
        <!-- <router-link to="Work" style="margin-top: 4rem;">
              <p>All Recent Work</p></router-link
            >-->
      </Container>
    </Wrapper>
  </PageWrapper>
</template>

<script>
import PageWrapper from "@/components/grid/PageWrapper.vue";
import Wrapper from "@/components/grid/Wrapper.vue";
import Container from "@/components/grid/Container.vue";
// import TextDefault from "@/components/text/TextDefault.vue";
import HeroProject from "@/components/HeroProject.vue";
import ThumbLarge from "@/components/ThumbLarge.vue";
import ThumbSmall from "@/components/ThumbSmall.vue";
// import ThumbMedium from "@/components/ThumbMedium.vue";
import DetailCard from "@/components/card/DetailCard.vue";
import DetailCard2 from "@/components/card/DetailCard2.vue";

export default {
  name: "Project",
  components: {
    PageWrapper,
    Wrapper,
    Container,
    HeroProject,
    // TextDefault,
    // ThumbMedium,
    ThumbSmall,
    ThumbLarge,
    DetailCard,
    DetailCard2,
  },
};
</script>

<style scoped>
#heroimg {
  border-radius: 0 !important;
}
/* ------------ BREAKPOINT MD ------------ */
@media only screen and (min-width: 740px) {
  /* ------------ BREAKPOINT LG ------------ */
  @media only screen and (min-width: 1201px) {
  }
}
</style>

<style scoped></style>
