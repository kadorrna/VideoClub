import { mount } from '@vue/test-utils'
import ItemPage from '@/pages/item.vue'

describe('ItemPage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ItemPage)
    const div = wrapper.find('div')
    expect(wrapper.vm).toBeTruthy()
    expect(div.text()).toContain('Item View')
  })
})
