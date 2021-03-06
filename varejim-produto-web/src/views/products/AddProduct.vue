<template>
  <div class="container">
    <h1>Cadastrar Produto</h1>
    <form>
      <div>
        <label for="codigo">Código</label>
        <input type="text" id="codigo" name="codigo" />
      </div>
      <div>
        <label for="codigo">Nome do Produto</label>
        <input type="text" id="codigo" name="codigo" />
      </div>
      <div>
        <label for="codigo">Seção</label>
        <select>
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
import { mapState } from "vuex";

export default {
  name: 'AddProduct',
  computed: {
    ...mapState({
      sections: state => state.sections
    })
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
        height: 50px
        width: 100%
        margin: 20px 0
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