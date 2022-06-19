<template>
  <div>
    <p v-if="$fetchState.pending">Fetching mountains...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <h1>Nuxt Genres</h1>
      <ul>
        <li v-for="(genre, index) in genresData.genres" :key="index">
          <nuxt-link :to="`/category?id=${genre.id}`">
            {{ genre.name }}
          </nuxt-link>
        </li>
      </ul>
      <button @click="$fetch">Refresh</button>
    </div>
  </div>
</template>


<script>

export default {
  name: 'IndexPage',
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
