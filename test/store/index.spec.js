import { mutations } from '~/store/index'

describe('Index store', () => {
  const state = {
    fetching: false,
    errorMessage: '',
    persistedData: null,
  }

  describe('mutations', () => {
    it('toggleFetching changes fetching value', () => {
      mutations.toggleFetching(state)
      expect(state.fetching).toEqual(true)
    })
    it('setErrorMessage updates errorMessage', () => {
      mutations.setErrorMessage(state, 'Error Testing')
      expect(state.errorMessage).toEqual('Error Testing')
    })
    it('PERSIST_DATA updates persisted state', () => {
      mutations.PERSIST_DATA(state, {
        selectedMovies: [{ id: 1, title: 'Title testing' }],
      })
      expect(state.persistedData.selectedMovies[0].id).toEqual(1)
    })
  })
})
