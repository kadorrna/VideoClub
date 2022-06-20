import { mount } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'

describe('IndexPage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(IndexPage, {
      mocks: {
        $fetchState: { pending: false, error: false },
        genresData: [{ id: 1, name: 'cat1' }],
      },
    })

    IndexPage.data = () => [{ id: 1, name: 'cat1' }]
    IndexPage.fetch = () => [{ id: 1, name: 'cat1' }]

    const div = wrapper.find('div')
    expect(wrapper.vm).toBeTruthy()
    expect(div.text()).toContain('Movies Categories')
  })
})
