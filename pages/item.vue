<template>
  <div>
    <h1>Item View</h1>
    {{movie}}
  </div>
</template>

<script>
export default {
  name: 'ItemPage',
  data() {
    return {
      movie: {},
    }
  },
  async fetch() {
    this.movie = await fetch(
      `${this.$config.baseUrl}/movie/${this.$route.query.id}?api_key=${this.$config.apiSecret}&&language=en-US`
    ).then((res) => {
      return res.json()
    })
  },
}
</script>
