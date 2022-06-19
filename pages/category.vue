<template>
<div>
  <h1>Category View</h1>
  <li v-for="(movie, index) in genreMovies.results" :key="index">
    <nuxt-link :to="`/item?id=${movie.id}`">
      {{ movie.title }}
    </nuxt-link>
  </li>
</div>
</template>



<script>
export default {
  name: 'CategoryPage',
  data() {
    return {
      genreMovies: {},
    }
  },
  async fetch() {
    this.genreMovies = await fetch(
      `${this.$config.baseUrl}/discover/movie?api_key=${this.$config.apiSecret}&with_genres=${this.$route.query.id}&language=en-US`
    ).then((res) => {
      return res.json()
    })
  },
}
</script>
