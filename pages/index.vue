<template>
  <CategoriesList :categories="categories" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  async fetch() {
    await this.getCategoriesAction()
  },
  computed: {
    ...mapGetters({
      categories: 'categories/categories',
    }),
  },
  methods: {
    ...mapActions({
      getCategoriesAction: 'categories/getCategoriesAction',
    }),
  },
}
</script>
