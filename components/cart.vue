<template>
  <div>
    <b-icon
      v-b-modal.modal-scoped
      icon="cart-fill"
      font-scale="2"
      :class="[areMoviesListed ? '' : 'text-muted']"
      :disabled="!areMoviesListed"
    />
    <b-modal id="modal-scoped" hide-footer>
      <div class="cartList">
        <h1>
          {{ values.length > 0 ? 'Movies added' : 'No movies added' }}
        </h1>
        <div v-if="values.length > 0">
          <div v-for="movie in values" :key="movie.id" class="d-flex my-4">
            <div class="col-10">{{ movie.title }}</div>
            <div class="col-2">
              <b-icon
                icon="eraser-fill"
                @click="removeFromSelected(movie.id)"
              />
            </div>
          </div>

          <b-button
            size="sm"
            class="addButton"
            :class="[areMoviesListed ? 'btn-danger' : 'btn-light']"
            :disabled="!areMoviesListed"
            @click="clearCart()"
          >
            Clear cart
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'CartPage',
  computed: {
    values() {
      return this.$store.state.selectedMovies
    },
    areMoviesListed() {
      return this.values.length > 0
    },
  },
  methods: {
    removeFromSelected(movieId) {
      this.$store.dispatch('removeFromSelectedMoviesAction', movieId)
    },
    clearCart() {
      this.$store.dispatch('clearSelectedMoviesAction')
    },
  },
}
</script>
