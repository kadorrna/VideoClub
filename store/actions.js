import {
  getCategoriesService,
  getMoviesService,
  getMovieDetailsService,
} from '@/services'

export const setSelectedCategoryAction = ({ commit }, category) => {
  commit('setSelectedCategory', category)
}
export const clearSelectedMoviesAction = ({ commit }) => {
  commit('clearSelectedMovies')
}
export const addToSelectedMoviesAction = ({ commit }, params) => {
  commit('addToSelectedMovies', params)
}
export const removeFromSelectedMoviesAction = ({ commit }, movieId) => {
  commit('removeFromSelectedMovies', movieId)
}
export const searchByTitleAction = async ({ commit, dispatch }, searchText) => {
  commit('updateSearchQuery', searchText.searchQuery)
  await dispatch('findMoviesByTitleAction')
}
export const getCategoriesAction = async ({ commit }) => {
  const baseUrl = `${process.env.API_URL}/genre/movie/list?api_key=${process.env.API_SECRET}&language=en-US`
  commit('toggleFetching')
  await getCategoriesService(baseUrl)
    .then((resp) => {
      commit('toggleFetching')
      commit('setCategories', resp)
    })
    .catch((error) => {
      commit('toggleFetching')
      commit('setErrorMessage', 'Something went wrong: ' + error)
    })
}
export const findMoviesByTitleAction = async ({ commit, state }) => {
  const url = `${process.env.API_URL}/search/movie?api_key=${process.env.API_SECRET}&query=${state.movies.searchQuery}&language=en-US`

  commit('toggleFetching')
  await getMoviesService(url)
    .then((movies) => {
      commit('setMoviesList', movies)
      commit('toggleFetching')
      commit('nextPage')
    })
    .catch((err) => {
      commit('toggleFetching')
      commit('setErrorMessage', 'Something went wrong: ' + err)
    })
}
export const resetMoviesAction = ({ commit }) => {
  commit('resetMovies')
}
export const getMoviesAction = async ({ commit, state }) => {
  const url = `${process.env.API_URL}/discover/movie?api_key=${process.env.API_SECRET}&with_genres=${state.selectedCategory.id}&language=en-US&page=${state.movies.page}`
  commit('toggleFetching')
  await getMoviesService(url)
    .then((movies) => {
      commit('addToMoviesList', movies)
      commit('toggleFetching')
      commit('nextPage')
    })
    .catch((err) => {
      commit('toggleFetching')
      commit('setErrorMessage', 'Something went wrong: ' + err)
    })
}
export const getMovieDetailsAction = async ({ commit }, query) => {
  const url = `${process.env.API_URL}/movie/${query}?api_key=${process.env.API_SECRET}&&language=en-US`
  commit('toggleFetching')
  await getMovieDetailsService(url)
    .then((movie) => {
      commit('toggleFetching')
      commit('setMovie', movie)
    })
    .catch((err) => {
      commit('toggleFetching')
      commit('setErrorMessage', 'Something went wrong: ' + err)
    })
}
