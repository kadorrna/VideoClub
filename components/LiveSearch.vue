<template>
  <div class="row justify-content-end">
    <div
      class="d-flex col-lg-4 col-md-6 col-sm-12 col-xs-12 justify-content-end"
    >
      <form class="searchForm" @submit.prevent="submitSearch">
        <BFormInput
          v-model="searchQuery"
          class="col-12"
          type="text"
          placeholder="Search a movie..."
          @keyup="submitSearch"
        ></BFormInput>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LiveSearch',
  data() {
    return {
      searchQuery: '',
    }
  },
  methods: {
    submitSearch() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        // your code
        this.$emit('search-by-title', { searchQuery: this.searchQuery })
      }, 300)
    },
    removeSearchQuery() {
      this.searchQuery = ''
    },
  },
}
</script>
