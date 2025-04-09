import ShowsService from '@/services/ShowsService'

export default class FiltersService {
  constructor() {
    this.CRIME_GENRE = 'Crime'
    this.RATING = 5
    this.showsService = new ShowsService()
  }

  weightToRating(weight) {
    if (weight <= 20) return 1
    if (weight <= 40) return 2
    if (weight <= 60) return 3
    if (weight <= 80) return 4
    return 5
  }

  filterCrimeShows() {
    const crimeShows = this.showsService
      .getShows()
      .filter((show) => show.genres.includes(this.CRIME_GENRE))

    this.showsService.setCrimeShows(crimeShows)
  }

  filterPopularShows() {
    const popularShows = this.showsService
      .getShows()
      .filter((show) => this.weightToRating(show.weight) === this.RATING)

    this.showsService.setPopularShows(popularShows)
  }

  filterShows(filters) {
    const filteredShows = this.showsService.getShows().filter((show) => {
      const matchesGenre = filters.genre === null || show.genres.includes(filters.genre?.value)

      const matchesRating =
        !filters.rating || this.weightToRating(show.weight) === filters.rating.value
      return matchesGenre && matchesRating
    })
    this.showsService.setFilteredShows(filteredShows)
  }
}
