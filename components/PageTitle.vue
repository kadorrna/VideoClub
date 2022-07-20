<template>
  <h1 class="pt-4 pb-2 m-0">{{ title }}</h1>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageTitle',
  data() {
    return {
      title: 'Movie',
    }
  },
  computed: {
    ...mapGetters({
      selectedCategory: 'categories/selectedCategory',
      movie: 'movies/movie',
    }),
  },
  watch: {
    selectedCategory(newVal) {
      this.title = newVal.name === undefined ? 'Movie' : newVal.name
    },
    movie(newVal) {
      this.title = newVal.title
    },
  },
  methods: {
    getTitle() {
      console.log(
        '######',
        this.$nuxt.$route.name,
        this.selectedCategory.name,
        this.movie.title
      )
      if (this.$nuxt.$route.name === 'index') {
        return 'Movies'
      } else if (this.$nuxt.$route.name === 'category') {
        return this.selectedCategory.name
      }
      return this.movie.title
    },
  },
}
</script>
