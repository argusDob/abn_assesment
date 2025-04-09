import { ref, nextTick } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSwiperPagination } from '@/composables/App/useSwiperPaginations'
import ShowsService from '@/services/ShowsService'

export const getShowsRequestMock = vi.fn(async (page) => {
  return Array.from({ length: 10 }, (_, i) => ({ id: page * 10 + i }))
})

vi.mock('@/services/ShowsService', () => {
  return {
    default: class ShowsService {
      getShowsRequest = getShowsRequestMock
    },
  }
})

describe('useSwiperPagination - handleSwiperChange', () => {
  let allShows
  let currentPage
  let searchCriteria
  let swiper
  let showsService

  beforeEach(() => {
    allShows = ref(Array.from({ length: 20 }, (_, i) => ({ id: i })))
    currentPage = ref(0)
    searchCriteria = ref({ term: '', genre: null, rating: null })

    swiper = {
      isEnd: true,
      activeIndex: 9,
      slides: Array(10),
      slideNext: vi.fn(),
    }

    // Re-import to get access to mocked instance
    showsService = new ShowsService()
  })

  it('should update swiperList and not call getShowsRequest when more items are available locally', async () => {
    const { swiperList, handleSwiperChange } = useSwiperPagination(
      allShows,
      currentPage,
      searchCriteria,
    )

    swiperList.value = allShows.value.slice(0, 10)

    await nextTick()

    expect(swiperList.value.length).toBe(10)

    await handleSwiperChange(swiper)

    expect(swiperList.value.length).toBe(20)
    expect(swiperList.value[19].id).toBe(19)

    expect(showsService.getShowsRequest).not.toHaveBeenCalled()
    expect(swiper.slideNext).toHaveBeenCalled()
  })

  it('should not paginate when swiper is not at the end', async () => {
    swiper.isEnd = false

    const { swiperList, handleSwiperChange } = useSwiperPagination(
      allShows,
      currentPage,
      searchCriteria,
    )

    swiperList.value = allShows.value.slice(0, 10)
    await nextTick()

    await handleSwiperChange(swiper)

    expect(swiperList.value.length).toBe(10)

    expect(showsService.getShowsRequest).not.toHaveBeenCalled()

    expect(swiper.slideNext).not.toHaveBeenCalled()
  })

  it('should call getShowsRequest when local data is exhausted and no search is active', async () => {
    const { swiperList, handleSwiperChange } = useSwiperPagination(
      allShows,
      currentPage,
      searchCriteria,
    )

    swiperList.value = [...allShows.value]
    await nextTick()

    currentPage.value = 1

    await handleSwiperChange(swiper)
    await nextTick()

    expect(getShowsRequestMock).toHaveBeenCalledWith(2)
    expect(swiper.slideNext).toHaveBeenCalled()
  })

  it('should not call getShowsRequest but still paginate when search is active', async () => {
    const reactiveSearch = ref({
      term: 'batman',
      genre: null,
      rating: null,
    })

    const { swiperList, handleSwiperChange } = useSwiperPagination(
      allShows,
      currentPage,
      reactiveSearch,
    )

    swiperList.value = [...allShows.value.slice(0, 10)]
    currentPage.value = 1

    await handleSwiperChange(swiper)

    expect(swiperList.value.length).toBe(20)
    expect(swiperList.value[19].id).toBe(19)

    expect(swiper.slideNext).toHaveBeenCalled()
  })

  it('should keep swiperList empty when no shows are available', async () => {
    allShows.value = []
    const { swiperList } = useSwiperPagination(allShows, currentPage, searchCriteria)

    await nextTick()

    expect(swiperList.value.length).toBe(0)
  })

  it('should not break if remaining chunk is less than 10', async () => {
    allShows.value = Array.from({ length: 12 }, (_, i) => ({ id: i }))
    const { swiperList, handleSwiperChange } = useSwiperPagination(
      allShows,
      currentPage,
      searchCriteria,
    )

    swiperList.value = allShows.value.slice(0, 10)
    await handleSwiperChange(swiper)

    expect(swiperList.value.length).toBe(12)
  })
})
