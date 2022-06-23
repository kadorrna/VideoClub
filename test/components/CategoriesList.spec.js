import { mount } from '@vue/test-utils'
import { BCard } from 'bootstrap-vue'
import CategoriesList from '@/components/CategoriesList.vue'

let wrapper
const category1 = {
  id: 1,
  name: 'Testing Category',
}
const category2 = {
  id: 2,
  name: 'Testing Category 2',
}

const categories = [category1, category2]
const methods = {
  goToCategory: jest.fn(),
}

describe('CategoriesList.vue', () => {
  describe('when component is mounted', () => {
    beforeEach(function () {
      wrapper = mount(CategoriesList, {
        propsData: {
          categories,
        },
        methods,
        stubs: {
          BCard,
        },
      })
    })

    it('renders all elements', () => {
      expect(wrapper.findAllComponents(BCard).length).toBe(2)
    })

    it('calls goToItem method when card is clicked', () => {
      const bCard = wrapper.findComponent(BCard)
      bCard.trigger('click')
      expect(methods.goToCategory).toHaveBeenCalled()
    })
  })
})
