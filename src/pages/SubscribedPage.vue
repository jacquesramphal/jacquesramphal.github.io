<template>
  <PageWrapper>
    <GridContainer class="subscribed" fullvh>
      <div class="subscribed__inner">
        <TextBlock
          center
          as="h1"
          title="You're on the list."
          description="Thanks for subscribing. New essays land on the site first, then arrive in your inbox as I publish them."
        />
        <div class="subscribed__actions">
          <MyButton label="Read the writing" primary size="large" route="/writing" />
          <MyButton label="Back home" type="ghost" size="large" route="/" />
        </div>
      </div>
    </GridContainer>
  </PageWrapper>
</template>

<script>
export default {
  name: "SubscribedPage",
};
</script>

<style scoped>
.subscribed {
  align-items: center;
}

.subscribed__inner {
  width: 100%;
  max-width: 40rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subscribed__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-block-start: var(--spacing-lg);
}
</style>
