<template>
  <PageWrapper>
    <!--  <RichTextRenderer :document="document" /> -->
    <HeroBanner
      id="hero"
      style="background: var(--bg-darker)"
      :title="info.name"
      subtitle="A collection of recent work and play lorem ipsum doler."
      eyebrow=""
      label="Request Access"
      route="work2"
    />
    <Container>
      <input type="radio" id="All" name="categories" value="All" checked />
      <input type="radio" id="CSS" name="categories" value="CSS" />
      <input
        type="radio"
        id="JavaScript"
        name="categories"
        value="JavaScript"
      />
      <input type="radio" id="jQuery" name="categories" value="jQuery" />
      <input type="radio" id="WordPress" name="categories" value="WordPress" />
      <input type="radio" id="Slider" name="categories" value="Slider" />
      <input
        type="radio"
        id="fullPage.js"
        name="categories"
        value="fullPage.js"
      />

      <ol class="filters">
        <li>
          <label for="All">All</label>
        </li>
        <li>
          <label for="CSS">CSS</label>
        </li>
        <li>
          <label for="JavaScript">JavaScript</label>
        </li>
        <li>
          <label for="jQuery">jQuery</label>
        </li>
        <li>
          <label for="WordPress">WordPress</label>
        </li>
        <li>
          <label for="Slider">Slider</label>
        </li>
        <li>
          <label for="fullPage.js">fullPage.js</label>
        </li>
      </ol>
      <div id="recentwork" class="posts grid-parent">
        <ThumbSmall v-for="(entry, i) in projects.entries" :key="i"
          class="post"
          :eyebrow="entry.location"
          :title="entry.title"
          style="background-color: var(--bg-darker)"
        />
      </div>

      <!-- <div id="recentwork" class="posts grid-parent">
        <ThumbSmall
          class="post"
          eyebrow="Wordpress jQuery"
          title="title"
          style="background-color: var(--bg-darker)"
        />
        <ThumbSmall
          class="post"
          eyebrow="Slider CSS"
          title="title"
          style="background-color: var(--bg-darker)"
        />
        <ThumbSmall
          class="post"
          eyebrow="JavaScript jQuery"
          title="title"
          style="background-color: var(--bg-darker)"
        />
        <ThumbSmall
          class="post"
          eyebrow="Wordpress jQuery"
          title="title"
          style="background-color: var(--bg-darker)"
        />
        <ThumbSmall
          class="post"
          eyebrow="Slider CSS"
          title="title"
          style="background-color: var(--bg-darker)"
        />
        <ThumbSmall
          class="post"
          eyebrow="JavaScript jQuery"
          title="title"
          style="background-color: var(--bg-darker)"
        />
      </div> -->
    </Container>

    <!-- <Container id="work">
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h4 class="subtle" style="text-align: left">Section Title</h4>
       
      </div>
      <div id="recentwork" class="grid-parent">
        <ThumbSmall
          filename="templates/template-v2.svg"
          style="background-color: lightpink"
        />
        <ThumbSmall
          alt="Template Project"
          style="background-color: var(--link)"
          details="This is a project description that would give a preview into the project..."
          filename="templates/template-mobile-blank.svg"
          title="Small Template"
        />
        <ThumbSmall
          style="background-color: var(--color-lightyellow)"
          alt="Template Project"
          filename="templates/template-v2.svg"
          title="Small Template"
          details="This is a project description that would give a preview into the project..."
        />
      </div>
    </Container>
    <TextImage
      flipped
      style="background: var(--bg-darker)"
      filename="work/glo.svg"
      header="Featured Project"
      details="This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. This is a short description taken from the article. "
      route="project"
      cta="Read More"
    /> -->
    <!-- <Container id="work">
      <div
        class="grid-parent"
        style="
          padding-bottom: var(--spacing-md);
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <h4 class="subtle" style="text-align: left">Section Title</h4>

      </div>
      <div id="recentwork" class="grid-parent">
        <ThumbSmall
          filename="templates/template-v2.svg"
          style="background-color: lightpink"
        />
        <ThumbSmall
          alt="Template Project"
          style="background-color: var(--link)"
          details="This is a project description that would give a preview into the project..."
          filename="templates/template-mobile-blank.svg"
          title="Small Template"
        />
        <ThumbSmall
          style="background-color: var(--color-lightyellow)"
          alt="Template Project"
          filename="templates/template-v2.svg"
          title="Small Template"
          details="This is a project description that would give a preview into the project..."
        />
        <ThumbSmall
          alt="Template Project"
          style="background-color: pu"
          details="This is a project description that would give a preview into the project..."
          filename="templates/template-mobile-blank.svg"
          title="Small Template"
        />

        <ThumbSmall
          style="background-color: palegoldenrod"
          alt="Template Project"
          filename="templates/template-v2.svg"
          title="Small Template"
          details="This is a project description that would give a preview into the project..."
        />
        <ThumbSmall
          filename="templates/template-mobile-blank.svg"
          style="background-color: lightgreen"
        />
        <ThumbSmall
          class="showmobile"
          alt="Template Project"
          filename="work/glo.svg"
          route="project"
          title="Fortune 100"
          details="This is a project description that would give a preview into the project..."
        />
        <ThumbLarge
          class="hidemobile"
          filename="work/glo.svg"
          route="project"
          title="Fortune 100"
          details="This is a project description that would give a preview into the project..."
        />
        
        <ThumbSmall
          class="showmobile"
          alt="Template Project"
          filename="work/dod.svg"
          title="DevopsDays Toronto"
        />
        <ThumbMedium
          class="hidemobile"
          alt="DevopsDays Toronto"
          filename="work/dod.svg"
          title="DevopsDays Toronto"
        />
       

        <ThumbSmall
          style="background-color: var(--bg-darker)"
          alt="Template Project"
          filename="templates/template-desktop-mobile.svg"
          title="Project Template"
        />
        <ThumbSmall
          alt="Brb Splash"
          details="This is a project description that would give a preview into the project..."
          filename="splash.svg"
          title="BRB Splash"
        />
        <ThumbSmall
          style="background-color: var(--color-lightyellow)"
          alt="Template Project"
          filename="templates/template-v2.svg"
          title="Small Template"
          details="This is a project description that would give a preview into the project..."
        />
        <ThumbSmall
          alt="Template Project"
          style="background-color: var(--link)"
          details="This is a project description that would give a preview into the project..."
          filename="templates/template-mobile-blank.svg"
          title="Small Template"
        />
      </div>
    </Container> -->

    <!-- <CardRow /> -->
  </PageWrapper>
