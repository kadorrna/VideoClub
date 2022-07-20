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
      if (this.$nuxt.$route.name === 'index') {
        return 'Movies'
      } else if (this.$nuxt.$route.name === 'category') {
        return this.selectedCategory.name
      }
      return this.movie.title
    },
  },
  // watch: {
  //   selectedCategory(newVal) {
  //     this.title = newVal.name === undefined ? 'Movie' : newVal.name
  //   },
  //   movie(newVal) {
  //     this.title = newVal.title
  //   },
  // },
}
</script>
