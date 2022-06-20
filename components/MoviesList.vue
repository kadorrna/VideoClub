<template>
  <div class="col-8 center row list-container">
    <div
      v-for="(movie, index) in movies"
      :key="index"
      class="col-10 col-sm-6 tile"
    >
      <nuxt-link :to="`/item?id=${movie.id}`">
        {{ movie.title }}
      </nuxt-link>
    </div>
    <infinite-loading spinner="spiral" @infinite="infiniteScroll" />
  </div>
</template>
<script>
export default {
  name: 'MoviesLiest',
  props: {
    genreId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      movies: [],
      page: 1,
    }
  },
  computed: {
    url() {
      return `${this.$config.baseUrl}/discover/movie?api_key=${this.$config.apiSecret}&with_genres=${this.genreId}&language=en-US&page=${this.page}`
    },
  },
  created() {
    this.getMovies()
  },
  methods: {
    async getMovies() {
      const resp = await this.$axios.$get(this.url)
      this.movies = resp.results
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.page++ // next page
        this.$axios
          .$get(this.url)
          .then((resp) => {
            if (resp.results.length > 1) {
              // check if any left
              resp.results.forEach((movie) => this.movies.push(movie)) // push it into the items array so we can display the data
              $state.loaded()
            } else {
              $state.complete()
            }
          })
          .catch((err) => {
            /* eslint-disable no-console */
            console.log(err)
            /* eslint-enable no-console */
          })
      }, 500)
    },
  },
}
</script>
<style scoped>
.list-container {
  height: 100px;
}
.tile {
  border: dotted gray;
  padding: 0;
  margin: 1px;
}
</style>
