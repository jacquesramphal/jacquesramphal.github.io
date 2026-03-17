<template>

  <PageWrapper>
    <!-- <HeroBanner background center fullvh eyebrow="" title="Oops! Page not be found." route="/" label="Back to home" /> -->
    <GridContainer fullvh fullvw>
      <TextImage
      eyebrow="404"
        filename="jacques.jpg"
        title="Page Not Found"
        description="I’m not saying it’s not a page, it’s just not this page. Let’s go back to the home page."
        label="Back to Home"
        route="/"
    /></GridContainer>
  </PageWrapper>
</template>

<script>
export default {
    name: "NotFound",
};
</script>

<style scoped></style>
