export const state = () => ({
  fetching: false,
  errorMessage: '',
})
export const getters = {
  isFetching(state) {
    return state.fetching
  },
  errorMessage(state) {
    return state.errorMessage
  },
}
export const mutations = {
  toggleFetching(state) {
    state.fetching = !state.fetching
  },
  setErrorMessage(state, msg) {
    state.errorMessage = msg
  },
}
