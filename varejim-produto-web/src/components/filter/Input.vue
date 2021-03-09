<template>
  <input
    class="filter"
    v-model="filter"
    type="text"
    placeholder="Digite aqui o código do produto"
    @keyup="filterByProductCod"
  />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FilterInput",
  data() {
    return {
      filter: ""
    };
  },
  methods: {
    ...mapActions(["set_filter"]),
    filterByProductCod() {
      this.set_filter(this.filter);
    }
  }
};
</script>

<style lang="sass" scoped>
  .filter
    width: 100%
    padding: 10px
    height: 50px
    background: darken($bg-secondary, 10%)
    border: 1px solid #ccc
    border-radius: $border-radius
    margin: 10px 0
    outline: none
</style>