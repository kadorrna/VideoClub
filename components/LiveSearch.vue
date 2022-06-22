<template>
  <div class="row justify-content-end">
    <div class="d-flex col-4 justify-content-end">
      <form class="searchForm" @submit.prevent="submitSearch">
        <b-form-input
          v-model="searchQuery"
          class="col-10"
          type="text"
          placeholder="Search a movie..."
          @keyup="submitSearch"
        ></b-form-input>
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
      this.$emit('search-by-title', { searchQuery: this.searchQuery })
    },
    removeSearchQuery() {
      this.searchQuery = ''
    },
  },
}
</script>
