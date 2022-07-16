<template>
  <video-club-layout>
    <template #pageTitle>
      <h1>{{ genreName }}</h1>
    </template>
    <template #breadcrumb>
      <BBreadcrumb>
        <BBreadcrumbItem to="/">
          <BIcon
            icon="house-fill"
            scale="1.25"
            shift-v="1.25"
            aria-hidden="true"
          ></BIcon>
          Home
        </BBreadcrumbItem>
      </BBreadcrumb>
    </template>
    <template #default>
      <live-search @search-by-title="searchByTitle" />
      <movies-list :movies="movies" />
      <infinite-loading spinner="spiral" @infinite="infiniteScroll" />
    </template>
  </video-club-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LiveSearch from '~/components/LiveSearch.vue'
import MoviesList from '~/components/MoviesList.vue'
import VideoClubLayout from '~/layouts/VideoClubLayout.vue'

export default {
  name: 'CategoryPage',
  components: { MoviesList, VideoClubLayout, LiveSearch },
  data() {
    return {
      genreName: this.$route.query.categoryName,
      genreId: this.$route.query.id + '',
    }
  },
  computed: {
    ...mapGetters(['movies']),
  },
  beforeMount() {
    this.resetMoviesAction()
    this.setStateSelectedCategory({ id: this.genreId, name: this.genreName })
    this.getMoviesAction()
  },
  methods: {
    ...mapActions([
      'getMoviesAction',
      'searchByTitleAction',
      'resetMoviesAction',
    ]),
    setStateSelectedCategory(category) {
      this.$store.dispatch('setSelectedCategoryAction', category)
    },
    searchByTitle(payload) {
      if (payload.searchQuery !== '') {
        this.searchByTitleAction(payload)
      } else {
        this.resetMoviesAction()
        this.getMoviesAction()
      }
    },
    toggleUIFetching() {
      this.$store.dispatch('toggleFetchingAction')
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.getMoviesAction(this.genreId)
        $state.loaded()
      }, 500)
    },
    updateSearchPage(page) {
      const oldPage = page - 1
      this.url = this.url.replace('&page=' + oldPage, '&page=' + page)
    },
  },
}
</script>
