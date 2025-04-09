<template>
  <div class="action-search-input">
    <div class="action-search-input--wrapper">
      <label for="search">Search:</label>
      <InputText id="search" v-model="localTerm" aria-describedby="movie-search" />
      <InlineMessage v-if="!isFormValid" severity="error" variant="simple" size="small"
        >A value is required</InlineMessage
      >
    </div>
    <div class="action-search-input__clear-button">
      <ActionButton
        @click="clearSearch"
        icon=" pi pi-filter-slash"
        severity="success"
        aria-label="clear_search"
        size="small"
      />
    </div>
    <div class="action-search-input__search-button">
      <ActionButton
        @click="doSearch"
        icon="pi pi-search"
        label="Search"
        severity="success"
        aria-label="search"
        size="small"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const term = defineModel()
const isFormValid = ref(true)
const localTerm = ref(term.value)

const emit = defineEmits(['onSearch', 'onClearSearch'])

watch(localTerm, (newVal) => {
  emitDebouncedUpdate(newVal)
})

const doSearch = () => {
  isFormValid.value = validateForm()
  if (!isFormValid.value) return
  emit('onSearch')
}

function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

const emitDebouncedUpdate = debounce((val) => {
  emit('update:modelValue', val)
}, 100)

const clearSearch = () => {
  localTerm.value = ''
  emit('onClearSearch')
}

const validateForm = () => {
  return localTerm.value?.length > 0
}
</script>

<style scoped lang="scss">
.action-search-input {
  display: flex;
  &--wrapper {
    display: flex;
    flex-direction: column;
  }

  button {
    height: 35px;
    margin-top: 20px;
  }

  &__search-button {
    margin-left: 12px;
  }
}
</style>
