<template>
  <div class="construction-bar" role="status" aria-live="polite">
    <GridContainer class="construction-bar__inner">
      <span class="construction-bar__message">
        Perpetually beta. Shipping myself since Jan 4, 1991.
      </span>
      <span class="construction-bar__counter" aria-label="Time elapsed since January 4, 1991">
        {{ elapsed.years }} yr · {{ elapsed.days }} days · {{ elapsed.seconds }} sec
      </span>
    </GridContainer>
  </div>
</template>

<script>
import GridContainer from './grid/GridContainer.vue';

export default {
  name: 'UnderConstructionBar',
  components: { GridContainer },
  data() {
    return {
      now: new Date(),
      ticker: null,
    };
  },
  computed: {
    elapsed() {
      const start = new Date(1991, 0, 4);
      const now = this.now;

      let years = now.getFullYear() - start.getFullYear();
      const pastAnniversary = now.getMonth() > 0 || (now.getMonth() === 0 && now.getDate() >= 4);
      if (!pastAnniversary) years--;

      const lastAnniversary = new Date(now.getFullYear() - (pastAnniversary ? 0 : 1), 0, 4);
      const msPerDay = 1000 * 60 * 60 * 24;
      const days = Math.floor((now - lastAnniversary) / msPerDay);

      const seconds = now.getSeconds();

      return { years, days, seconds };
    },
  },
  mounted() {
    this.ticker = setInterval(() => {
      this.now = new Date();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.ticker);
  },
};
</script>

<style lang="scss" scoped>
.construction-bar {
  width: 100%;
  background-color: #fcb23b; /* --color-yellow, hardcoded - not theme-responsive */
  color: #1d1b22; /* --color-offblack, hardcoded - not theme-responsive */
  font-size: var(--font-400);
  font-weight: var(--fontWeight-medium);
}

.construction-bar__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-xxs) var(--spacing-xs);
  padding-block: var(--spacing-xs) !important;
}

.construction-bar__message {
  opacity: 0.8;
  flex-shrink: 1;
  min-width: 0;
}

.construction-bar__counter {
  font-size: inherit;
  font-weight: var(--fontWeight-bold);
  line-height: inherit;
  color: inherit;
  font-variant-numeric: tabular-nums;
}
</style>
