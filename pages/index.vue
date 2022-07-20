<template>
  <categories-list :categories="categories" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CategoriesList from '~/components/CategoriesList.vue'

export default {
  name: 'IndexPage',
  components: {
    CategoriesList,
  },
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
