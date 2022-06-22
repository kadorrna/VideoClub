<template>
  <video-club-layout>
    <template #pageTitle>
      <h1>{{ genreName }}</h1>
    </template>
    <template #breadcrumb>
      <li class="breadcrumb-item active">
        <NuxtLink to="/"> home </NuxtLink>
      </li>
    </template>
    <template #default>
      <live-search @search-by-title="searchByTitle" />
      <movies-list :movies="movies" />
      <infinite-loading spinner="spiral" @infinite="infiniteScroll" />
    </template>
  </video-club-layout>
</template>

<script>
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
      movies: [],
      url: '',
      page: 1,
      searchUrl: '',
    }
  },
  async fetch() {
    await this.getMovies(
      `${this.$config.baseUrl}/discover/movie?api_key=${this.$config.apiSecret}&with_genres=${this.genreId}&language=en-US`
    )
  },
  mounted() {
    this.setStateSelectedCategory({ id: this.genreId, name: this.genreName })
  },
  methods: {
    setStateSelectedCategory(category) {
      this.$store.dispatch('setSelectedCategoryAction', category)
    },
    searchByTitle(payload) {
      let url
      if (payload.searchQuery === '') {
        url = `${this.$config.baseUrl}/discover/movie?api_key=${this.$config.apiSecret}&with_genres=${this.genreId}&language=en-US`
      } else {
        url = `${this.$config.baseUrl}/search/movie?api_key=${this.$config.apiSecret}&query=${payload.searchQuery}&language=en-US`
      }
      this.getMovies(url)
    },
    toggleUIFetching() {
      this.$store.dispatch('toggleFetchingAction')
    },
    setUIErrorMsg(msg) {
      this.$store.dispatch('setErrorMessageAction', msg)
    },
    async getMovies(url) {
      await this.$axios
        .$get(url)
        .catch((err) => {
          this.setUIErrorMsg(err)
        })
        .then((resp) => {
          this.movies = resp.results
          this.url = url + '&page=1'
        })
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.page++ // next page
        this.updateSearchPage(this.page)
        this.$axios
          .$get(this.url)
          .then((resp) => {
            if (resp && resp.results && resp.results.length > 1) {
              // check if any left
              resp.results.forEach((movie) => this.movies.push(movie)) // push it into the items array so we can display the data
              $state.loaded()
            } else {
              $state.complete()
            }
          })
          .catch((err) => {
            this.setUIErrorMsg(err)
          })
      }, 500)
    },
    updateSearchPage(page) {
      const oldPage = page - 1
      this.url = this.url.replace('&page=' + oldPage, '&page=' + page)
    },
  },
}
</script>
