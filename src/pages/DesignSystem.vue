<template>
  <GridContainer class="library" :style="gridStyle">
    <!-- Left Side -->
    <aside class="sidebar animate glow" v-if="showSidebar">
      <ul style="block-size: 100%">
        <li>
          <p><a href="#Typography">Typography</a></p>
        </li>
        <li>
          <p><a href="#Colour Palette">Colour Palette</a></p>
        </li>
        <li>
          <p><a href="#Backgrounds">Backgrounds</a></p>
        </li>
      </ul>
    </aside>

    <!-- Right Side -->
    <!-- <library-segments
      class="segments fadeInUp"
      :segments="segments"
      :settings="settings.segments"
    /> -->
    <main class="segments">
      <MyButton label="Toggle Nav" @click="showSidebar = !showSidebar">
        {{ showSidebar ? "Hide" : "Show" }} Sidebar
      </MyButton>

      <!-- Typography -->
      <DynamicText
        id="Typography"
        as="h4"
        text="Typography"
        style="margin-block-start: var(--spacing-lg); margin-block-end: var(--spacing-sm)"
      />
      <DynamicText
        as="h1"
        text="Display H1"
        style="font-size: var(--font-display)"
      />
      <DynamicText as="h1" text="H1" />
      <DynamicText as="h2" text="H2" />
      <DynamicText as="h3" text="H3" />
      <DynamicText as="h4" text="H4" />
      <DynamicText as="h5" text="H5" />
      <DynamicText as="h6" text="H6" />
      <DynamicText as="p" text="Paragraph" />

      <!-- Colour Palette -->
      <DynamicText
        id="Colour Palette"
        as="h4"
        text="Colour Palette"
        style="margin-block-start: var(--spacing-lg); margin-block-end: var(--spacing-sm)"
      />
      <DynamicText id="Core" as="h5" text="Core" />
      <div
        v-for="(color, index) in colors"
        :key="index"
        class="color-swatch"
        :style="{ backgroundColor: color.value, color: textColor }"
      >
        {{ color.name }}: {{ color.value }}
      </div>

      <!-- Backgrounds -->
      <DynamicText
        id="Backgrounds"
        as="h4"
        text="Backgrounds"
        style="margin-block-start: var(--spacing-lg); margin-block-end: var(--spacing-sm)"
      />
      <div
        v-for="(background, index) in backgrounds"
        :key="index"
        class="color-swatch"
        :style="{ backgroundColor: background.value, color: textColor }"
      >
        {{ background.name }}: {{ background.value }}
      </div>

      <!-- Sizes Section -->
      <DynamicText
        id="Size"
        as="h4"
        text="Size"
        style="margin-block-start: var(--spacing-lg); margin-block-end: var(--spacing-sm)"
      />
      <div v-for="(sizes, index) in sizes" :key="index" class="size-swatch">
        {{ sizes.name }}: {{ sizes.value }}
        <div
          class="size-example"
          :style="{
            width: sizes.value,
            height: 'var(--size-4)',
            backgroundColor: 'var(--text)',
          }"
        />
      </div>
      <!-- Spacing Section -->
      <DynamicText
        id="Spacing"
        as="h4"
        text="Spacing"
        style="margin-block-start: var(--spacing-lg); margin-block-end: var(--spacing-sm)"
      />
      <div v-for="(spacing, index) in spacing" :key="index" class="size-swatch">
        {{ spacing.name }}: {{ spacing.value }}
        <div
          class="size-example"
          :style="{
            width: spacing.value,
            height: 'var(--size-4)',
            backgroundColor: 'var(--text)',
          }"
        />
      </div>
            <!-- Components Section -->
            <DynamicText
        id="Components"
        as="h3"
        text="Components"
        style="margin-block-start: var(--spacing-lg); margin-block-end: var(--spacing-sm)"
      />
      <DynamicText
        as="h4"
        text="Button"
      />
      <DynamicText
        as="h5"
        text="Types"
      />
      <MyButton label="Primary Button" />
      <MyButton type="outline" label="Secondary Button" />
      <DynamicText
        as="h5"
        text="Sizes"
      />
      <MyButton size="large" label="Large Button" />
      <MyButton size="small" label="Small Button" />
      <DynamicText
        as="h4"
        text="Banners"
      />
      <HeroBanner/>
      <HeroBanner overlap filename="about.jpg"/>
      <HeroBanner background filename="about.jpg"/>
      <!-- Add more divs here for each new variable -->
    </main>
  </GridContainer>
</template>

