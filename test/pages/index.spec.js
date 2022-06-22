import { mount } from '@vue/test-utils'
import { BContainer, BCard } from 'bootstrap-vue'
import IndexPage from '@/pages/index.vue'

describe('IndexPage', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(IndexPage, {
      mocks: {
        $fetchState: { pending: false, error: false },
        $store: {
          state: {
            fetching: false,
            errorMessage: '',
          },
        },
      },
      stubs: {
        BContainer,
        BCard,
      },
    })
    wrapper.setData({
      genresData: {
        genres: [
          { name: 'cat 1', id: 1 },
          { name: 'cat 2', id: 2 },
        ],
      },
    })
  })

  test('is a Vue instance and displays basic info', () => {
    const div = wrapper.find('div')
    expect(wrapper.vm).toBeTruthy()
    expect(div.text()).toContain('Movie Categories')
    const bcard = wrapper.findAll('.card-container')
    expect(bcard.length).toBe(2)
  })
})
