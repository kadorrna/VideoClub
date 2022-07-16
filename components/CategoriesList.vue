<template>
  <div class="text-center row">
    <div
      v-for="(category, index) in categories"
      :key="index"
      class="card-container col-lg-3 col-md-6 col-sm-12 col-xs-12 my-1 d-flex align-items-stretch"
    >
      <BCard
        overlay
        class="category-card"
        :title="category.name"
        @click="goToCategory(category.id, category.name)"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'CategoriesList',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToCategory(categoryId, categoryName) {
      return this.$router.push({
        name: 'category',
        query: { id: categoryId, categoryName },
      })
    },
  },
}
</script>
<style scoped>
.card-container {
  padding: 0;
  vertical-align: center;
}
.card-container div {
  width: 100%;
  height: 250px;
}

.category-card .card-body {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 600px) {
  .card-container {
    width: 100%;
    height: 80px;
  }
  .card-container div {
    height: 100%;
  }
  .card-container .card-body {
    width: 100%;
  }
}
</style>
