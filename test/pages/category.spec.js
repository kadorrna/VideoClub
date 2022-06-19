import { mount } from '@vue/test-utils'
import CategoryPage from '@/pages/category.vue'

describe('NuxtLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(CategoryPage)
    const div = wrapper.find('div')
    expect(wrapper.vm).toBeTruthy()
    expect(div.text()).toContain('Category View')
  })
})
