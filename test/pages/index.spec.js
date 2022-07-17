import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BContainer, BCard, BIcon, BModal } from 'bootstrap-vue'
import IndexPage from '~/pages/index.vue'

const state = {
  fetching: false,
  errorMessage: '',
  selectedCategory: {},
  selectedMovies: [],
}

const stubs = {
  BContainer,
  BCard,
  BIcon,
  BModal,
}

const getters = {
  categories: () => [
    { name: 'cat 1', id: 1 },
    { name: 'cat 2', id: 2 },
  ],
  isFetching: () => false,
  selectedMovies: () => [],
}

describe('IndexPage', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store({ getters, state })

  const wrapper = mount(IndexPage, {
    localVue,
    store,
    stubs,
    mocks: {
      $nuxt: {
        error: jest.fn(),
      },
    },
  })

  test('is a Vue instance and displays basic info', () => {
    const div = wrapper.find('div')
    expect(wrapper.vm).toBeTruthy()
    expect(div.text()).toContain('Movie Categories')
    const bcard = wrapper.findAll('.card-container')
    expect(bcard.length).toBe(2)
  })
})
