export const state = () => ({
  fetching: false,
  errorMessage: '',
  persistedData: null,
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
  PERSIST_DATA(state, dataToPersist) {
    const key = Object.keys(dataToPersist)[0]
    const aux = { ...state.persistedData, [key]: dataToPersist[key] }
    state.persistedData = aux
  },
}
