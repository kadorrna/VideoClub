<template>
  <div>
    <BContainer v-if="fetching" style="width: 3rem" class="text-center content">
      <BSpinner label="Spinning"></BSpinner>
    </BContainer>
    <BContainer class="text-center content">
      <main class="pt-1 pb-3">
        <header>
          <div class="col-12">
            <h1 class="pt-4 pb-2 m-0">
              <slot name="pageTitle"></slot>
            </h1>
            <div class="actionsHeader d-flex">
              <div class="col-6">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb p-0 my-0 pb-1 bg-transparent mb-0">
                    <slot name="breadcrumb"> </slot>
                  </ol>
                </nav>
              </div>
              <div class="col-6 text-right">
                <slot name="cart" class="col-5 justify-content-end">
                  <CartComponent />
                </slot>
              </div>
            </div>
          </div>
        </header>
        <div class="content col-12 mt-3">
          <slot>
            <Nuxt />
          </slot>
        </div>
      </main>
    </BContainer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CartComponent from '~/components/CartComponent.vue'
export default {
  name: 'VideoClubLayout',
  components: {
    CartComponent,
  },
  data() {
    return {
      dismissCountDown: 5,
    }
  },
  computed: {
    ...mapGetters(['errorMessage', 'isFetching']),
    fetching() {
      return this.isFetching
    },
    showError() {
      return this.errorMessage !== ''
    },
  },
  mounted() {
    if (this.showError) {
      this.$nuxt.error(this.errorMessage)
    }
  },
}
</script>

<style>
html,
body {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
body {
  background-color: rgb(240, 240, 240);
}
.content {
  margin: 0 auto;
}

.card-body:hover {
  background-color: black;
  color: white;
  cursor: pointer;
  text-decoration: underline;
  transition: 0.5s;
}

@media only screen and (max-width: 600px) {
  h1 {
    line-height: 1;
    font-size: 2rem;
  }
  .content {
    padding: 0 3%;
  }
}
</style>
