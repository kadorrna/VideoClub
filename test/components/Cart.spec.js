import { mount } from '@vue/test-utils'
import { BIcon, BModal, BButton } from 'bootstrap-vue'
import CartComponent from '~/components/CartComponent.vue'

let wrapper

describe('Cart.vue', () => {
  describe('when component is mounted with movies', () => {
    beforeEach(function () {
      wrapper = mount(CartComponent, {
        attachTo: document.body,
        mocks: {
          $store: {
            state: {
              fetching: false,
              errorMessage: '',
              selectedCategory: {},
              selectedMovies: [
                { title: 'Title 1', id: 1 },
                { title: 'Title 2', id: 2 },
              ],
            },
          },
        },
        stubs: {
          BIcon,
          BModal,
          BButton,
        },
      })
    })

    it('renders all elements', () => {
      expect(wrapper.findAllComponents(BIcon).length).toBe(1)
      expect(wrapper.findComponent(BModal).isVisible()).toBeFalsy()
    })
    // it('opens a modal on click', () => {
    //   const icon = wrapper.find(BIcon)
    //   icon.trigger('click')
    //   expect(wrapper.findComponent(BModal).isVisible()).toBeTruthy()
    // })
  })
})
