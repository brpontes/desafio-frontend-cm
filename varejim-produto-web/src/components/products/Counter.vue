<template>
  <p v-if="products.length > 0">Mostrando {{products.length}} de {{pagination.total}} produtos</p>
</template>

<script>
export default {
  name: 'ProductCounter',
  props: {
    products: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="sass" scoped>
  p
    width: 100%
    text-align: left
    margin: 20px 0 30px 0
    font-weight: bold
</style>