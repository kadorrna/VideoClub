<template>
  <h1 class="pt-4 pb-2 m-0">{{ getTitle }}</h1>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageTitle',
  computed: {
    ...mapGetters({
      selectedCategory: 'categories/selectedCategory',
      movie: 'movies/movie',
    }),
    getTitle() {
      if (this.$route.name === 'index') {
        return 'Movies'
      } else if (this.$route.name === 'category') {
        return this.selectedCategory.name
      }
      return this.movie.title
    },
  },
}
</script>
