<template>
  <div class="container">
    <h1>Editar Produto</h1>
    <form>
      <div>
        <label for="codigo">Código</label>
        <input disabled="disabled" v-model="form.id" type="text" id="codigo" name="codigo" />
      </div>
      <div>
        <label for="codigo">Nome do Produto</label>
        <input v-model="form.descricao" type="text" id="codigo" name="codigo" />
      </div>
      <div>
        <label for="codigo">Seção</label>
        <select v-model="form.secao_id">
          <option></option>
          <option v-for="section in sections" :key="section.id" :value="section.id">{{section.descricao}}</option>
        </select>
      </div>
      <div class="btn-group">
        <button type="button" class="danger-bg">Excluir</button>
        <button type="button" class="success-bg" @click="save">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: 'EditProduct',
  computed: {
    ...mapState({
      sections: state => state.sections,
      form: state => state.form
    })
  },
  methods: {
    ...mapActions(['get_product_by_id', 'edit_product']),
    save() {
      this.edit_product();
      this.$swal("Produto salvo com sucesso", "", "success");
      this.$router.push('/');
    }
  },
  async mounted() {
    this.get_product_by_id(parseInt(this.$route.params.id))
  }
}
</script>

<style lang="sass" scoped>
  h1
    font-size: 1.5em

  form
    margin: 30px 0
    div
      width: 100%
      label
        display: block
      input, select, button
        background: $bg-secondary
        border: 1px solid #ccc
        border-radius: $border-radius
        height: 50px
        width: 100%
        margin: 20px 0
        padding: 10px
        outline: none
      button
        color: $bg-secondary
        font-size: 1.2em
        border-radius: $border-radius
        border: none
        cursor: pointer
    .btn-group
      display: flex
      justify-content: space-between
      button
        width: 48%
    .danger-bg
      background-color: $bg-danger
      &:hover
          background-color: darken($bg-danger, 10%)
    .success-bg
      background-color: $bg-success
      &:hover
          background-color: darken($bg-success, 10%)
</style>