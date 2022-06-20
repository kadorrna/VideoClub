<template>
  <div>
    <p v-if="$fetchState.pending">Fetching mountains...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <h1>Movies Categories</h1>
      <ul>
        <categories-list :categories="genresData.genres" />
      </ul>
      <button @click="$fetch">Refresh</button>
    </div>
  </div>
</template>

<script>
import CategoriesList from '~/components/CategoriesList.vue'

export default {
  name: 'IndexPage',
  components: { CategoriesList },
  data() {
    return {
      genresData: {},
    }
  },
  async fetch() {
    this.genresData = await fetch(
      `${this.$config.baseUrl}/genre/movie/list?api_key=${this.$config.apiSecret}&language=en-US`
    ).then((res) => {
      return res.json()
    })
  },
}
</script>
