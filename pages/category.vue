<template>
  <div>
    <LiveSearch @search-by-title="searchByTitle" />
    <MoviesList :movies="movies" />
    <infinite-loading
      spinner="spiral"
      force-use-infinite-wrapper
      @infinite="infiniteScroll"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CategoryPage',
  layout: 'default',
  data() {
    return {
      genreName: this.$route.query.categoryName,
      genreId: this.$route.query.id + '',
    }
  },
  computed: {
    ...mapGetters({
      movies: 'movies/movies',
      selectedCategory: 'categories/selectedCategory',
    }),
  },
  beforeMount() {
    if (
      this.genreName === 'undefined' &&
      this.genreId === 'undefined' &&
      localStorage.getItem('vuexMovies') !== null
    ) {
      const persistedSelectedCategory = JSON.parse(
        localStorage.getItem('vuexMovies')
      ).persistedData.selectedCategory
      this.genreId = persistedSelectedCategory.id
      this.genreName = persistedSelectedCategory.name
    }

    this.getMoviesAction(this.genreId)
    this.resetMoviesAction()
    this.setStateSelectedCategory({ id: this.genreId, name: this.genreName })
  },
  beforeDestroy() {
    this.clearSelectedCategory()
  },
  methods: {
    ...mapActions({
      getMoviesAction: 'movies/getMoviesAction',
      searchByTitleAction: 'movies/searchByTitleAction',
      resetMoviesAction: 'movies/resetMoviesAction',
      setSelectedCategoryAction: 'categories/setSelectedCategoryAction',
      clearSelectedCategory: 'categories/clearSelectedCategoryAction',
    }),
    setStateSelectedCategory(category) {
      this.setSelectedCategoryAction(category)
    },
    searchByTitle(payload) {
      if (payload.searchQuery !== '') {
        this.searchByTitleAction(payload)
      } else {
        this.resetMoviesAction()
        this.getMoviesAction(this.genreId)
      }
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.getMoviesAction(this.genreId)
        $state.loaded()
      }, 500)
    },
  },
}
</script>
