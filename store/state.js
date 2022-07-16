export const state = () => ({
  fetching: false,
  errorMessage: '',
  selectedCategory: {},
  selectedMovies: [],
  categories: [],
  movies: {
    list: [],
    page: 1,
    searchQuery: '',
  },
  movie: {},
})
