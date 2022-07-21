<template>
  <div>
    <BIcon
      v-b-modal.modal-scoped
      icon="cart-fill"
      font-scale="2"
      :class="[areMoviesListed ? '' : 'text-muted']"
      :disabled="!areMoviesListed"
      data-icon-modal-button
    />
    <BModal id="modal-scoped" hide-footer :static="true">
      <div class="cartList text-left">
        <h1>
          {{ selectedMovies.length > 0 ? 'Movies added' : 'No movies added' }}
        </h1>
        <div v-if="selectedMovies.length > 0">
          <div
            v-for="movie in selectedMovies"
            :key="movie.id"
            class="d-flex my-4"
          >
            <div class="col-10 pl-0" data-movie-title>{{ movie.title }}</div>
            <div class="col-2">
              <BIcon
                icon="trash-fill"
                @click="removeFromSelected(movie.id, movie.title)"
              />
            </div>
          </div>

          <BButton
            size="sm"
            class="addButton"
            :class="[areMoviesListed ? 'btn-danger' : 'btn-light']"
            :disabled="!areMoviesListed"
            @click="clearCart()"
          >
            Clear cart
          </BButton>
        </div>
      </div>
    </BModal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CartComponent',
  computed: {
    ...mapGetters({
      selectedMovies: 'cart/selectedMovies',
    }),
    areMoviesListed() {
      return this.selectedMovies.length > 0
    },
  },
  beforeMount() {
    if (
      this.selectedMovies.length === 0 &&
      localStorage.getItem('vuexMovies') !== null
    ) {
      const persistedSelectedMovies = JSON.parse(
        localStorage.getItem('vuexMovies')
      ).persistedData.selectedMovies
      this.loadSelectedMoviesFromStorage(persistedSelectedMovies || [])
    }
  },
  methods: {
    ...mapActions({
      clearSelectedMoviesAction: 'cart/clearSelectedMoviesAction',
      removeFromSelectedMoviesAction: 'cart/removeFromSelectedMoviesAction',
      loadSelectedMoviesFromStorage: 'cart/loadSelectedMoviesFromStorage',
    }),
    removeFromSelected(movieId, movieTitle) {
      this.removeFromSelectedMoviesAction(movieId)
      this.toastMsg(movieTitle + ' has been removed from selected')
    },
    clearCart() {
      this.clearSelectedMoviesAction()
      this.toastMsg('Selected movies cleared')
    },
    toastMsg(title) {
      this.$bvToast.toast('Movies cleared', {
        title,
        variant: 'success',
        solid: true,
        toaster: 'b-toaster-bottom-center',
      })
    },
  },
}
</script>
