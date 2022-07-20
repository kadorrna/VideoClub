<template>
  <div>
    <live-search @search-by-title="searchByTitle" />
    <movies-list :movies="movies" />
    <infinite-loading
      spinner="spiral"
      force-use-infinite-wrapper
      @infinite="infiniteScroll"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MoviesList from '~/components/MoviesList.vue'
import LiveSearch from '~/components/LiveSearch.vue'

export default {
  name: 'CategoryPage',
  components: {
    MoviesList,
    LiveSearch,
  },
  layout: 'default',
  data() {
    return {
      genreName: this.$route.query.categoryName,
      genreId: this.$route.query.id + '',
    }
  },
  computed: {
    ...mapGetters({ movies: 'movies/movies' }),
  },
  beforeMount() {
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
