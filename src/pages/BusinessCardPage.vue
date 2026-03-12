<template>
  <GridContainer style="background: none" fullvh id="wrapper" align-items="center">
    <GridParent
      tight
      rows
      style="
        grid-template-columns: none !important;
        grid-template-rows: repeat(6, auto);
        background: none;
        block-size: 100%;
        justify-content: space-between;
      "
    >
      <div><p>Ramphal—Design</p></div>

      <TextBlock
        as="h1"
        title="Jacques Ramphal"
        description="I lead design work where systems, code, and AI meet—building the practices and platforms that let cross-functional teams deliver meaningful products efficiently and sustainably."
      />

      <!-- <div style="background: none"><h1 class="display">Jacques Ramphal</h1></div> -->
      <div style="text-align: left; grid-row: 3 / 4">
        <ul>
          <li>
            <p>hello@ramphal.design</p>

            <p>github</p>

            <p>linkedin</p>
          </li>
        </ul>
      </div>
    </GridParent>
  </GridContainer>
  <!-- <MainFooter />
    <GridWrapper id="wrapper">
      <GridContainer fullvh>
        <GridParent
          tight
          style="grid-template-columns: none !important; grid-template-rows: repeat(2, auto)"
        >
          <div>
            <router-link to="/doc/cv">
              <img
                id="avatar"
                src="../assets/images/portrait.jpg"
                draggable="false"
                alt="Jacques Ramphal"
                style="width: 120px; aspect-ratio: 1 / 1"
              />
            </router-link>
          </div>

          <GridParent tight class="outer">
            <div id="maindetails">
              <TextBlock
                as="h4"
                title="Jacques Ramphal"
                description="Head of Design · Toronto, ON"
              />
            </div>

            <div id="links">
              <ul>
                <li v-for="(item, index) in contactLinks" :key="index">
                  <TextLink :label="item.text" :link="item.url" />
                </li>
              </ul>
            </div>
          </GridParent>
        </GridParent>
      </GridContainer>
    </GridWrapper> -->
</template>

<script>
// import MainFooter from '@/components/MainFooter.vue';
import GridContainer from '@/components/grid/GridContainer.vue';
// import GridWrapper from '@/components/grid/GridWrapper.vue';
import GridParent from '@/components/grid/GridParent.vue';
import TextBlock from '@/components/text/TextBlock/TextBlock.vue';
// import TextBlock from '@/components/text/TextBlock/TextBlock.vue';
// import TextLink from '@/components/text/TextLink.vue';
// import AnimatedComponent from '@/components/AnimatedComponent.vue';

export default {
  name: 'BusinessCardPage',
  components: {
    GridContainer,
    // GridWrapper,
    GridParent,
    TextBlock,
    // TextLink,
    // AnimatedComponent,
    // MainFooter,
  },
  data() {
    return {
      contactLinks: [
        { text: 'Email', url: 'mailto:jacques@ramphal.design' },
        { text: 'LinkedIn', url: 'https://linkedin.com/in/ramphal-design' },
        { text: 'GitHub', url: 'https://github.com/jacquesramphal' },
        { text: 'Resume', url: '/doc/cv' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#wrapper {
  border-block-start: var(--border);
  align-items: stretch !important;
  block-size: 100dvh !important;
  min-block-size: 0 !important;
  box-sizing: border-box !important;
}

.outer {
  grid-template-columns: repeat(1, 1fr);

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

#maindetails {
  @media only screen and (min-width: 768px) {
    padding-inline-end: var(--spacing-md);
  }
}

ul {
  list-style: none;
  margin: 0;
  padding: var(--spacing-xxs) 0 0 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
}

li {
  inline-size: 100%;
  font-size: var(--font-500);
  line-height: var(--lineHeight-tall);
  list-style-type: none;
}

#avatar:hover {
  animation: animate-shake 1s;
}
</style>
