<template>
  <input class="filter" v-model="filter" type="text" placeholder="Digite aqui o código do produto" />
</template>

<script>
export default {
  name: 'FilterInput',
  props: {
    filter: {
      type: String,
      default: ''
    }
  }
}
</script>