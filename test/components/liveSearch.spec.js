import { shallowMount } from '@vue/test-utils'
import { BFormInput } from 'bootstrap-vue'
import LiveSearch from '~/components/liveSearch.vue'

let wrapper

describe('LiveSearch.vue', () => {
  describe('when component is shallowMounted', () => {
    beforeEach(function () {
      wrapper = shallowMount(LiveSearch, {
        stubs: {
          BFormInput,
        },
      })
    })

    it('renders all elements', () => {
      expect(wrapper.find('form').exists()).toBe(true)
      expect(wrapper.findAllComponents(BFormInput).length).toBe(1)
    })
    it('emits an event on typing', () => {
      wrapper.vm.$emit('searchByTitle')
      const input = wrapper.findComponent(BFormInput)
      input.element.value = 'testing value'
      input.trigger('input')
      expect(wrapper.emitted().searchByTitle).toBeTruthy()
    })
  })
})
