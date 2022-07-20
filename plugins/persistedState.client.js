import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuexMovies',
    paths: ['persistedData'],
  })(store)
}
