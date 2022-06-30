export const state = () => ({
  fetching: false,
  errorMessage: '',
  selectedCategory: {},
  selectedMovies: [],
})

export const mutations = {
  setSelectedCategory(state, category) {
    state.selectedCategory = category
  },
  toggleFetching(state) {
    state.fetching = !state.fetching
  },
  setErrorMessage(state, msg) {
    state.errorMessage = msg
  },
  removeFromSelectedMovies(state, movieId) {
    const auxMovieList = state.selectedMovies.filter(
      (movie) => movie.id !== movieId
    )
    state.selectedMovies = auxMovieList
  },
  clearSelectedMovies(state) {
    state.selectedMovies = []
  },
  addToSelectedMovies(state, newMovie) {
    state.selectedMovies.push(newMovie)
  },
}

export const getters = {
  getSelectedCategory: (state) => state.selectedCategory,
  isFetching: (state) => state.fetching,
  getErrorMessage: (state) => state.errorMessage,
}

export const actions = {
  setSelectedCategoryAction: ({ commit }, category) => {
    commit('setSelectedCategory', category)
  },
  toggleFetchingAction: ({ commit }) => {
    commit('toggleFetching')
  },
  setErrorMessageAction: ({ commit }, msgParams) => {
    commit('setErrorMessage', msgParams)
  },
  clearSelectedMoviesAction: ({ commit }) => {
    commit('clearSelectedMovies')
  },
  addToSelectedMoviesAction: ({ commit }, params) => {
    commit('addToSelectedMovies', params)
  },
  removeFromSelectedMoviesAction: ({ commit }, movieId) => {
    commit('removeFromSelectedMovies', movieId)
  },
}