import { mount } from '@vue/test-utils'
import { BContainer, BCard, BIcon, BModal } from 'bootstrap-vue'
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
            selectedCategory: {},
            selectedMovies: [],
          },
        },
      },
      stubs: {
        BContainer,
        BCard,
        BIcon,
        BModal,
      },
    })
    wrapper.setData({
      genres: [
        { name: 'cat 1', id: 1 },
        { name: 'cat 2', id: 2 },
      ],
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
