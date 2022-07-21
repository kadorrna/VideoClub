import {
  getMoviesService,
  getMovieDetailsService,
  findMovieByTitleAction,
} from '@/services'

export const state = () => ({
  movies: {
    list: [],
    page: 1,
    searchQuery: '',
  },
  movie: {},
})
export const getters = {
  movies(state) {
    return state.movies.list
  },
  page(state) {
    return state.movies.page
  },
  movie(state) {
    return state.movie
  },
  selectedCategory(state, getters, rootState, rootGetters) {
    return rootGetters['categories/selectedCategory']
  },
}
export const mutations = {
  setMoviesList(state, moviesList) {
    state.movies.list = []
    state.movies.list = moviesList
  },
  resetMovies(state) {
    state.movies.list = []
    state.movies.page = 1
  },
  addToMoviesList(state, moviesList) {
    const aux = state.movies.list.concat(moviesList)
    state.movies.list = aux
  },
  nextPage(state) {
    state.movies.page = state.movies.page + 1
  },
  updateSearchQuery(state, txt) {
    state.movies.searchQuery = txt
  },
  setMovie(state, movie) {
    state.movie = movie
  },
  clearMovie(state) {
    state.movie = {}
  },
}
export const actions = {
  async searchByTitleAction({ commit, dispatch }, searchText) {
    commit('updateSearchQuery', searchText.searchQuery)
    await dispatch('findMoviesByTitleAction')
  },
  async findMoviesByTitleAction({ commit, state }) {
    commit('toggleFetching', null, { root: true })
    await findMovieByTitleAction(state.movies.searchQuery)
      .then((movies) => {
        commit('setMoviesList', movies)
        commit('toggleFetching', null, { root: true })
        commit('nextPage')
      })
      .catch((err) => {
        commit('toggleFetching', null, { root: true })
        commit('setErrorMessage', 'Something went wrong: ' + err)
      })
  },
  resetMoviesAction({ commit }) {
    commit('resetMovies')
  },
  async getMoviesAction({ commit, getters }, categoryId) {
    const page = getters.page

    await getMoviesService(categoryId, page)
      .then((movies) => {
        commit('addToMoviesList', movies)
        commit('nextPage')
      })
      .catch((err) => {
        commit('setErrorMessage', 'Something went wrong: ' + err, {
          root: true,
        })
      })
  },
  async getMovieDetailsAction({ commit }, query) {
    commit('toggleFetching', null, { root: true })
    await getMovieDetailsService(query)
      .then((movie) => {
        commit('setMovie', movie)
        commit('PERSIST_DATA', { movie }, { root: true })
        commit('toggleFetching', null, { root: true })
      })
      .catch((err) => {
        commit('toggleFetching', null, { root: true })
        commit('setErrorMessage', 'Something went wrong: ' + err, {
          root: true,
        })
      })
  },
  setMovieDetailsAction({ commit }, movie) {
    commit('setMovie', movie)
  },
  clearMovieDetailsAction({ commit }) {
    commit('clearMovie')
  },
}
