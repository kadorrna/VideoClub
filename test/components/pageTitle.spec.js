import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import PageTitle from '~/components/pageTitle.vue'

let store
let getters = {
  'categories/selectedCategory': () => {},
  'movies/movie': () => {},
}

describe('PageTitle.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  describe('when route is index ', () => {
    store = new Vuex.Store({ getters })
    const wrapper = mount(PageTitle, {
      localVue,
      store,
      mocks: {
        $route: {
          name: 'index',
        },
      },
    })
    it('renders Movies', () => {
      expect(wrapper.find('h1').exists()).toBe(true)
      const title = wrapper.find('h1')
      expect(title.text()).toBe('Movies')
    })
  })

  describe('when route is category ', () => {
    getters = {
      ...getters,
      'categories/selectedCategory': () => ({
        id: 1,
        name: 'Testing Category',
      }),
    }
    store = new Vuex.Store({ getters })
    const wrapper = mount(PageTitle, {
      localVue,
      store,
      mocks: {
        $route: {
          name: 'category',
        },
      },
    })
    it('renders one Categories', () => {
      expect(wrapper.find('h1').exists()).toBe(true)
      const title = wrapper.find('h1')
      expect(title.text()).toBe('Testing Category')
    })
  })

  describe('when route is movie ', () => {
    getters = {
      ...getters,
      'movies/movie': () => ({ id: 1, title: 'The Test Movie' }),
    }
    store = new Vuex.Store({ getters })
    const wrapper = mount(PageTitle, {
      localVue,
      store,
      mocks: {
        $route: {
          name: 'movie',
        },
      },
    })
    it('renders Movie Title', () => {
      expect(wrapper.find('h1').exists()).toBe(true)
      const title = wrapper.find('h1')
      expect(title.text()).toBe('The Test Movie')
    })
  })
})
