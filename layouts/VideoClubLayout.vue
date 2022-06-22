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
        <header>
          <div class="content col-10">
            <h1 class="pt-4 pb-2 m-0">
              <slot name="pageTitle"></slot>
            </h1>
            <nav aria-label="breadcrumb" class="py-2">
              <ol class="breadcrumb p-0 my-0 pb-1 bg-transparent mb-0">
                <slot name="breadcrumb"> </slot>
              </ol>
            </nav>
          </div>
        </header>
        <main class="pt-1 pb-3">
          <div class="content col-12">
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
export default {
  name: 'VideoClubLayout',
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
body {
  background-color: rgb(230, 220, 220);
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
