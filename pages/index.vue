<template>
  <VideoClubLayout>
    <template #pageTitle> Movie Categories </template>
    <template #default>
      <categories-list :categories="genresData.genres" />
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
      genresData: {},
    }
  },
  async fetch() {
    this.toggleUIFetching()
    this.genresData = await fetch(
      `${this.$config.baseUrl}/genre/movie/list?api_key=${this.$config.apiSecret}&language=en-US`
    )
      .then((res) => {
        this.toggleUIFetching()
        return res.json()
      })
      .catch((error) => {
        this.toggleUIFetching()
        this.setUIErrorMsg('Something went wrong! error:' + error)
      })
  },
  methods: {
    toggleUIFetching() {
      this.$store.dispatch('toggleFetchingAction')
    },
    setUIErrorMsg(msg) {
      this.$store.dispatch('setErrorMessageAction', msg)
    },
  },
}
</script>
