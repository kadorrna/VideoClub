import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { BContainer, BAlert } from 'bootstrap-vue'

import Vuex from 'vuex'

import CategoryPage from '@/pages/category.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CategoryPage', () => {
  let wrapper
  const actions = {
    setSelectedCategoryAction: jest.fn(),
  }
  const mockRoute = {
    query: {
      id: 1,
      categoryName: 'Test',
    },
  }
  const store = new Vuex.Store({
    actions,
    state: {
      fetching: false,
      errorMessage: 'Error',
    },
  })
  beforeEach(() => {
    wrapper = mount(CategoryPage, {
      mocks: {
        $route: mockRoute,
        $store: store,
        $config: {
          baseUrl: 'searchUrlForMovies.com',
        },
      },
      stubs: {
        NuxtLink: RouterLinkStub,
        BContainer,
        BAlert,
      },
    })
    wrapper.setData({
      categoryName: 'Test',
      genreId: '1',
      url: 'searchUrlForMovies.com',
      initialUrl: 'searchUrlForMovies.com',
    })
  })

  test('is a Vue instance and displays error', () => {
    const img = wrapper.findAll('img')
    expect(wrapper.vm).toBeTruthy()
    expect(img.length).toBe(1)
  })
})
