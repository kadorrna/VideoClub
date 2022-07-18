export const setSelectedCategory = (state, category) => {
  state.selectedCategory = category
}
export const setCategories = (state, categories) => {
  state.categories = categories
}
export const toggleFetching = (state) => {
  state.fetching = !state.fetching
}

export const setErrorMessage = (state, msg) => {
  state.errorMessage = msg
}
export const removeFromSelectedMovies = (state, movieId) => {
  const auxMovieList = state.selectedMovies.filter(
    (movie) => movie.id !== movieId
  )
  state.selectedMovies = auxMovieList
}
export const clearSelectedMovies = (state) => {
  state.selectedMovies = []
}
export const addToSelectedMovies = (state, newMovie) => {
  state.selectedMovies.push(newMovie)
}
export const setMoviesList = (state, moviesList) => {
  state.movies.list = []
  state.movies.list = moviesList
}
export const resetMovies = (state) => {
  state.movies.list = []
  state.movies.page = 1
}
export const addToMoviesList = (state, moviesList) => {
  const aux = state.movies.list.concat(moviesList)
  state.movies.list = aux
}
export const nextPage = (state) => {
  state.movies.page = state.movies.page + 1
}
export const updateSearchQuery = (state, txt) => {
  state.movies.searchQuery = txt
}
export const setMovie = (state, movie) => {
  state.movie = movie
}
export const clearMovie = (state) => {
  state.movie = {}
}
