<template>
  <div class="filters-group">
    <ActionSearchInput
      @update:modelValue="term = $event"
      @on-search="handleSearchAction"
      @on-clear-search="handleClearSearch"
    />
    <div class="filters-group__rating--wrapper">
      <SelectDropDown
        :options="ratingOptionsRef"
        v-model="rating"
        :loading="isLoading"
        showClear
        placeholder="Rating"
        optionLabel="label"
        aria-label="rating_filter"
      />

      <SelectDropDown
        :options="genreOptionsRef"
        v-model="genre"
        :loading="isLoading"
        showClear
        placeholder="Genre"
        optionLabel="label"
        aria-label="genre_filter"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ActionSearchInput from '@/components/Shared/ActionSearchInput/ActionSearchInput.vue'

import { useDropDownFilters } from '@/composables/App/useDropDownFilters'

const props = defineProps({
  genreList: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['onSearch', 'onClearSearch'])

const filterCriteria = defineModel({
  default: () => ({
    term: '',
    rating: {},
    genre: {},
  }),
})

const term = computed({
  get: () => filterCriteria.value.term,
  set: (val) =>
    (filterCriteria.value = {
      ...filterCriteria.value,
      term: val,
    }),
})

const rating = computed({
  get: () => filterCriteria.value.rating,
  set: (val) => {
    filterCriteria.value = {
      ...filterCriteria.value,
      rating: val,
    }
  },
})

const genre = computed({
  get: () => filterCriteria.value.genre,
  set: (val) => {
    filterCriteria.value = {
      ...filterCriteria.value,
      genre: val,
    }
  },
})

const { ratingOptionsRef, genreOptionsRef } = useDropDownFilters(props)

const handleSearchAction = () => {
  emit('onSearch')
}

const handleClearSearch = () => {
  emit('onClearSearch')
}
</script>

<style scoped lang="scss">
.filters-group {
  &__rating--wrapper {
    margin-top: 4px;
    display: flex;
    gap: 10px;
  }
}
</style>
