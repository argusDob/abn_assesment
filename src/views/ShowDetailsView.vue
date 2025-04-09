<template>
  <RouterLink :to="`/`"> All Shows </RouterLink>
  <div v-if="!isLoading" class="show-details-view">
    <div class="show-details-view__image">
      <img :src="selectedShow.image.medium" :alt="selectedShow.name" />
    </div>
    <div class="show-details-view__summary" v-html="selectedShow.summary"></div>
    <div class="show-details-view__card">
      <ShowInfoCard v-bind="selectedShow" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'

import ShowInfoCard from '@/components/ShowIfoCard/ShowInfoCard.vue'

import ShowService from '@/services/ShowsService'
import { useRoute } from 'vue-router'

const showService = new ShowService()
const route = useRoute()

const isLoading = ref(true)

const selectedShow = computed(() => showService.getShow())

onMounted(async () => {
  const id = route.params.id
  try {
    await showService.requestShow(id)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
<style scoped lang="scss">
.show-details-view {
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;

    &__image {
      img {
        width: 100%;
        height: auto;
      }
    }
    ::v-deep(.show-card) {
      width: 100%;
    }
  }
}
</style>
