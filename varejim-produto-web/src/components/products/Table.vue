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
            <eva-icon name="edit" title="Editar Produto"></eva-icon>
            <eva-icon name="trash-2" title="Remover Produto"></eva-icon>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: "ProductTable",
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
  methods: {
    sectionDescriptionById(section_id) {
      return this.sections.length > 0
        ? this.sections.find(section => section.id === section_id).descricao
        : '-';
    }
  }
};
</script>

<style lang="sass" scoped>
  .table
    width: 100%
    margin: 10px 0
    thead
      background-color: lighten(#ccc, 18%)
      th
        padding: 10px
    tbody
      tr td
        padding: 10px
    .actions-cell > i
      cursor: pointer
      margin: 0 10px
  
  .empty-table
    display: flex
    margin: 10px 0
    text-align: left
    & > span
      margin: 0 10px
      font-size: 1.2em
</style>
