import { mount } from '@vue/test-utils'
import { BContainer } from 'bootstrap-vue'
import ErrorLayout from '~/layouts/error'

const stubs = {
  BContainer,
}

const propsData = {
  error: {
    message: 'Test Error',
  },
}

describe('error.vue', () => {
  const wrapper = mount(ErrorLayout, {
    propsData,
    stubs,
  })

  it('should not show error messages', () => {
    expect(wrapper.findAll('.spinner-border').length).toBe(0)
    expect(wrapper.findAll('img').length).toBe(1)
    expect(wrapper.findAll('.danger').length).toBe(1)
    expect(wrapper.find('h1.text-danger').text()).toBe('Test Error')
  })
})
