import { mutations } from '~/store/movies'

describe('Movies store', () => {
  const state = {
    movies: {
      list: [],
      page: 1,
      searchQuery: '',
    },
    movie: {},
  }

  const movie = {
    title: 'Testing Movie',
    poster_path: 'url_testing_poster_path',
    release_date: '2022-04-06',
    status: 'Released',
    overview: 'This is a test overview',
    vote_average: 8.2,
    vote_count: 100,
  }

  const newMoviesLsit = [
    { id: 1, title: 'movie 1' },
    { id: 2, title: 'movie 2' },
    { id: 3, title: 'movie 3' },
  ]

  describe('mutations', () => {
    it('setMoviesList sets a new list of movies', () => {
      mutations.setMoviesList(state, newMoviesLsit)
      expect(state.movies.list.length).toEqual(3)
      expect(state.movies.list).toEqual(newMoviesLsit)
    })

    it('addToMoviesList concats new list of movies to previous one', () => {
      mutations.addToMoviesList(state, [
        { id: 4, title: 'movie 4' },
        { id: 5, title: 'movie 5' },
      ])
      expect(state.movies.list.length).toEqual(5)
      expect(state.movies.list).toEqual(
        newMoviesLsit.concat([
          { id: 4, title: 'movie 4' },
          { id: 5, title: 'movie 5' },
        ])
      )
    })

    it('nextPage change to next page', () => {
      mutations.nextPage(state)
      expect(state.movies.page).toEqual(2)
      mutations.nextPage(state)
      expect(state.movies.page).toEqual(3)
    })

    it('updateSearchQuery updates search query (infinite loop)', () => {
      mutations.updateSearchQuery(state, 'Search new text')
      expect(state.movies.searchQuery).toEqual('Search new text')
    })

    it('resetMovies clear the list', () => {
      mutations.resetMovies(state)
      expect(state.movies.list).toEqual([])
    })

    it('setMovie set movie for details', () => {
      mutations.setMovie(state, movie)
      expect(state.movie).toEqual(movie)
    })

    it('clearMovie removes movie', () => {
      mutations.clearMovie(state)
      expect(state.movie).toEqual({})
    })
  })
})
