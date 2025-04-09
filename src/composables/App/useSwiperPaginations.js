import { ref, computed, toRef, watch, nextTick, unref, onMounted } from 'vue'
import ShowsService from '@/services/ShowsService'

export function useSwiperPagination(allShows, currentPage, searchCriteria) {
  const swiperList = ref([])
  const swiperChuncks = ref(10)
  const allShowRef = computed(() => unref(allShows.value))
  const searchTermRef = toRef(searchCriteria, 'term')
  const loadedOnce = ref(false)

  const showsService = new ShowsService()

  const resetSwiper = (newList) => {
    swiperChuncks.value = 10
    swiperList.value = newList.slice(0, swiperChuncks.value)
  }

  watch([allShowRef, searchTermRef], ([newVal, search]) => {
    const hasSearch = !!search?.length
    const genreChanged = search.genre !== undefined
    const shouldReset = !loadedOnce.value || hasSearch || genreChanged

    if (shouldReset) {
      swiperChuncks.value = 10

      if (Array.isArray(newVal) && newVal.length > 0) {
        swiperList.value = newVal.slice(0, swiperChuncks.value)
      } else {
        swiperList.value = []
      }

      loadedOnce.value = true
    }
  })

  const canRequestNewPage = computed(() => {
    const criteria = unref(searchCriteria)
    return criteria.term !== '' || criteria.genre !== null || criteria.rating !== null
  })

  const handleSwiperChange = async (swiper) => {
    const allShowsSize = allShowRef.value.length
    const swiperListSize = swiperList.value.length

    if (swiper.isEnd) {
      if (swiperListSize >= allShowsSize && currentPage && !canRequestNewPage.value) {
        currentPage.value += 1
        await showsService.getShowsRequest(currentPage.value)
      }

      const oldChunk = swiperChuncks.value
      swiperChuncks.value += 10
      const newSlides = allShowRef.value.slice(oldChunk, swiperChuncks.value)
      swiperList.value.push(...newSlides)

      await nextTick()
      swiper.slideNext()
    }
  }

  return {
    handleSwiperChange,
    swiperList,
  }
}
