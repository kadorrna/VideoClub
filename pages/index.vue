<template>
  <VideoClubLayout>
    <template #pageTitle> Movie Categories </template>
    <template #default>
      <categories-list :categories="categories" />
    </template>
  </VideoClubLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CategoriesList from '~/components/CategoriesList.vue'
import VideoClubLayout from '~/layouts/VideoClubLayout.vue'

export default {
  name: 'IndexPage',
  components: {
    CategoriesList,
    VideoClubLayout,
  },
  layout: 'BaseLayout',
  async fetch() {
    await this.getCategoriesAction()
  },
  computed: {
    ...mapGetters(['categories']),
  },
  methods: {
    ...mapActions(['getCategoriesAction']),
  },
}
</script>
