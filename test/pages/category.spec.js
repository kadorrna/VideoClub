import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BContainer, BAlert, BCard, BFormInput } from 'bootstrap-vue'
import LiveSearch from '~/components/liveSearch.vue'
import MoviesList from '~/components/moviesList.vue'

import CategoryPage from '~/pages/category.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CategoryPage', () => {
  const actions = {
    'categories/setSelectedCategoryAction': jest.fn(),
    'movies/resetMoviesAction': jest.fn(),
    'movies/getMoviesAction': jest.fn(),
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
      'movies/movies': () => [
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
      BContainer,
      BAlert,
      BCard,
      BFormInput,
      LiveSearch,
      MoviesList,
    },
  })

  test('it has 2 elements in the list', () => {
    expect(wrapper.findAllComponents(BCard).length).toBe(2)
  })
})
