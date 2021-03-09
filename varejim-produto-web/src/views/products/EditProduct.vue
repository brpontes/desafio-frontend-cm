<template>
  <div class="container">
    <div class="header-form">
      <h1>Editar Produto</h1>
      <router-link to="/">
      <eva-icon name="arrow-ios-back-outline"></eva-icon>
        Voltar
      </router-link>
    </div>
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
      <div class="errors" v-if="submitted && $v.$invalid">
        <span v-if="!$v.form.id.required">Código é obrigatório</span>
        <span v-if="!$v.form.id.numeric">Código deve conter apenas números</span>
        <span v-if="!$v.form.descricao.required">Nome do Produto é obrigatório</span>
        <span v-if="!$v.form.descricao.minLength">Nome do Produto deve conter o mínimo de 3 caracteres</span>
        <span v-if="!$v.form.secao_id.required">Seção é obrigatório</span>
      </div>
      <div>Os campos com <span class="required">*</span> são obrigatórios</div>
      <div class="btn-group">
        <button type="button" class="danger-bg" @click="promptRemoveProduct(form.id)">Excluir</button>
        <button type="button" class="success-bg" @click="save">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, numeric, minLength } from "vuelidate/lib/validators";

export default {
  name: 'EditProduct',
  data() {
    return {
      submitted: false
    }
  },
  computed: {
    ...mapState({
      sections: state => state.sections,
      form: state => state.form
    })
  },
  methods: {
    ...mapActions(['get_product_by_id', 'edit_product', 'delete_product']),
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
            const wasDeleted = await this.delete_product(id);
            const swal_lookup = {
              true: { "title": "Produto removido com sucesso", "icon": "success" },
              false: { "title": "Não foi possível remover o produto", "icon": "warning" }
            }
            const swalOptions = swal_lookup[wasDeleted.ok];
            this.$swal(swalOptions.title, { icon: swalOptions.icon });
            this.$router.push('/');
          }
        });
    },
    save() {
      if (this.$v.$invalid) {
        this.submitted = true
        return
      }
      this.edit_product();
      this.$swal("Produto salvo com sucesso", "", "success");
      this.$router.push('/');
    }
  },
  validations: {
    form: {
      id: { required, numeric },
      descricao: { required, minLength: minLength(3) },
      secao_id: { required }
    }
  },
  async mounted() {
    this.get_product_by_id(parseInt(this.$route.params.id))
  }
}
</script>

<style lang="sass" scoped>
  .header-form
    display: flex
    flex-direction: row
    justify-content: space-between
    h1
      font-size: 1.5em
    a
      display: flex
      text-decoration: none
      color: $bg-tertiary

  form
    margin: 30px 0
    div
      width: 100%
      label
        display: block
      input, select, button
        background: darken($bg-secondary, 10%)
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
  .errors
    display: flex
    flex-direction: column
    margin: 0 0 20px 0
    & > span
      margin: 5px 0
      color: $bg-danger
  .required
    color: $bg-danger
</style>