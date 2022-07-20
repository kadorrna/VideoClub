// import VuexPersistence from 'vuex-persist'
// import createPersistedState from 'vuex-persistedstate'
import { getCategoriesService } from '@/services'

export const state = () => ({
  list: [],
  selectedCategory: {},
  persistedState: null,
})

export const getters = {
  categories(state) {
    return state.list
  },
  selectedCategory(state) {
    return state.selectedCategory
  },
}
export const mutations = {
  setCategories(state, categories) {
    state.list = categories
  },
  setSelectedCategory(state, category) {
    state.selectedCategory = category
  },
  clearSelectedCategory(state) {
    state.selectedCategory = {}
  },
}
export const actions = {
  async getCategoriesAction({ commit }) {
    commit('toggleFetching', null, { root: true })
    await getCategoriesService()
      .then((resp) => {
        commit('toggleFetching', null, { root: true })
        commit('setCategories', resp)
      })
      .catch((error) => {
        commit('toggleFetching', null, { root: true })
        commit('setErrorMessage', 'Something went wrong: ' + error, {
          root: true,
        })
      })
  },
  setSelectedCategoryAction({ commit }, category) {
    commit('setSelectedCategory', category)
    commit('PERSIST_DATA', { selectedCategory: category }, { root: true })
  },
  clearSelectedCategoryAction({ commit }) {
    commit('clearSelectedCategory')
  },
}