</template>

<script>
import Container from "@/components/grid/Container.vue";
import projects from "@/assets/data/projects.json";
import info from "@/assets/data/info.json";

export default {
  name: "Work2",
  components: {
    Container,
  },
  props: {
    // header: {
    //   type: String,
    //   default: "Work",
    // },
  },
  data() {
    return {
      projects,
      info,
    };
  },
};
</script>

<style lang="sass" scoped>
#hero
  border-bottom: none !important
#work
  // padding-top: var(--spacing-sm) !important
.container
  // background-color: var(--color-white)
  padding-top: 0 !important
</style>

<style scoped>
input[type="radio"] {
  position: absolute;
  left: -9999px;
}

/* FILTERS
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.filters {
  text-align: right;
  margin-bottom: 2rem;
}

.filters * {
  display: inline-block;
}

.filters label {
  padding: 0.5rem 1rem;
  margin-bottom: 0.25rem;
  border-radius: 2rem;
  min-width: 50px;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s;
}

.filters label:hover {
  background: var(--green);
  color: var(--white);
}

/* FILTERED ELEMENTS (POSTS)
–––––––––––––––––––––––––––––––––––––––––––––––––– */

/* FILTERING RULES
–––––––––––––––––––––––––––––––––––––––––––––––––– */
[value="All"]:checked ~ .filters [for="All"],
[value="CSS"]:checked ~ .filters [for="CSS"],
[value="JavaScript"]:checked ~ .filters [for="JavaScript"],
[value="jQuery"]:checked ~ .filters [for="jQuery"],
[value="WordPress"]:checked ~ .filters [for="WordPress"],
[value="Slider"]:checked ~ .filters [for="Slider"],
[value="fullPage.js"]:checked ~ .filters [for="fullPage.js"] {
  background: var(--green);
  color: var(--white);
}

[value="All"]:checked ~ .posts [data-category] {
  display: block;
}

[value="CSS"]:checked ~ .posts .post:not([data-category~="CSS"]),
[value="JavaScript"]:checked ~ .posts .post:not([data-category~="JavaScript"]),
[value="jQuery"]:checked ~ .posts .post:not([data-category~="jQuery"]),
[value="WordPress"]:checked ~ .posts .post:not([data-category~="WordPress"]),
[value="Slider"]:checked ~ .posts .post:not([data-category~="Slider"]),
[value="fullPage.js"]:checked
  ~ .posts
  .post:not([data-category~="fullPage.js"]) {
  display: none;
}
</style>
