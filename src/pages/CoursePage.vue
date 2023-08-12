<template>
  <PageWrapper>
    <HeroBanner
    :title="chapters.title"
    :subtitle="chapters.subtitle"
      eyebrow=""
      style="background-color: var(--background-darker);"

    />
    <GridContainer>
      <CourseCard
        v-for="entry in chapters.entries"
        :key="entry.id"
        :id="entry.id"
        :tag="entry.tag"
        :title="entry.title"
        :description="entry.description"
        :route="entry.route"
        :read="readStatus[entry.id]"
        @markAsRead="markAsRead(entry.id)"
      />
    </GridContainer>
  </PageWrapper>
</template>

<script>
import chapters from "@/assets/data/chapters.json";

export default {
  name: "MyCourse",
  data() {
    return {
      chapters,
      readStatus: {},
    };
  },
  mounted() {
    this.readStatus = JSON.parse(localStorage.getItem("readStatus")) || {};
  },
  methods: {
    markAsRead(entryId) {
      // Update the read status in the local storage
      localStorage.setItem(`readStatus_${entryId}`, "true");
      // Update the readStatus object
      this.$set(this.readStatus, entryId, true);
    },
    isRead(entryId) {
      // Check if the entry is marked as read in the local storage
      return localStorage.getItem(`readStatus_${entryId}`) === "true";
    },
  },
};
</script>

<style scoped lang="scss"></style>
