<template>
  <div>
    <BContainer v-if="fetching" style="width: 3rem" class="text-center content">
      <BSpinner label="Spinning"></BSpinner>
    </BContainer>
    <b-container v-else class="text-center content">
      <div v-if="showError">
        <b-alert
          variant="danger"
          dismissible
          fade
          :show="showError"
          @dismissed="clearErrorMsg()"
        >
          {{ errorMsg }}
        </b-alert>
        <img src="~/assets/techDiff.jpeg" />
      </div>
      <div v-else>
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
                    <cart />
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
      </div>
    </b-container>
  </div>
</template>
<script>
import Cart from '@/components/cart'
export default {
  name: 'VideoClubLayout',
  components: {
    Cart,
  },
  computed: {
    fetching() {
      return this.$store.state.fetching
    },
    showError() {
      return this.$store.state.errorMessage !== ''
    },
    errorMsg() {
      return this.$store.state.errorMessage
    },
  },
  methods: {
    clearErrorMsg() {
      this.$store.dispatch('setErrorMessageAction', '')
    },
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
