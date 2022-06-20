<template>
  <div>
    <h1>{{ categoryName }}</h1>
    <movies-list :genre-id="genreId" />
  </div>
</template>

<script>
import MoviesList from '~/components/MoviesList.vue'
export default {
  name: 'CategoryPage',
  components: { MoviesList },
  data() {
    return {
      genreMovies: {},
      categoryName: this.$route.query.categoryName,
      genreId: this.$route.query.id,
    }
  },
}
</script>
