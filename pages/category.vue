<template>
  <video-club-layout>
    <template #pageTitle>
      <h1>{{ genreName }}</h1>
    </template>
    <template #breadcrumb>
      <li class="breadcrumb-item active">
        <NuxtLink to="/"> home </NuxtLink>
      </li>
    </template>
    <template #default>
      <movies-list :genre-id="genreId" />
    </template>
  </video-club-layout>
</template>

<script>
import MoviesList from '~/components/MoviesList.vue'
import VideoClubLayout from '~/layouts/VideoClubLayout.vue'

export default {
  name: 'CategoryPage',
  components: { MoviesList, VideoClubLayout },
  data() {
    return {
      genreMovies: {},
      genreName: this.$route.query.categoryName,
      genreId: this.$route.query.id + '',
    }
  },
  mounted() {
    this.setStateSelectedCategory({ id: this.genreId, name: this.genreName })
  },
  methods: {
    setStateSelectedCategory(category) {
      this.$store.dispatch('setSelectedCategoryAction', category)
    },
  },
}
</script>
