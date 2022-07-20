import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BSpinner, BContainer } from 'bootstrap-vue'
import DefaultLayout from '~/layouts/default'

const stubs = {
  BSpinner,
  BContainer,
}

const mocks = {
  $nuxt: {
    error: jest.fn(),
  },
}

const state = {
  selectedCategory: {},
  selectedMovies: [],
  fetching: false,
  errorMessage: '',
}

describe('default.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  describe('no error set', () => {
    const getters = {
      isFetching: () => false,
      errorMessage: () => '',
    }
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
    const getters = {
      isFetching: () => true,
      errorMessage: () => '',
    }
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
