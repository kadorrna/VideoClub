<template>
  <div>
    <BIcon
      v-b-modal.modal-scoped
      icon="cart-fill"
      font-scale="2"
      :class="[areMoviesListed ? '' : 'text-muted']"
      :disabled="!areMoviesListed"
    />
    <BModal id="modal-scoped" hide-footer>
      <div class="cartList">
        <h1>
          {{ values.length > 0 ? 'Movies added' : 'No movies added' }}
        </h1>
        <div v-if="values.length > 0">
          <div v-for="movie in values" :key="movie.id" class="d-flex my-4">
            <div class="col-10">{{ movie.title }}</div>
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
import { mapActions } from 'vuex'
export default {
  name: 'CartComponent',
  computed: {
    values() {
      return this.$store.state.selectedMovies
    },
    areMoviesListed() {
      return this.values.length > 0
    },
  },
  methods: {
    ...mapActions([
      'clearSelectedMoviesAction',
      'removeFromSelectedMoviesAction',
    ]),
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
