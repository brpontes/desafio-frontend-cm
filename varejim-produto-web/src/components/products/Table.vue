<template>
  <section>
    <div v-if="products.length === 0" class="empty-table">
      <eva-icon name="alert-triangle"></eva-icon>
      <span>Nenhum produto encontrado!</span>
    </div>
    <table v-else class="table">
      <thead align="left">
        <tr>
          <th>Cód.</th>
          <th>Descrição</th>
          <th>Seção</th>
          <th align="center">Ações</th>
        </tr>
      </thead>
      <tbody align="left">
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.descricao }}</td>
          <td>{{ sectionDescriptionById(product.secao_id) }}</td>
          <td align="center" class="actions-cell">
            <router-link :to="`/product/${product.id}/edit`">
              <button type="button">
                  <eva-icon name="edit" title="Editar Produto"></eva-icon>
              </button>
            </router-link>
            <button type="button" @click="promptRemoveProduct(product.id)">
              <eva-icon name="trash-2" title="Remover Produto"></eva-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ProductPagination />
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ProductPagination from "@/components/products/Pagination"

export default {
  name: "ProductTable",
  components: {
    ProductPagination
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    sections: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      pagination: state => state.pagination
    })
  },
  methods: {
    ...mapActions(['delete_product']),
    sectionDescriptionById(section_id) {
      return this.sections.length > 0
        ? this.sections.find(section => section.id === section_id).descricao
        : '-';
    },
    promptRemoveProduct(id) {
      this.$swal({
        title: "Deseja remover este produto?",
        icon: "warning",
        buttons: {
          remove: 'Ok',
          cancel: 'Cancelar'
        }
      })
        .then(async isConfirmed => {
          if (isConfirmed) {
            await this.delete_product(id);
            this.$swal("Produto removido com sucesso", { icon: "success" });
          }
        });
    }
  }
};
</script>

<style lang="sass" scoped>
  .table
    width: 100%
    margin: 10px 0
    thead
      th
        padding: 10px
        font-weight: bold
        color: #000
    tbody
      tr td
        padding: 10px
    .actions-cell > a button,
    .actions-cell > button
      cursor: pointer
      margin: 10px
      padding: 3px 7px
      border-radius: $border-radius
      border: none
      background-color: darken($bg-secondary, 10%)
      span
        margin: 0 10px
      &:hover
        background-color: $bg-primary
        color: $bg-secondary
  
  .empty-table
    display: flex
    margin: 10px 0
    text-align: left
    & > span
      margin: 0 10px
      font-size: 1.2em
</style>
