import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { BIcon, BModal, BButton } from 'bootstrap-vue'
import CartComponent from '~/components/CartComponent.vue'

const stubs = {
  BIcon,
  BModal,
  BButton,
}

const state = {
  fetching: false,
  errorMessage: '',
  selectedCategory: {},
  selectedMovies: [],
}

const getters = {
  'cart/selectedMovies': () => [
    { title: 'Title 1', id: 1 },
    { title: 'Title 2', id: 2 },
  ],
}

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Cart.vue', () => {
  describe('when component is mounted with movies', () => {
    const store = new Vuex.Store({ state, getters })

    const wrapper = mount(CartComponent, {
      localVue,
      store,
      mocks: {
        $nuxt: {
          error: jest.fn(),
        },
      },
      stubs,
    })

    it('renders all elements', () => {
      const icon = wrapper.find('[data-icon-modal-button]')
      expect(icon.exists()).toBe(true)
      const modal = wrapper.findComponent(BModal)
      expect(modal.isVisible()).toBeTruthy()
      expect(modal.find('.cartList').exists()).toBe(true)
      const cartList = modal.find('.cartList')
      expect(cartList.findAllComponents(BIcon).length).toBe(2)
      expect(cartList.findAll('[data-movie-title]').length).toBe(2)
    })
  })
})
