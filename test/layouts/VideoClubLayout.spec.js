import { shallowMount } from '@vue/test-utils'
import { BSpinner, BContainer } from 'bootstrap-vue'
import VideoClubLayout from '@/layouts/VideoClubLayout'

describe('VideoClubLayout.vue', () => {
  let wrapper
  describe('error has been set', () => {
    beforeEach(() => {
      wrapper = shallowMount(VideoClubLayout, {
        mocks: {
          $store: {
            state: {
              fetching: false,
              errorMessage: 'ERROR TEST',
              selectedCategory: {},
              selectedMovies: [],
            },
          },
        },
        stubs: {
          BSpinner,
          BContainer,
        },
      })
    })

    it('should render error page', () => {
      expect(wrapper.findAllComponents(BSpinner).length).toBe(0)
      expect(wrapper.findAll('img').length).toBe(1)
      expect(wrapper.findAll('.danger').length).toBe(1)
      expect(wrapper.find('h1').text()).toBe('ERROR TEST')
    })
  })

  describe('no error set', () => {
    beforeEach(() => {
      wrapper = shallowMount(VideoClubLayout, {
        mocks: {
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
          BSpinner,
          BContainer,
        },
      })
    })

    it('should not show error messages', () => {
      expect(wrapper.findAllComponents(BSpinner).length).toBe(0)
      expect(wrapper.findAll('img').length).toBe(0)
      expect(wrapper.findAll('.danger').length).toBe(0)
      expect(wrapper.findAll('main').length).toBe(1)
    })
  })

  describe('is fetching data', () => {
    beforeEach(() => {
      wrapper = shallowMount(VideoClubLayout, {
        mocks: {
          $store: {
            state: {
              fetching: true,
              errorMessage: '',
              selectedCategory: {},
              selectedMovies: [],
            },
          },
        },
        stubs: {
          BSpinner,
          BContainer,
        },
      })
    })
    it('should show a spinner', () => {
      expect(wrapper.findComponent(BSpinner).isVisible()).toBe(true)
      expect(wrapper.findAll('img').length).toBe(0)
      expect(wrapper.findAll('.danger').length).toBe(0)
      expect(wrapper.findAll('main').length).toBe(1)
    })
  })
})
