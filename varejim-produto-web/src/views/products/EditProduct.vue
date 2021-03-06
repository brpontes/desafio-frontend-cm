<template>
  <div class="container">
    <h1>Editar Produto</h1>
    <form>
      <div>
        <label for="codigo">Código</label>
        <input v-model="form.id" type="text" id="codigo" name="codigo" />
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
      <div>
        <button type="button">Cadastrar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: 'EditProduct',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sections: state => state.sections,
      form: state => state.form
    })
  },
  methods: {
    ...mapActions(['set_products', 'set_form_edit'])
  },
  async mounted() {
    this.set_form_edit(parseInt(this.$route.params.id))
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
        background-color: $bg-tertiary
        color: $bg-secondary
        font-size: 1.2em
        border-radius: $border-radius
        border: none
        cursor: pointer
        &:hover
          background-color: lighten($bg-tertiary, 10%)
</style>