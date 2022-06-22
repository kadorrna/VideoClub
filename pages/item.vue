<template>
  <video-club-layout>
    <template #pageTitle> {{ movie.title }} </template>
    <template #breadcrumb>
      <li class="breadcrumb-item active">
        <NuxtLink to="/"> home </NuxtLink>
        /
        <NuxtLink
          :to="`/category?id=${selectedCategory.id}&categoryName=${selectedCategory.name}`"
        >
          category
        </NuxtLink>
      </li>
    </template>
    <template #default>
      <div class="itemDetailContainer d-flex row">
        <b-col lg="6" xs="12" md="12" sm="12" class="poster-container">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" />
        </b-col>
        <b-col lg="6" xs="12" md="12" sm="12" class="text-left">
          <div class="col-12">{{ movie.release_date }} <br /></div>
          <div class="col-12">
            {{ movie.vote_average }} from ({{ movie.vote_count }} votes)
          </div>
          <div
            class="col-12"
            :class="[movie && movie.status ? movie.status.toLowerCase() : '']"
          >
            {{ movie.status }}
            <b-icon :icon="`${getIcon}`" font-scale="1" />
          </div>
          <b-col class="overview">
            {{ movie.overview }}
          </b-col>
          <div class="col-12">
            <a :href="`https://www.imdb.com/title/${movie.imdb_id}`">
              <img src="~/assets/imdb-icon.png" style="width: 32px" />
            </a>
          </div>
        </b-col>
      </div>
    </template>
  </video-club-layout>
</template>

<script>
import VideoClubLayout from '~/layouts/VideoClubLayout.vue'

const icon = {
  Released: 'star-fill',
  Rumored: 'bell-fill',
  Planned: 'lightbulb-fill',
  InProduction: 'camera-reels-fill',
  PostProduction: 'camera-reels-fill',
  Canceled: 'x-circle-fill',
}

export default {
  name: 'ItemPage',
  components: { VideoClubLayout },
  data() {
    return {
      movie: {},
    }
  },
  async fetch() {
    this.toggleUIFetching()
    this.movie = await fetch(
      `${this.$config.baseUrl}/movie/${this.$route.query.id}?api_key=${this.$config.apiSecret}&&language=en-US`
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
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory
    },
    getIcon() {
      if (this && this.movie && this.movie.status)
        return icon[this.movie.status.trim()]
      return ''
    },
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
<style scoped>
.released {
  color: green;
}
.postproduction {
  color: rgb(76, 205, 76);
}
.canceled {
  color: red;
}
.rumored,
.inproduction,
.planned {
  color: yellow;
}

.overview {
  font-style: italic;
}
@media only screen and (max-width: 600px) {
  .poster-container img {
    width: 80%;
  }
}
</style>
