<template>

  <PageWrapper>
    <!-- <HeroBanner background center fullvh eyebrow="" title="Oops! Page not be found." route="/" label="Back to home" /> -->
    <GridContainer fullvh fullvw>
      <SplitImage
        filename="luna.jpg"
        header="Oops! The page you are looking for could not be found."
        details=" "
        cta="Back to Home"
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
