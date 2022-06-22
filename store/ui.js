export const state = () => ({
  fetching: false,
  errorMessage: '',
})

export const mutations = {
  toggleFetching(state) {
    state.fetching = !state.fetching
  },
  setErrorMessage(state, msg) {
    state.errorMessage = msg
  },
}

export const getters = {
  isFetching: (state) => state.fetching,
  getErrorMessage: (state) => state.errorMessage,
}
