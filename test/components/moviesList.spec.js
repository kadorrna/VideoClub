import { mount } from '@vue/test-utils'
import { BCard } from 'bootstrap-vue'
import MoviesList from '~/components/moviesList.vue'

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

describe('MoviesList.vue', () => {
  describe('when component is mounted', () => {
    beforeEach(function () {
      wrapper = mount(MoviesList, {
        propsData: {
          movies,
        },
        stubs: {
          BCard,
        },
        mocks: {
          $router: {
            push: jest.fn(),
          },
        },
      })
    })

    it('renders all elements', () => {
      expect(wrapper.findAllComponents(BCard).length).toBe(2)
    })

    it('calls goToItem method when card is clicked', () => {
      const spyIt = jest.spyOn(wrapper.vm, 'goToItem')
      const bCard = wrapper.findComponent(BCard)
      bCard.trigger('click')
      expect(spyIt).toHaveBeenCalled()
    })
  })
})
