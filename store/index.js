export const state = () => ({
  selectedCategory: {},
  fetching: false,
  errorMessage: '',
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
  setErrorMessageAction: ({ commit }, msg) => {
    commit('setErrorMessage', msg)
  },
}
