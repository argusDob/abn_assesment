<template>
  <Swiper
    ref="swiperRef"
    slides-per-view="auto"
    :modules="modules"
    :space-between="50"
    :navigation="true"
    :lazy="true"
    :slides-per-group="4"
    :mousewheel="true"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
  >
    <SwiperSlide v-for="movie in showsList" :key="movie.id">
      <SliderCard v-bind="movie" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, A11y } from 'swiper/modules'

import SliderCard from '@/components/SliderCard/SliderCard.vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/scss'

defineProps({
  showsList: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const swiperRef = ref(null)
const modules = [Navigation, A11y]

const emit = defineEmits(['onSwiperChange'])

const onSwiper = (swiper) => {
  if (swiper) {
    swiperRef.value = swiper
  } else {
    throw new Error('Swiper cannot init.')
  }
}

const onSlideChange = (swiper) => {
  emit('onSwiperChange', swiper)
}

onUnmounted(() => {
  if (swiperRef.value) {
    swiperRef.value.destroy() // Destroy Swiper instance
  }
})
</script>

<style scoped lang="scss">
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;

  &-slide {
    width: 20% !important;
  }
}
</style>
