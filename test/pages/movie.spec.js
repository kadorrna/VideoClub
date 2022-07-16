import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import {
  BContainer,
  BCol,
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
  toggleFetchingAction: jest.fn(),
  getMovieDetailsAction: jest.fn(),
}

const getters = {
  movie: () => movie,
}
const state = {
  fetching: false,
  errorMessage: '',
  selectedCategory: {},
  selectedMovies: [],
  movie,
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
      },
      stubs,
    })

    test('Displays basic movie info', () => {
      const div = wrapper.find('h1')
      expect(wrapper.vm).toBeTruthy()
      expect(div.text()).toContain('Testing Movie')
      const overview = wrapper.find('.overview')
      expect(overview.text()).toBe('This is a test overview')
    })
  })

  describe('When is an error', () => {
    const state = {
      fetching: false,
      errorMessage: 'Error Message',
    }
    const store = new Vuex.Store({ getters, actions, state })
    const wrapper = mount(MoviePage, {
      localVue,
      store,
      mocks: {
        $route: mockRoute,
      },
      stubs,
    })
    test('Displays error message', () => {
      const div = wrapper.find('h1.text-danger')
      expect(wrapper.vm).toBeTruthy()
      expect(div.text()).toContain('Error Message')
    })
  })
})
