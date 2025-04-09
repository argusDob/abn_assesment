import { useShowStore } from '@/stores/movies/show'

export default class ShowService {
  static _instance = null

  constructor() {
    if (ShowService._instance) {
      return ShowService._instance
    }
    this.store = useShowStore()
    this.url = 'https://api.tvmaze.com'
    ShowService._instance = this
  }

  setShows(payload, action) {
    if (action === 'clear') this.store.resetShows()
    this.store.setShows(payload, action)
  }

  setGenreList(payload) {
    this.store.setGenreList(payload)
  }

  searchedShows(payload) {
    this.store.searchedShows(payload)
  }

  setCrimeShows(payload) {
    this.store.setCrimeShows(payload)
  }

  setPopularShows(payload) {
    this.store.setPopularShows(payload)
  }

  setFilteredShows(payload) {
    this.store.setFilteredShows(payload)
  }

  setShow(payload) {
    this.store.setShow(payload)
  }

  getGenreList() {
    return this.store.genresList
  }

  getCrimeShows() {
    return this.store.crimeShows
  }

  getPopularShows() {
    return this.store.popularShows
  }

  getFilteredShows() {
    return this.store.filteredShows
  }

  getShows() {
    return this.store.shows
  }

  getShow() {
    return this.store.show
  }

  setupGenreList(data) {
    const genreSet = new Set()

    data.forEach((item) => {
      item.genres.forEach((genre) => {
        genreSet.add(genre)
      })
    })

    const sortedGenreList = Array.from(genreSet).sort((a, b) => a.localeCompare(b))
    this.setGenreList(sortedGenreList)
  }

  /**
   * Fetch list of shows by page
   * @param {number} currentPage
   * @returns {Promise<Array>}
   */
  async getShowsRequest(currentPage, action) {
    if (!currentPage) return Promise.resolve([])

    try {
      const response = await fetch(`${this.url}/shows?page=${currentPage}`)
      const data = await response.json()
      if (response.status === 404) {
        console.warn(`Reached last page at page ${currentPage}`)
        return []
      }
      this.setShows(data, action)
      this.store.filteredShows = this.getShows()
      this.setupGenreList(data)
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  /**
   * Search for shows by query value
   * @param {{ value: string }} param
   * @returns {Promise<Array>}
   */
  async getShowRequest(value) {
    if (!value) return Promise.resolve([])

    try {
      const response = await fetch(`${this.url}/search/shows?q=${value}`)
      const data = await response.json()
      const shows = data.map((item) => item.show)
      this.searchedShows(shows)
      return Promise.resolve(shows)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  /**
   * Fetch show details by ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async requestShow(id) {
    if (!id) return Promise.resolve(null)

    try {
      const response = await fetch(`${this.url}/shows/${id}`)
      if (response.status === 404) {
        alert(`404`)
        return {}
      }
      const data = await response.json()
      this.setShow(data)
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
