import { mount } from '@vue/test-utils'
import { BCard } from 'bootstrap-vue'
import MoviesList from '@/components/MoviesList.vue'

let wrapper
const movie1 = {
  id: 1,
  title: 'Testing Movie',
}
const movie2 = {
  id: 2,
  title: 'Testing Movie 2',
}

const movies = [movie1, movie2]
const methods = {
  goToItem: jest.fn(),
}

describe('MoviesList.vue', () => {
  describe('when component is mounted', () => {
    beforeEach(function () {
      wrapper = mount(MoviesList, {
        propsData: {
          movies,
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
      expect(methods.goToItem).toHaveBeenCalled()
    })
  })
})
