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
      <input type="radio" id="Tag1" name="categories" value="Tag1" />
      <input
        type="radio"
        id="Tag2"
        name="categories"
        value="Tag2"
      />
      <input type="radio" id="Tag3" name="categories" value="Tag3" />
      <input type="radio" id="Tag4" name="categories" value="Tag4" />
      <input type="radio" id="Tag5" name="categories" value="Tag5" />
      <input
        type="radio"
        id="Tag6"
        name="categories"
        value="Tag6"
      />

      <ol class="filters">
        <li>
          <label for="All">All</label>
        </li>
        <li>
          <label for="Tag1">Tag1</label>
        </li>
        <li>
          <label for="Tag2">Tag2</label>
        </li>
        <li>
          <label for="Tag3">Tag3</label>
        </li>
        <li>
          <label for="Tag4">Tag4</label>
        </li>
        <li>
          <label for="Tag5">Tag5</label>
        </li>
        <li>
          <label for="Tag6">Tag6</label>
        </li>
      </ol>
      <div id="recentwork" class="posts grid-parent">
        <ThumbSmall
          v-for="(entry, i) in projects.entries"
          :key="i"
          class="post"
          :eyebrow="entry.tag"
          :title="entry.title"
          :details="entry.description"
          :cta="entry.cta"
          :route="entry.route"
          :btnroute="entry.btnroute"
          :link="entry.link"
          :filename="entry.filename"
          :style="entry.bgcolor"
        />
      </div>
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
[value="Tag1"]:checked ~ .filters [for="Tag1"],
[value="Tag2"]:checked ~ .filters [for="Tag2"],
[value="Tag3"]:checked ~ .filters [for="Tag3"],
[value="Tag4"]:checked ~ .filters [for="Tag4"],
[value="Tag5"]:checked ~ .filters [for="Tag5"],
[value="Tag6"]:checked ~ .filters [for="Tag6"] {
  background: var(--green);
  color: var(--white);
}

[value="All"]:checked ~ .posts [data-category] {
  display: block;
}

[value="Tag1"]:checked ~ .posts .post:not([data-category~="Tag1"]),
[value="Tag2"]:checked ~ .posts .post:not([data-category~="Tag2"]),
[value="Tag3"]:checked ~ .posts .post:not([data-category~="Tag3"]),
[value="Tag4"]:checked ~ .posts .post:not([data-category~="Tag4"]),
[value="Tag5"]:checked ~ .posts .post:not([data-category~="Tag5"]),
[value="Tag6"]:checked
  ~ .posts
  .post:not([data-category~="Tag6"]) {
  display: none;
}
</style>
