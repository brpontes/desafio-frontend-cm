<template>
  <div class="container">
    <Sections :sections="sections" />
    <FilterInput />
    <ProductCounter :products="get_products" />
    <ProductTable :products="get_products" :sections="sections" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Sections from "@/components/sections/Index";
import FilterInput from "@/components/filter/Input";
import ProductCounter from "@/components/products/Counter";
import ProductTable from "@/components/products/Table";

export default {
  name: "Home",
  components: {
    Sections,
    FilterInput,
    ProductCounter,
    ProductTable
  },
  computed: {
    ...mapGetters(['get_products']),
    ...mapState({
      sections: state => state.sections
    })
  },
  methods: {
    ...mapActions(['set_products'])
  },
  mounted() {
    const page = this.$route.params.page || "1"
    this.set_products(page)
  }
};
</script>
