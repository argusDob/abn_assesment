// src/stores/show.js
import { defineStore } from 'pinia'

export const useShowStore = defineStore('show', {
  state: () => ({
    shows: [],
    show: {},
    filteredShows: [],
    popularShows: [],
    crimeShows: [],
    genresList: [],
  }),

  actions: {
    setShows(shows) {
      this.shows = [...this.shows, ...shows]
    },
    resetShows() {
      this.shows = []
    },
    searchedShows(shows) {
      this.shows = shows
      this.filteredShows = shows
    },
    setFilteredShows(shows) {
      this.filteredShows = shows
    },
    setGenreList(genresList) {
      this.genresList = genresList
    },
    setPopularShows(shows) {
      this.popularShows = shows
    },
    setCrimeShows(shows) {
      this.crimeShows = shows
    },
    setShow(show) {
      this.show = show
    },
  },
})
