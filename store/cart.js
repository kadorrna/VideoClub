export const state = () => ({
  selectedMovies: [],
})

export const getters = {
  selectedMovies(state) {
    return state.selectedMovies
  },
}
export const mutations = {
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
  loadMoviesFromStorage(state, moviesList) {
    state.selectedMovies = moviesList
  },
}
export const actions = {
  clearSelectedMoviesAction({ commit }) {
    commit('clearSelectedMovies')
    commit('PERSIST_DATA', { selectedMovies: [] }, { root: true })
  },
  addToSelectedMoviesAction({ commit, state }, params) {
    commit('addToSelectedMovies', params)
    commit(
      'PERSIST_DATA',
      { selectedMovies: state.selectedMovies },
      { root: true }
    )
  },
  loadSelectedMoviesFromStorage({ commit }, moviesList) {
    commit('loadMoviesFromStorage', moviesList)
  },
  removeFromSelectedMoviesAction({ commit, state }, movieId) {
    commit('removeFromSelectedMovies', movieId)
    commit(
      'PERSIST_DATA',
      { selectedMovies: state.selectedMovies },
      { root: true }
    )
  },
}
