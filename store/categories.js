export const state = () => ({
  selectedCategory: {},
})

export const mutations = {
  setSelectedCategory(state, category) {
    state.selectedCategory = category
  },
}

export const getters = {
  getSelectedCategory: (state) => state.selectedCategory,
}

export const actions = {
  setSelectedCategoryAction: ({ commit }, category) => {
    commit('setSelectedCategory', category)
  },
}
