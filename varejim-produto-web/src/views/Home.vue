<template>
  <div class="container">
    <Sections :sections="sections" :filter="filterBySectionCod" />
    <input
      class="filter"
      v-model="filter"
      type="text"
      placeholder="Digite aqui o código do produto"
      @keyup="filterByProductCod" />
    <ProductCounter :products="get_products" :pagination="pagination" />
    <ProductTable :products="get_products" :sections="sections" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Sections from "@/components/sections/Index";
import ProductCounter from "@/components/products/Counter";
import ProductTable from "@/components/products/Table";

export default {
  name: "Home",
  data () {
    return {
      filter: ''
    }
  },
  components: {
    Sections,
    ProductCounter,
    ProductTable
  },
  computed: {
    ...mapGetters(['get_products']),
    ...mapState({
      pagination: state => state.pagination,
      sections: state => state.sections,
    })
  },
  methods: {
    ...mapActions(['set_filter', 'set_filter_section']),
    filterByProductCod () {
      this.set_filter(this.filter)
    },
    filterBySectionCod (filter_section) {
      this.set_filter_section(filter_section)
    }
  }
};
</script>

<style lang="sass">
  .container
    width: 992px
    margin: 0 auto
    font-family: 'Oxygen', sans-serif
  
  .filter
    width: 100%
    padding: 10px
    height: 30px
    background: #f3f4f5
    border: 1px solid #ccc
    border-radius: 5px
    margin: 10px 0
    outline: none
</style>
