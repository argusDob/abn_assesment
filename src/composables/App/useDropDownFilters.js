import { ref, toRef, watch } from 'vue'

import { RATING_OPTIONS } from '../../utils/constants'
export function useDropDownFilters(props) {
  const ratingOptionsRef = ref(RATING_OPTIONS)
  const genreOptionsRef = ref([])
  const genreListRef = toRef(props, 'genreList')

  watch(genreListRef, (newVal) => {
    if (Array.isArray(newVal) && newVal.length > 0) {
      genreOptionsRef.value = newVal.map((genre) => ({
        value: genre,
        label: genre,
      }))
    }
  })

  return { ratingOptionsRef, genreOptionsRef }
}
