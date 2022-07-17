import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { BContainer, BAlert, BCard } from 'bootstrap-vue'

import Vuex from 'vuex'

import CategoryPage from '~/pages/category.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CategoryPage', () => {
  const actions = {
    setSelectedCategoryAction: jest.fn(),
    resetMoviesAction: jest.fn(),
    getMoviesAction: jest.fn(),
  }
  const mockRoute = {
    query: {
      id: 1,
      categoryName: 'Test',
    },
  }

  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store({
    actions,
    state: {
      selectedCategory: {},
      selectedMovies: [],
    },
    getters: {
      isFetching: () => false,
      errorMessage: () => '',
      movies: () => [
        {
          title: 'Movie 1',
          id: '1',
        },
        {
          title: 'Movie 2',
          id: '2',
        },
      ],
      selectedMovies: () => [],
    },
  })

  const wrapper = mount(CategoryPage, {
    localVue,
    store,
    mocks: {
      $route: mockRoute,
      $store: store,
      $config: {
        baseUrl: 'searchUrlForMovies.com',
      },
      $nuxt: {
        error: jest.fn(),
      },
    },
    stubs: {
      NuxtLink: RouterLinkStub,
      BContainer,
      BAlert,
      BCard,
    },
  })

  test('it has 2 elements in the list', () => {
    expect(wrapper.findAllComponents(BCard).length).toBe(2)
  })
})
