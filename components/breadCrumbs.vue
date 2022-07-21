<template>
  <b-breadcrumb :items="getCrumbsItems"></b-breadcrumb>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BreadCrumbs',
  computed: {
    ...mapGetters({
      selectedCategory: 'categories/selectedCategory',
    }),
    getCrumbsItems() {
      if (process.client) {
        this.setSelectedCategoryIfNeeded(localStorage)
      }
      if (this.$route.name === 'index') {
        return [{ text: 'Home', active: true }]
      }
      if (this.$route.name === 'category') {
        return [
          { text: 'Home', to: '/' },
          { text: 'Category', active: true },
        ]
      }
      return [
        { text: 'Home', to: '/' },
        {
          text: 'Category',
          to: `/category?id=${this.selectedCategory.id}&categoryName=${this.selectedCategory.name}`,
        },
        { text: 'Movie', active: true },
      ]
      // }
    },
  },
  methods: {
    ...mapActions({
      setSelectedCategoryAction: 'categories/setSelectedCategoryAction',
    }),
    setSelectedCategoryIfNeeded(localStorage) {
      if (
        !this.selectedCategory.id &&
        this.$route.name !== 'index' &&
        localStorage.getItem('vuexMovies') !== null
      ) {
        const persistedSelectedCategory = JSON.parse(
          localStorage.getItem('vuexMovies')
        ).persistedData.selectedCategory
        this.setSelectedCategoryAction({
          id: persistedSelectedCategory.id,
          name: persistedSelectedCategory.name,
        })
      }
    },
  },
}
</script>
