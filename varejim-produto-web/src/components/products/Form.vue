<template>
  <form>
    <div>
      <label for="codigo">Código <span class="required">*</span></label>
      <input v-model="form.id" type="text" id="codigo" maxlength="5" name="codigo" autofocus />
    </div>
    <div>
      <label for="codigo">Nome do Produto <span class="required">*</span></label>
      <input v-model="form.descricao" type="text" id="codigo" maxlength="20" name="codigo" />
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
      <span v-if="!$v.form.id.maxLength">Código deve conter o máximo de 5 caracteres</span>
      <span v-if="!$v.form.descricao.required">Nome do Produto é obrigatório</span>
      <span v-if="!$v.form.descricao.minLength">Nome do Produto deve conter o mínimo de 3 caracteres</span>
      <span v-if="!$v.form.descricao.maxLength">Nome do Produto deve conter o máximo de 20 caracteres</span>
      <span v-if="!$v.form.secao_id.required">Seção é obrigatório</span>
    </div>
    <div>Os campos com <span class="required">*</span> são obrigatórios</div>
    <div class="btn-group">
      <button v-if="edit" type="button" class="danger-bg" @click="promptRemoveProduct(form.id)">Excluir</button>
      <button v-if="edit" type="button" class="success-bg" @click="editProduct">Cadastrar</button>
      <button v-if="!edit" type="button" @click="addProduct">Cadastrar</button>
    </div>
  </form>
</template>

<script>
import ProductFormMixin from "@/mixins/ProductFormMixin";

export default {
  name: "Form",
  mixins: [ProductFormMixin],
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
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