<template>
  <RouterLink :to="`/show/${id}`" class="slider-card">
    <div class="slider-card">
      <img
        v-if="image?.medium"
        :src="image?.medium"
        :alt="name"
        class="slider-card__image"
        loading="lazy"
      />
      <div class="slider-card__info">
        <span class="slider-card__title">{{ name }}</span>
        <span v-if="rating.average" class="slider-card__rating">{{ rating.average }}/10</span>
        <span v-else class="slider-card__rating">N/A</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: [Object, null],
    required: true,
    default: () => {},
  },
  rating: {
    type: Object,
    required: true,
    default: () => {},
  },
})
</script>

<style scoped lang="scss">
.slider-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  text-decoration: none;

  &:hover {
    transform: scale(1.03);
  }

  &__image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-bottom: 1px solid #eee;
  }

  &__placeholder {
    display: flex;
    width: 228px;
    height: 319px;
  }

  &__info {
    padding: 0.75rem 1rem;
    text-align: center;
  }

  &__title {
    display: block;
    font-weight: 600;
    font-size: 1rem;
    color: #333;
    min-height: 2.4rem;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__rating {
    margin-top: 0.25rem;
    display: block;
    font-size: 0.875rem;
    color: #888;
  }
}
</style>
