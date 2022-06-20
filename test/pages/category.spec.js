import { shallowMount } from '@vue/test-utils'
import CategoryPage from '@/pages/category.vue'

describe('CategoryPage', () => {
  test('is a Vue instance', () => {
    const mockRoute = {
      query: {
        id: 1,
        categoryName: 'Test',
      },
    }
    const wrapper = shallowMount(CategoryPage, {
      mocks: {
        $route: mockRoute,
      },
    })
    wrapper.setData({
      categoryName: 'Test',
      genreId: '1',
    })
    const div = wrapper.find('h1')
    expect(wrapper.vm).toBeTruthy()
    expect(div.text()).toContain('Test')
  })
})
