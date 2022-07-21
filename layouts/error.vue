<template>
  <BContainer class="text-center content">
    <div class="danger">
      <h1 class="text-danger">{{ error.message }}</h1>
    </div>
    <img src="~/assets/techDiff.jpeg" />
  </BContainer>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
