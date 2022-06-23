import { mount, RouterLinkStub } from '@vue/test-utils'
import {
  BContainer,
  BCol,
  BIcon,
  BModal,
  BBreadcrumb,
  BBreadcrumbItem,
} from 'bootstrap-vue'
import MoviePage from '~/pages/movie.vue'

describe('MoviePage', () => {
  let wrapper
  const mockRoute = {
    query: {
      id: 1,
      categoryName: 'Test',
    },
  }
  const movie = {
    title: 'Testing Movie',
    poster_path: 'url_testing_poster_path',
    release_date: '2022-04-06',
    status: 'Released',
    overview: 'This is a test overview',
    vote_average: 8.2,
    vote_count: 100,
  }

  beforeEach(() => {
    wrapper = mount(MoviePage, {
      mocks: {
        $route: mockRoute,
        $store: {
          state: {
            fetching: false,
            errorMessage: '',
            selectedCategory: {},
            selectedMovies: [],
          },
        },
      },
      stubs: {
        NuxtLink: RouterLinkStub,
        BContainer,
        BCol,
        BIcon,
        BModal,
        BBreadcrumb,
        BBreadcrumbItem,
      },
    })
    wrapper.setData({ movie })
  })
  test('is a Vue instance and displays basic movie info', () => {
    const div = wrapper.find('h1')
    expect(wrapper.vm).toBeTruthy()
    expect(div.text()).toContain('Testing Movie')
    const overview = wrapper.find('.overview')
    expect(overview.text()).toBe('This is a test overview')
  })
})
