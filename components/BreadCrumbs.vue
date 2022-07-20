<template>
  <b-breadcrumb :items="items"></b-breadcrumb>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BreadCrumbs',
  data() {
    return {
      items: this.getCrumbs(),
    }
  },
  computed: {
    ...mapGetters({
      selectedCategory: 'categories/selectedCategory',
    }),
  },
  watch: {
    '$route.params'() {
      this.items = this.getCrumbs()
    },
  },
  methods: {
    getCrumbs() {
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
}
</script>
