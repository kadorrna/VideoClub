<template>
  <div class="col-12 list-container p-0">
    <div
      v-for="(movie, index) in movies"
      :key="index"
      class="col-12 col-sm-12 my-2 p-0"
    >
      <B-card :title="movie.title" @click="goToItem(movie.id)" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MoviesLiest',
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      page: 1,
    }
  },
  computed: {
    url() {
      return `${this.searchUrl}&page=${this.page}`
    },
  },
  methods: {
    goToItem(movieId) {
      return this.$router.push({
        name: 'item',
        query: { id: movieId },
      })
    },
  },
}
</script>
<style scoped>
.list-container {
  height: 90%;
}
@media only screen and (max-width: 600px) {
  .card-container {
    width: 100%;
    height: 80px;
  }
  .card-container div {
    height: 100%;
  }
  .card-container .card-body {
    width: 100%;
  }
}
</style>
