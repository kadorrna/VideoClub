import { mutations, actions } from '~/store/categories'

describe('Categories store', () => {
  const state = {
    list: [],
    selectedCategory: {},
  }

  describe('mutations', () => {
    it('setCategories set new list', () => {
      const newList = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
      ]
      mutations.setCategories(state, newList)
      expect(state.list.length).toEqual(2)
      expect(state.list).toEqual(newList)
    })
    it('setSelectedCategory set new category to selectedCategory', () => {
      const newSelecteCategory = { id: 3, name: 'Category 3' }
      mutations.setSelectedCategory(state, newSelecteCategory)
      expect(state.selectedCategory).toEqual(newSelecteCategory)
    })
    it('clearSelectedCategory set {} selectedCategory', () => {
      mutations.clearSelectedCategory(state)
      expect(state.selectedCategory).toEqual({})
    })
  })

  describe('actions', () => {
    const commit = jest.fn()
    // const newMovie = s{ id: 1, title: 'Testing Action Movie' }

    let url = ''

    jest.mock('axios', () => ({
      get: (_url) => {
        return new Promise((resolve) => {
          url = _url
          resolve(true)
        })
      },
    }))

    afterEach(() => {
      commit.mockReset()
    })
    it('getCategoriesAction should commit toggleFetching and setCategories', async () => {
      await actions.getCategoriesAction({ commit })
      expect(commit).toHaveBeenCalledWith('toggleFetching', null, {
        root: true,
      })
    })
    it('setSelectedCategoryAction should commit setSelectedCategory and PERSIST_DATA ', () => {
      const category = { id: 1, name: 'cagtegory' }
      actions.setSelectedCategoryAction({ commit }, category)
      expect(commit).toHaveBeenCalledWith('setSelectedCategory', category)
      expect(commit).toHaveBeenCalledWith(
        'PERSIST_DATA',
        { selectedCategory: category },
        { root: true }
      )
    })
    it('clearSelectedCategoryAction should commit clearSelectedCategory ', () => {
      actions.clearSelectedCategoryAction({ commit })
      expect(commit).toHaveBeenCalledWith('clearSelectedCategory')
    })
  })
})
