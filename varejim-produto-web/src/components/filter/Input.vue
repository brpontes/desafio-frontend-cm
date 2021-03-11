<template>
  <input
    class="filter"
    v-model="filter"
    type="text"
    placeholder="Digite aqui o código ou a descrição do produto"
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
    ...mapActions(["set_products", "get_filtered_products"]),
    filterByProductCod() {
      if (this.filter === "") {
        this.set_products();
        return;
      }
      this.get_filtered_products(this.filter);
    }
  }
};
</script>

<style lang="sass" scoped>
  .filter
    width: 100%
    box-sizing: border-box;
    padding: 10px
    height: 50px
    background: darken($bg-secondary, 10%)
    border: 1px solid #ccc
    border-radius: $border-radius
    margin: 10px 0
    outline: none
</style>