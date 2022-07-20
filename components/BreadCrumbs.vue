<template>
  <b-breadcrumb
    v-if="selectedCategory.id"
    :items="getCrumbsItems"
  ></b-breadcrumb>
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
      this.setSelectedCategoryIfNeeded(localStorage)
      if (this.$nuxt.$route.name === 'index') {
        return [{ text: 'Home', active: true }]
      }
      if (this.$nuxt.$route.name === 'category') {
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
    },
  },
  methods: {
    ...mapActions({
      setSelectedCategoryAction: 'categories/setSelectedCategoryAction',
    }),
    setSelectedCategoryIfNeeded(localStorage) {
      if (!this.selectedCategory.id && this.$nuxt.$route.name !== 'index') {
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
