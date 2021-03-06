<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link to="/">Início</router-link>
        <router-link to="/product/add">Cadastrar Produto</router-link>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AppVarejim",
  methods: {
    ...mapActions(['set_products', 'set_sections'])
  },
  async created() {
    await this.set_products()
    await this.set_sections()
  }
}
</script>

<style lang="sass">
  *
    margin: 0
    padding 0
    box-sizing: border-box

  #app
    font-family: 'Oxygen', sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
  
  header
    background: $bg-primary
    height: 60px
    line-height: 60px
    width: 100%
    #nav
      width: $container-width
      margin: 0 auto
      display: flex
      justify-content: flex-end
      a
        text-decoration: none
        color: $bg-secondary
        padding: 0 20px
        &:hover
          background: $bg-tertiary
</style>
