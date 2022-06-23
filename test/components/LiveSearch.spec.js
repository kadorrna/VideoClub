import { shallowMount } from '@vue/test-utils'
import LiveSearch from '@/components/LiveSearch.vue'

let wrapper

describe('LiveSearch.vue', () => {
  describe('when component is mounted', () => {
    beforeEach(function () {
      wrapper = shallowMount(LiveSearch)
    })

    it('renders all elements', () => {
      expect(wrapper.contains('form')).toBe(true)
      expect(wrapper.findAll('b-form-input').length).toBe(1)
    })
    it('emits an event on typing', () => {
      wrapper.vm.$emit('searchByTitle')
      const input = wrapper.find('b-form-input')
      input.element.value = 'testing value'
      input.trigger('input')
      expect(wrapper.emitted().searchByTitle).toBeTruthy()
    })
  })
})
