<template>
  <VideoClubLayout>
    <template #pageTitle> Movie Categories </template>
    <template #default>
      <categories-list :categories="genres" />
    </template>
  </VideoClubLayout>
</template>

<script>
import CategoriesList from '~/components/CategoriesList.vue'
import VideoClubLayout from '~/layouts/VideoClubLayout.vue'

export default {
  name: 'IndexPage',
  components: {
    CategoriesList,
    VideoClubLayout,
  },
  layout: 'BaseLayout',
  data() {
    return {
      genres: [],
    }
  },
  async fetch() {
    await this.getGenres()
  },
  methods: {
    async getGenres() {
      this.toggleUIFetching()
      await this.$axios
        .$get(
          `${this.$config.baseUrl}/genre/movie/list?api_key=${this.$config.apiSecret}&language=en-US`
        )
        .then((resp) => {
          this.toggleUIFetching()
          this.genres = resp.genres
        })
        .catch((error) => {
          this.toggleUIFetching()
          this.setUIErrorMsg('Something went wrong: ' + error)
        })
    },
    toggleUIFetching() {
      this.$store.dispatch('toggleFetchingAction')
    },
    setUIErrorMsg(msg) {
      this.$store.dispatch('toggleFetchingAction', msg)
    },
  },
}
</script>
