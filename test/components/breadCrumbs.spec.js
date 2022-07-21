import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BBreadcrumb, BBreadcrumbItem } from 'bootstrap-vue'
import BreadCrumbs from '~/components/breadCrumbs.vue'

const stubs = {
  BBreadcrumb,
  BBreadcrumbItem,
}

const getters = {
  'categories/selectedCategory': () => [],
}

describe('BreadCrumbs.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store({ getters })

  describe('when route is index ', () => {
    const wrapper = mount(BreadCrumbs, {
      localVue,
      store,
      mocks: {
        $route: {
          name: 'index',
        },
      },
      stubs,
    })
    it('renders one item Home', () => {
      expect(wrapper.findAll('.breadcrumb-item').length).toBe(1)
      const home = wrapper.find('.breadcrumb-item')
      expect(home.text()).toBe('Home')
      expect(home.classes('active')).toBe(true)
    })
  })

  describe('when route is category ', () => {
    const wrapper = mount(BreadCrumbs, {
      localVue,
      store,
      mocks: {
        $route: {
          name: 'category',
        },
      },
      stubs,
    })
    it('renders two items Home & Category', () => {
      expect(wrapper.findAll('.breadcrumb-item').length).toBe(2)
      const home = wrapper.findAll('.breadcrumb-item').at(0)
      expect(home.text()).toBe('Home')
      expect(home.classes('active')).toBe(false)

      const category = wrapper.findAll('.breadcrumb-item').at(1)
      expect(category.text()).toBe('Category')
      expect(category.classes('active')).toBe(true)
    })
  })

  describe('when route is movie ', () => {
    const wrapper = mount(BreadCrumbs, {
      localVue,
      store,
      mocks: {
        $route: {
          name: 'movie',
        },
      },
      stubs,
    })
    it('renders three items Home & Category & Movie', () => {
      expect(wrapper.findAll('.breadcrumb-item').length).toBe(3)
      const home = wrapper.findAll('.breadcrumb-item').at(0)
      expect(home.text()).toBe('Home')
      expect(home.classes('active')).toBe(false)

      const category = wrapper.findAll('.breadcrumb-item').at(1)
      expect(category.text()).toBe('Category')
      expect(category.classes('active')).toBe(false)

      const movie = wrapper.findAll('.breadcrumb-item').at(2)
      expect(movie.text()).toBe('Movie')
      expect(movie.classes('active')).toBe(true)
    })
  })
})
