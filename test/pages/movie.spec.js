import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import {
  BContainer,
  BCol,
  BRow,
  BIcon,
  BModal,
  BBreadcrumb,
  BBreadcrumbItem,
} from 'bootstrap-vue'
import MoviePage from '~/pages/movie.vue'

const movie = {
  title: 'Testing Movie',
  poster_path: 'url_testing_poster_path',
  release_date: '2022-04-06',
  status: 'Released',
  overview: 'This is a test overview',
  vote_average: 8.2,
  vote_count: 100,
}

const actions = {
  getMovieDetailsAction: jest.fn(),
}

const getters = {
  'movies/movie': () => movie,
  isFetching: () => false,
  'categories/selectedCategory': () => ({
    id: 1,
    name: 'category',
  }),
  'cart/selectedMovies': () => [],
}
const state = {
  fetching: false,
  errorMessage: '',
  selectedMovies: [],
}
const mockRoute = {
  query: {
    id: 1,
    categoryName: 'Test',
  },
}

const stubs = {
  NuxtLink: RouterLinkStub,
  BContainer,
  BCol,
  BIcon,
  BRow,
  BModal,
  BBreadcrumb,
  BBreadcrumbItem,
}

describe('MoviePage', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  describe('With Movie info', () => {
    const store = new Vuex.Store({ getters, actions, state })
    const wrapper = mount(MoviePage, {
      localVue,
      store,
      mocks: {
        $route: mockRoute,
        $nuxt: {
          error: jest.fn(),
        },
      },
      stubs,
    })

    test('Displays basic movie info', () => {
      const overView = wrapper.find('.overview')
      expect(overView.text()).toBe(movie.overview)
    })
  })
})
