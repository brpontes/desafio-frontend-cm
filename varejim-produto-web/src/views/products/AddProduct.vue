<template>
  <div class="container">
    <div class="header-form">
      <h1>Cadastrar Produto</h1>
      <router-link to="/">
      <eva-icon name="arrow-ios-back-outline"></eva-icon>
        Voltar
      </router-link>
    </div>
    <form>
      <div>
        <label for="codigo">Código <span class="required">*</span></label>
        <input v-model="form.id" type="text" id="codigo" name="codigo" autofocus />
      </div>
      <div>
        <label for="codigo">Nome do Produto <span class="required">*</span></label>
        <input v-model="form.descricao" type="text" id="codigo" name="codigo" />
      </div>
      <div>
        <label for="codigo">Seção <span class="required">*</span></label>
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
      <div>
        <button type="button" @click="save">Cadastrar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, numeric, minLength } from "vuelidate/lib/validators";

export default {
  name: 'AddProduct',
  data() {
    return {
      form: {
        id: '',
        descricao: '',
        secao_id: ''
      },
      submitted: false
    };
  },
  computed: {
    ...mapState({
      sections: state => state.sections
    })
  },
  methods: {
    ...mapActions(['add_product']),
    save() {
      if (this.$v.$invalid) {
        this.submitted = true
        return
      }
      this.add_product(this.form);
      this.$swal("Produto cadastrado com sucesso", "", "success")
      .then((isConfirmed) => {
        if (isConfirmed) {
          this.$router.push('/');
        }
      });
    }
  },
  validations: {
    form: {
      id: { required, numeric },
      descricao: { required, minLength: minLength(3) },
      secao_id: { required }
    }
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
        background-color: $bg-success
        color: $bg-secondary
        font-size: 1.2em
        border-radius: $border-radius
        border: none
        cursor: pointer
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