<template>
      <BContainer>
        <BRow
          v-if="movie && movie.poster_path"
          class="itemDetailContainer d-flex row mt-5"
        >
          <BCol lg="6" xs="12" md="12" sm="12" class="poster-container">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" data-movie-poster />
          </BCol>
          <BCol lg="6" xs="12" md="12" sm="12" class="text-left">
            <div class="col-12">{{ movie.release_date }} <br /></div>
            <div class="col-12">
              {{ movie.vote_average }} from ({{ movie.vote_count }} votes)
            </div>
            <div
              class="col-12"
              :class="[movie && movie.status ? movie.status.toLowerCase() : '']"
            >
              {{ movie.status }}
              <BIcon :icon="`${getIcon}`" font-scale="1" />
            </div>
            <div class="col-12 overview">
              {{ movie.overview }}
            </div>
            <div class="col-12 d-flex mt-3">
              <a
                :href="`https://www.imdb.com/title/${movie.imdb_id}`"
                class="imdbImg"
              >
                <img src="~/assets/imdb-icon.png" style="width: 32px" />
              </a>
              <BIcon
                icon="plus-circle-fill"
                font-scale="2"
                class="addMovieIcon ml-2"
                :class="[isSelected ? 'text-muted' : '']"
                :disabled="isSelected"
                @click="addToCart(movie.id, movie.title)"
              />
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </template>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const icon = {
  Released: 'star-fill',
  Rumored: 'bell-fill',
  Planned: 'lightbulb-fill',
  InProduction: 'camera-reels-fill',
  PostProduction: 'camera-reels-fill',
  Canceled: 'x-circle-fill',
}

export default {
  name: 'MoviePage',
  async fetch() {
    await this.getMoviedetails()
  },
  computed: {
    ...mapGetters({
      movie: 'movies/movie',
      selectedCategory: 'categories/selectedCategory',
      selectedMovies: 'cart/selectedMovies',
    }),
    getIcon() {
      if (this && this.movie && this.movie.status)
        return icon[this.movie.status.trim()]
      return ''
    },
    isSelected() {
      if (this.movie && this.movie.id) {
        return this.selectedMovies.some(
          (element) => element.id === this.movie.id
        )
      }
      return ''
    },
  },
  beforeMount() {
    if(!this.movie.id){
      this.getMoviedetails()
    }
  },
  beforeDestroy() {
    this.clearMovieDetailsAction()
    this.resetMoviesAction() 
  },
  methods: {
    ...mapActions({
      getMovieDetailsAction: 'movies/getMovieDetailsAction',
      addToSelectedMoviesAction: 'cart/addToSelectedMoviesAction',
      clearMovieDetailsAction: 'movies/clearMovieDetailsAction',
      setMovieDetailsAction: 'movies/setMovieDetailsAction',
      resetMoviesAction: 'movies/resetMoviesAction',
    }),
    async getMoviedetails() {
      await this.getMovieDetailsAction(this.$route.query.id)
    },
    addToCart(movieId, movieTitle) {
      if (!this.isSelected) {
        this.addToSelectedMoviesAction({
          id: movieId,
          title: movieTitle,
        })
        this.toastMsg(movieTitle + ' added correctly', 'success')
      }
    },
    toastMsg(title, variant) {
      this.$bvToast.toast('Movie Added', {
        title,
        variant,
        solid: true,
        toaster: 'b-toaster-bottom-center',
      })
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
  color: rgb(205, 205, 28);
}

.overview {
  font-style: italic;
}

.addMovieIcon,
.imdbImg {
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
}
.addMovieIcon:hover:not([disabled]),
.imdbImg:hover:not([disabled]) {
  cursor: pointer;
}
@media only screen and (max-width: 600px) {
  .poster-container img {
    width: 80%;
  }
}
</style>
