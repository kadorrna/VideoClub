import { mount } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'

describe('IndexPage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(IndexPage)
    const div = wrapper.find('div')
    expect(wrapper.vm).toBeTruthy()
    expect(div.text()).toContain('Home View')
  })
})
