import { describe, it, expect, vi, beforeEach } from 'vitest'
import FiltersService from '@/services/FiltersService'
import ShowsService from '@/services/ShowsService'

const mockGetShows = vi.fn()
const mockSetCrimeShows = vi.fn()
const mockSetPopularShows = vi.fn()
const mockSetFilteredShows = vi.fn()

vi.mock('@/services/ShowsService', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      getShows: mockGetShows,
      setFilteredShows: mockSetFilteredShows,
    })),
  }
})

vi.mock('@/services/ShowsService', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      getShows: mockGetShows,
      setCrimeShows: mockSetCrimeShows,
      setPopularShows: mockSetPopularShows,
      setFilteredShows: mockSetFilteredShows,
    })),
  }
})

describe('FiltersService', () => {
  let filtersService

  beforeEach(() => {
    filtersService = new FiltersService()

    mockGetShows.mockReset()
    mockSetCrimeShows.mockReset()
    mockSetPopularShows.mockReset()
    mockSetFilteredShows.mockReset()
  })

  it('should map weight to correct rating', () => {
    expect(filtersService.weightToRating(15)).toBe(1)
    expect(filtersService.weightToRating(35)).toBe(2)
    expect(filtersService.weightToRating(55)).toBe(3)
    expect(filtersService.weightToRating(75)).toBe(4)
    expect(filtersService.weightToRating(90)).toBe(5)
  })

  it('should filter crime shows correctly', () => {
    const mockShows = [
      { genres: ['Crime'] },
      { genres: ['Comedy'] },
      { genres: ['Crime', 'Drama'] },
    ]

    mockGetShows.mockReturnValue(mockShows)

    filtersService.filterCrimeShows()

    expect(mockSetCrimeShows).toHaveBeenCalledWith([
      { genres: ['Crime'] },
      { genres: ['Crime', 'Drama'] },
    ])
  })

  it('should filter popular shows correctly (rating = 5)', () => {
    const mockShows = [{ weight: 90 }, { weight: 70 }, { weight: 30 }]
    mockGetShows.mockReturnValue(mockShows)

    filtersService.filterPopularShows()

    expect(mockSetPopularShows).toHaveBeenCalledWith([{ weight: 90 }])
  })

  it('should filter shows by genre and rating', () => {
    mockGetShows.mockReturnValue([
      { genres: ['Action'], weight: 90 },
      { genres: ['Comedy'], weight: 70 },
      { genres: ['Action'], weight: 70 },
    ])

    const filters = {
      genre: { value: 'Action' },
      rating: { value: 4 },
    }

    filtersService.filterShows(filters)

    expect(mockSetFilteredShows).toHaveBeenCalledWith([{ genres: ['Action'], weight: 70 }])
  })
})
