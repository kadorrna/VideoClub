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
}
export const actions = {
  clearSelectedMoviesAction({ commit }) {
    commit('clearSelectedMovies')
  },
  addToSelectedMoviesAction({ commit }, params) {
    commit('addToSelectedMovies', params)
  },
  removeFromSelectedMoviesAction({ commit }, movieId) {
    commit('removeFromSelectedMovies', movieId)
  },
}
