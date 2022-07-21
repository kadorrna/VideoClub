import { mount, createLocalVue } from '@vue/test-utils'
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

let wrapper
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
  'movies/getMovieDetailsAction': jest.fn(),
}

let getters = {
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
  BContainer,
  BCol,
  BIcon,
  BRow,
  BModal,
  BBreadcrumb,
  BBreadcrumbItem,
}

const generalComponentValues = {
  mocks: {
    $route: mockRoute,
    $nuxt: {
      error: jest.fn(),
    },
  },
  stubs,
}

describe('MoviePage', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  describe('With Movie info', () => {
    const store = new Vuex.Store({ getters, actions, state })

    beforeEach(() => {
      wrapper = mount(MoviePage, {
        localVue,
        store,
        ...generalComponentValues,
      })
    })

    it('Displays basic movie info', () => {
      const overView = wrapper.find('.overview')
      expect(overView.text()).toBe(movie.overview)
      const images = wrapper.findAll('[data-movie-poster]')
      expect(images.exists()).toBe(true)
      expect(images.length).toBe(1)
    })

    it('Shows star-fill icon', () => {
      const iconContainer = wrapper.find('.released')
      expect(iconContainer.exists()).toBe(true)
    })

    describe('when status Rumored', () => {
      beforeEach(() => {
        getters = {
          'movies/movie': () => ({ ...movie, status: 'Rumored' }),
        }
        const store = new Vuex.Store({ getters, actions, state })
        wrapper = mount(MoviePage, {
          localVue,
          store,
          ...generalComponentValues,
        })
      })
      it('Shows rumored style', () => {
        const iconContainer = wrapper.find('.rumored')
        expect(iconContainer.exists()).toBe(true)
      })
    })
    describe('when status Planned', () => {
      beforeEach(() => {
        getters = {
          'movies/movie': () => ({ ...movie, status: 'Planned' }),
        }
        const store = new Vuex.Store({ getters, actions, state })
        wrapper = mount(MoviePage, {
          localVue,
          store,
          ...generalComponentValues,
        })
      })
      it('Shows lightbulb-fill icon', () => {
        const iconContainer = wrapper.find('.planned')
        expect(iconContainer.exists()).toBe(true)
      })
    })

    describe('when status InProduction', () => {
      beforeEach(() => {
        getters = {
          'movies/movie': () => ({ ...movie, status: 'InProduction' }),
        }
        const store = new Vuex.Store({ getters, actions, state })
        wrapper = mount(MoviePage, {
          localVue,
          store,
          ...generalComponentValues,
        })
      })

      it('Shows camera-reels-fill icon', () => {
        const iconContainer = wrapper.find('.inproduction')
        expect(iconContainer.exists()).toBe(true)
      })
    })
    describe('when status PostProduction', () => {
      beforeEach(() => {
        getters = {
          'movies/movie': () => ({ ...movie, status: 'PosProduction' }),
        }
        const store = new Vuex.Store({ getters, actions, state })
        wrapper = mount(MoviePage, {
          localVue,
          store,
          ...generalComponentValues,
        })
      })
      it('Shows camera-reels-fill icon', () => {
        const iconContainer = wrapper.find('.posproduction')
        expect(iconContainer.exists()).toBe(true)
      })
    })
    describe('when status Canceled', () => {
      beforeEach(() => {
        getters = {
          'movies/movie': () => ({ ...movie, status: 'Canceled' }),
        }
        const store = new Vuex.Store({ getters, actions, state })
        wrapper = mount(MoviePage, {
          localVue,
          store,
          ...generalComponentValues,
        })
      })
      it('Shows x-circle-fill icon', () => {
        const iconContainer = wrapper.find('.canceled')
        expect(iconContainer.exists()).toBe(true)
      })
    })
  })
})
