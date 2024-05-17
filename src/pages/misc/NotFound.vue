<template>

  <PageWrapper>
    <!-- <HeroBanner background center fullvh eyebrow="" title="Oops! Page not be found." route="/" label="Back to home" /> -->
    <GridContainer fullvh fullvw>
      <TextImage
        filename="romy.jpeg"
        title="404 - Page Not Found"
        description="The page you are looking for does not exist. Please check the URL or go back to the homepage."
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
