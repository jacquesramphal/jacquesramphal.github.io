<template>
  <div class="resume-footer">
    <ul class="resume-footer-links">
      <li
        class="resume-footer-link"
        v-for="(link, i) in information.links"
        :key="i"
      >
        <TextLink
          icon="j-logo"
          iconsize="16"
          :link="link.url"
          :label="link.title"
        />

        <!-- <a
            :href="link.url"
            v-text="link.title"
        /> -->
      </li>
    </ul>
  </div>
</template>

<script>
import TextLink from "../text/TextLink.vue";
export default {
  name: "ResumeFooter",
  props: {
    information: {
      type: Object,
      required: true,
      // TODO: add validation
    },
  },
  components: { TextLink },
};
</script>

<style scoped lang="sass">
.resume-footer
  position: relative
  margin-block-start: var(--spacing-sm)
  >.resume-footer-links
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    justify-content: left
    align-content: left
    align-items: left
    inline-size: auto
    grid-gap: var(--spacing-xs)
    @media screen and (max-width: 240mm)
      flex-direction: column
    .resume-footer-link
      margin: 0 .5rem 0 0
      @media screen and (max-width: 240mm)
        margin: 0 0 .5rem 0
      // &::after
      //   content: '•'
      //   margin: 0 0 0 .5rem
        @media screen and (max-width: 240mm)
          content: ''
      &:last-of-type
        margin: 0
        &::after
          content: ''
          margin: 0
      a
        color: var(--color-font-on-primary)
        transition: var(--transition)
        text-decoration: none
        border-block-end: 1px transparent solid
        &:hover
          border-block-end-color: var(--color-font-on-primary)
  >.resume-footer-logo
    position: absolute
    inset-inline-end:  1.5rem
    inset-block-start:  -1.5rem
    inline-size: 3rem
    block-size: 3rem
    box-shadow: var(--box-shadow)
    border-radius: 50%
</style>
