<template>
  <div>
    <BContainer v-if="fetching" style="width: 3rem" class="text-center content">
      <BSpinner label="Spinning"></BSpinner>
    </BContainer>
    <BContainer class="text-center content">
      <main class="pt-1 pb-3">
        <PageTitle />
        <div class="actionsHeader d-flex">
          <div class="col-6">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb p-0 my-0 pb-1 bg-transparent mb-0">
                <BreadCrumbs />
              </ol>
            </nav>
          </div>
          <div class="col-6 text-right">
            <CartComponent />
          </div>
        </div>
        <div class="content col-12 mt-3">
          <nuxt />
        </div>
      </main>
    </BContainer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      errorMessage: 'errorMessage',
      isFetching: 'isFetching',
    }),
    fetching() {
      return this.isFetching
    },
    showError() {
      return this.errorMessage !== ''
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
