<template>
  <div class="col-8 center">
    <li v-for="(categorie, index) in categories" :key="index">
      <nuxt-link
        :to="`/category?id=${categorie.id}&categoryName=${categorie.name}`"
      >
        {{ categorie.name }}
      </nuxt-link>
    </li>
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
}
</script>
