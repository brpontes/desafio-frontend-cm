<template>
  <div class="pagination">
    <ul>
      <li v-for="(page, index) in totalPages" :key="index" :class="parseInt(active_page) === parseInt(page) ? `active` : ''" @click="redirect(page)">
        {{page}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ProductPagination",
  computed: {
    ...mapState({
      pagination: state => state.pagination,
      active_page: state => state.active_page
    }),
    totalPages() {
      return Math.ceil(this.pagination.total / this.pagination.limit);
    }
  },
  methods: {
    ...mapActions(['set_active_page', 'set_products']),
    redirect(page) {
      this.set_active_page(page);
      this.set_products(page);
    }
  },
  mounted() {
    const page = this.$route.params.page || "1";
    this.set_active_page(page);
  }
}
</script>

<style lang="sass" scoped>
  .pagination
    max-width: $container-width
    margin: 30px auto
    ul
      display: flex
      justify-content: center
      list-style-type: none
      li
        cursor: pointer
        margin: 0 20px
        background: $bg-secondary
        border: 1px solid $bg-primary
        color: $bg-primary
        padding: 10px
        text-align: center
        width: 30px
        border-radius: 5px
        &:hover
          background-color: $bg-tertiary
          border: 1px solid $bg-tertiary
          color: $bg-secondary
      .active
        background: $bg-primary
        color: $bg-secondary
        
</style>