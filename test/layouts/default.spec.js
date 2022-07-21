import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import {
  BSpinner,
  BContainer,
  BBreadcrumb,
  BBreadcrumbItem,
  BModal,
  BIcon,
} from 'bootstrap-vue'
import DefaultLayout from '~/layouts/default'
import PageTitle from '~/components/pageTitle.vue'
import BreadCrumbs from '~/components/breadCrumbs.vue'
import CartComponent from '~/components/cartComponent.vue'

const stubs = {
  BSpinner,
  BContainer,
  BBreadcrumb,
  BBreadcrumbItem,
  BModal,
  BIcon,
  PageTitle,
  BreadCrumbs,
  CartComponent,
}

const mocks = {
  $nuxt: {
    error: jest.fn(),
  },
  $route: {
    name: 'index',
  },
}

const state = {
  selectedCategory: {},
  selectedMovies: [],
  fetching: false,
  errorMessage: '',
}
let getters = {
  isFetching: () => false,
  errorMessage: () => '',
  selectedMovies: () => [],
  selectedCategory: () => {},
  'categories/selectedCategory': () => {},
  'movies/movie': () => {},
  'cart/selectedMovies': () => [],
}

describe('default.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  describe('no error set', () => {
    const store = new Vuex.Store({ state, getters })
    const wrapper = mount(DefaultLayout, {
      localVue,
      store,
      mocks,
      stubs,
    })

    it('should not show error messages', () => {
      expect(wrapper.findAll('.spinner-border').length).toBe(0)
      expect(wrapper.findAll('img').length).toBe(0)
      expect(wrapper.findAll('.danger').length).toBe(0)
      expect(wrapper.findAll('main').length).toBe(1)
    })
  })

  describe('is fetching data', () => {
    getters = { ...getters, isFetching: () => true }
    const store = new Vuex.Store({ state, getters })
    const wrapper = mount(DefaultLayout, {
      localVue,
      store,
      mocks,
      stubs,
    })
    it('should show a spinner', () => {
      expect(wrapper.findAll('.spinner-border').length).toBe(1)
      expect(wrapper.findAll('img').length).toBe(0)
      expect(wrapper.findAll('.danger').length).toBe(0)
      expect(wrapper.findAll('main').length).toBe(1)
    })
  })
})