<script>
// import LibrarySegments from "@/components/library/LibrarySegments.vue";
// Mock data
import segments from "@/components/library/data/segments.json";
import settings from "@/components/library/data/settings.json";

export default {
  name: "DesignSystem",
  // components: {LibrarySegments},
  data() {
    return {
      segments,
      settings,
      typographySpacing: "",
      paletteSpacing: "",
      colorPink: "",
      linkColor: "",
      textColor: "",
      background: "", // Add new data properties for each variable

      // Add new data properties for each category
      colors: [],
      backgrounds: [],
      sizes: [],
      showSidebar: true,
      windowWidth: window.innerWidth,
    };
  },
  props: {},
  mounted() {
    const style = getComputedStyle(document.documentElement);
    this.colors = [
      { name: "Pink", value: style.getPropertyValue("--color-pink") },
      { name: "Text", value: style.getPropertyValue("--text") },
      { name: "Text Muted", value: style.getPropertyValue("--text-muted") },
      {
        name: "Text Reversed",
        value: style.getPropertyValue("--text-reversed"),
      },
      {
        name: "Link Reversed",
        value: style.getPropertyValue("--link-reversed"),
      },

      // ... add more colors here ...
    ];
    this.backgrounds = [
      { name: "Background", value: style.getPropertyValue("--background") },
      {
        name: "Background Darker",
        value: style.getPropertyValue("--background-darker"),
      },
      {
        name: "Background Reversed",
        value: style.getPropertyValue("--background-reversed"),
      },
      {
        name: "Background Darker Reversed",
        value: style.getPropertyValue("--background-darker-reversed"),
      },
      // ... add more backgrounds here ...
    ];
    this.sizes = [
      { name: "--size-0", value: style.getPropertyValue("--size-0") },
      { name: "--size-1", value: style.getPropertyValue("--size-1") },
      { name: "--size-2", value: style.getPropertyValue("--size-2") },
      { name: "--size-3", value: style.getPropertyValue("--size-3") },
      { name: "--size-4", value: style.getPropertyValue("--size-4") },
      { name: "--size-5", value: style.getPropertyValue("--size-5") },
      { name: "--size-6", value: style.getPropertyValue("--size-6") },
      { name: "--size-7", value: style.getPropertyValue("--size-7") },
      { name: "--size-8", value: style.getPropertyValue("--size-8") },
      { name: "--size-9", value: style.getPropertyValue("--size-9") },
      { name: "--size-10", value: style.getPropertyValue("--size-10") },
      { name: "--size-11", value: style.getPropertyValue("--size-11") },
      { name: "--size-12", value: style.getPropertyValue("--size-12") },
      { name: "--size-13", value: style.getPropertyValue("--size-13") },
      { name: "--size-14", value: style.getPropertyValue("--size-14") },
      { name: "--size-15", value: style.getPropertyValue("--size-15") },
      { name: "--size-16", value: style.getPropertyValue("--size-16") },
      { name: "--size-17", value: style.getPropertyValue("--size-17") },
      { name: "--size-18", value: style.getPropertyValue("--size-18") },
      { name: "--size-19", value: style.getPropertyValue("--size-19") },
      { name: "--size-20", value: style.getPropertyValue("--size-20") },
      { name: "--size-21", value: style.getPropertyValue("--size-21") },
      { name: "--size-22", value: style.getPropertyValue("--size-22") },
      { name: "--size-23", value: style.getPropertyValue("--size-23") },
      { name: "--size-24", value: style.getPropertyValue("--size-24") },
      { name: "--size-25", value: style.getPropertyValue("--size-25") },
      { name: "--size-26", value: style.getPropertyValue("--size-26") },
      { name: "--size-27", value: style.getPropertyValue("--size-27") },
      { name: "--size-28", value: style.getPropertyValue("--size-28") },
      { name: "--size-29", value: style.getPropertyValue("--size-29") },
      { name: "--size-30", value: style.getPropertyValue("--size-30") },
      { name: "--size-31", value: style.getPropertyValue("--size-31") },
      { name: "--size-32", value: style.getPropertyValue("--size-32") },
      { name: "--size-33", value: style.getPropertyValue("--size-33") },
      { name: "--size-34", value: style.getPropertyValue("--size-34") },
      { name: "--size-35", value: style.getPropertyValue("--size-35") },
      { name: "--size-36", value: style.getPropertyValue("--size-36") },

      // ... add more sizes here ...
    ];
    this.spacing = [
      {
        name: "--spacing-xxxs",
        value: style.getPropertyValue("--spacing-xxxs"),
      },
      { name: "--spacing-xxs", value: style.getPropertyValue("--spacing-xxs") },
      { name: "--spacing-xs", value: style.getPropertyValue("--spacing-xs") },
      { name: "--spacing-sm", value: style.getPropertyValue("--spacing-sm") },
      { name: "--spacing-md", value: style.getPropertyValue("--spacing-md") },
      { name: "--spacing-lg", value: style.getPropertyValue("--spacing-lg") },
      { name: "--spacing-xl", value: style.getPropertyValue("--spacing-xl") },
      { name: "--spacing-xxl", value: style.getPropertyValue("--spacing-xxl") },
      {
        name: "--spacing-xxxl",
        value: style.getPropertyValue("--spacing-xxxl"),
      },

      // ... add more sizes here ...
    ];
  },
  computed: {
    gridStyle() {
      // If the window width is greater than or equal to 768 pixels (desktop view)

      if (this.windowWidth >= 768) {
        return {
          // If the sidebar is shown, set the grid areas to 'sidebar' and 'segments'
          // Otherwise, set the grid area to 'segments' only

          gridTemplateAreas: this.showSidebar
            ? '"sidebar segments"'
            : '"segments"',
          // If the sidebar is shown, set the grid columns to 30% for the sidebar and the rest for the segments
          // Otherwise, set the grid column to take up the full width

          gridTemplateColumns: this.showSidebar ? "15% 1fr" : "1fr",
        };
      } else {
        // If the window width is less than 768 pixels (mobile view)
        return {
          // If the sidebar is shown, set the grid areas to 'sidebar' and 'segments' (stacked on top of each other)
          // Otherwise, set the grid area to 'segments' only

          gridTemplateAreas: this.showSidebar
            ? '"sidebar" "segments"'
            : '"segments"',
          // Set the grid column to take up the full width

          gridTemplateColumns: "1fr",
        };
      }
    },
  },

  // When the component is created, add a 'resize' event listener that updates the window width

  created() {
    window.addEventListener("resize", this.updateWindowWidth);
  },
  // When the component is destroyed, remove the 'resize' event listener

  destroyed() {
    window.removeEventListener("resize", this.updateWindowWidth);
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
  //   mounted() {
  //   const style = getComputedStyle(document.documentElement);
  //   const cssVars = Array.from(style).filter(key => key.startsWith('--'));
  //   this.colors = cssVars.map(varName => ({
  //     name: varName,
  //     value: style.getPropertyValue(varName).trim(),
  //   }));
  // },
};
</script>

<style scoped lang="scss">
.library {
  display: grid;
  grid-gap: var(--spacing-lg);
  color: var(--text);
  font-size: var(--font-2xs);
  // grid-template-areas: "sidebar" "segments";
  // grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto;
  min-block-size: auto;

  @media only screen and (min-width: 768px) {
    // grid-template-areas: "sidebar segments";
    // grid-template-columns: 30% 1fr;
    grid-template-rows: auto 1fr auto;
    padding-block-start: var(--spacing-xl) !important;
  }

  // ALIGNMENT
  .library-image {
    margin-block-end: var(--spacing-xs);
    img {
      inline-size: 100%;
      max-width: 100%;
      border-radius: 0.8rem;
      aspect-ratio: 16 / 9 !important;

      @media print {
        aspect-ratio: 1 / 1 !important;
        inline-size: 6.4rem;
      }

      @media only screen and (min-width: 768px) {
        aspect-ratio: 1 / 1 !important;
        inline-size: 12rem;
      }
    }
  }
  .header {
    grid-area: header;
  }
  .library-header {
    margin-block-end: var(--spacing-md);
  }
  .segments {
    grid-area: segments;
    // background-color: pink;
  }
  .sidebar {
    grid-area: sidebar;
    overflow-x: hidden;
    position: relative;
    inline-size: auto;
    justify-content: start;
    flex-direction: column;
    display: flex;
    // background-color: pink;
    flex: 1;

    @media only screen and (min-width: 768px) {
      // inline-size: 25vw;
      padding-block-start: var(--spacing-xl);
      inset-block-start: 0;
      inset-block-end: 0;
      position: fixed;
      // background-color: red;
      padding-block-end: var(--spacing-md) !important;
    }

    /* override styles when printing */
  }
  .footer {
    grid-area: footer;
  }
}

// Print styles
@media print {
  .library {
    display: flex;
    background-color: red !important;
  }

  .sidebar {
    flex: 0 0 25vw;
    max-width: 25vw;
  }

  .segments {
    flex: 1;
  }
}
.color-swatch {
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
}
.size-swatch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  .size-example {
    inline-size: 50px;
    block-size: 50px;
    border-radius: 5px;
  }
}
</style>
