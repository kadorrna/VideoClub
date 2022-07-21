import { mutations, actions } from '~/store/cart'

describe('Cart store', () => {
  const state = {
    selectedMovies: [
      { id: 1, title: 'title 1' },
      { id: 2, title: 'title 2' },
    ],
  }
  describe('mutations', () => {
    it('removes movie from selectedMovies', () => {
      mutations.removeFromSelectedMovies(state, 1)
      expect(state.selectedMovies.length).toEqual(1)
      expect(state.selectedMovies).toEqual([{ id: 2, title: 'title 2' }])
    })
    it('clears selectedMovies', () => {
      mutations.clearSelectedMovies(state)
      expect(state.selectedMovies.length).toEqual(0)
    })
    it('addToSelectedMovies', () => {
      mutations.addToSelectedMovies(state, { id: 3, title: 'title 3' })
      expect(state.selectedMovies.length).toEqual(1)
      expect(state.selectedMovies[0].id).toEqual(3)
    })
  })

  describe('actions', () => {
    const commit = jest.fn()
    const state = { selectedMovies: [] }
    const newMovie = { id: 1, title: 'Testing Action Movie' }

    afterEach(() => {
      commit.mockReset()
    })
    it('clearSelectedMoviesAction should commit clearSelectedMovies and PERSIST_DATA', () => {
      actions.clearSelectedMoviesAction({ commit })
      expect(commit).toHaveBeenCalledWith('clearSelectedMovies')
      expect(commit).toHaveBeenCalledWith(
        'PERSIST_DATA',
        { selectedMovies: [] },
        { root: true }
      )
    })
    it('addToSelectedMoviesAction should commit addToSelectedMovies', () => {
      actions.addToSelectedMoviesAction({ commit, state }, newMovie)
      expect(commit).toHaveBeenCalledWith('addToSelectedMovies', newMovie)
    })
    it('loadSelectedMoviesFromStorage should commit loadMoviesFromStorage', () => {
      actions.loadSelectedMoviesFromStorage({ commit }, [newMovie])
      expect(commit).toHaveBeenCalledWith('loadMoviesFromStorage', [newMovie])
    })
    it('removeFromSelectedMoviesAction should commit removeFromSelectedMovies and PERSIST_DATA', () => {
      actions.removeFromSelectedMoviesAction({ commit, state }, 1)
      expect(commit).toHaveBeenCalledWith('removeFromSelectedMovies', 1)
      expect(commit).toHaveBeenCalledWith(
        'PERSIST_DATA',
        { selectedMovies: [] },
        { root: true }
      )
    })
  })
})
