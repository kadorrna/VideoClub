<template>
  <BContainer class="text-center content">
    <div class="danger">
      <h1 class="text-danger">{{ errorMessage }}</h1>
    </div>
    <img src="~/assets/techDiff.jpeg" />
  </BContainer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['errorMessage']),
    errorMessage() {
      return this.errorMessage
    },
  },
}
</script>
