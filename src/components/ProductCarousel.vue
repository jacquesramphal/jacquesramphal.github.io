<template>
  <GridContainer class="product-carousel">
    <h2 v-if="title" class="carousel-title">{{ title }}</h2>
    
    <div class="carousel-container" ref="container">
      <div class="carousel-track" 
           :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div v-for="(product, index) in products" 
             :key="index" 
             class="carousel-slide">
          <div class="product-card">
            <div class="product-image">
              <img :src="product.image" :alt="product.name">
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-meta">
                <span class="product-category">{{ product.category }}</span>
                <span class="product-price">{{ product.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button class="carousel-button prev" 
              @click="prevSlide" 
              :disabled="currentSlide === 0">
        ←
      </button>
      <div class="carousel-dots">
        <button v-for="(_, index) in products" 
                :key="index"
                class="dot"
                :class="{ active: currentSlide === index }"
                @click="goToSlide(index)">
        </button>
      </div>
      <button class="carousel-button next" 
              @click="nextSlide" 
              :disabled="currentSlide === products.length - 1">
        →
      </button>
    </div>
  </GridContainer>
</template>

<script>
import GridContainer from './grid/GridContainer.vue'

export default {
  name: 'ProductCarousel',
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: () => [
        {
          name: 'Modern Desk Lamp',
          description: 'Sleek LED desk lamp with adjustable brightness',
          image: 'https://source.unsplash.com/400x300/?lamp',
          category: 'Lighting',
          price: '$89.99'
        },
        {
          name: 'Ergonomic Chair',
          description: 'Premium office chair with lumbar support',
          image: 'https://source.unsplash.com/400x300/?chair',
          category: 'Furniture',
          price: '$299.99'
        },
        {
          name: 'Wireless Keyboard',
          description: 'Mechanical keyboard with customizable RGB',
          image: 'https://source.unsplash.com/400x300/?keyboard',
          category: 'Electronics',
          price: '$129.99'
        },
        {
          name: 'Smart Monitor',
          description: '27" 4K display with built-in speakers',
          image: 'https://source.unsplash.com/400x300/?monitor',
          category: 'Electronics',
          price: '$449.99'
        }
      ]
    }
  },
  data() {
    return {
      currentSlide: 0
    }
  },
  methods: {
    nextSlide() {
      if (this.currentSlide < this.products.length - 1) {
        this.currentSlide++
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },
    goToSlide(index) {
      this.currentSlide = index
    }
  },
  components: { GridContainer }
}
</script>

<style lang="scss" scoped>
.product-carousel {
  width: 100%;
  margin: 0 auto;
  padding: var(--spacing-md);
}

.carousel-title {
  margin-bottom: var(--spacing-md);
}

.carousel-container {
  position: relative;
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  flex: 0 0 100%;
  padding: 0 var(--spacing-sm);
}

.product-card {
  background: var(--background-darker);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
  }
}

.product-image {
  width: 100%;
  height: 300px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.product-info {
  padding: var(--spacing-md);

  h3 {
    margin: 0 0 var(--spacing-xs);
    font-size: var(--font-lg);
    color: var(--text);
  }
}

.product-description {
  color: var(--text-muted);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-sm);
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-sm);
}

.product-category {
  font-size: var(--font-xs);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-price {
  font-size: var(--font-md);
  font-weight: var(--fontWeight-bold);
  color: var(--text);
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
}

.carousel-button {
  background: var(--background-darker);
  border: none;
  color: var(--text);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: var(--background-darkest);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.carousel-dots {
  display: flex;
  gap: var(--spacing-xs);

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--background-darker);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: var(--text);
      transform: scale(1.2);
    }

    &:hover:not(.active) {
      background: var(--background-darkest);
    }
  }
}

@media (min-width: 768px) {
  .carousel-slide {
    flex: 0 0 50%;
  }
}

@media (min-width: 1024px) {
  .carousel-slide {
    flex: 0 0 33.333%;
  }
}
</style> 