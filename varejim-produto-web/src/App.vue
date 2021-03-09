<template>
  <div id="app">
    <header>
      <div id="nav">
        <div id="logo"></div>
        <nav>
          <router-link to="/">Início</router-link>
          <router-link to="/product/add">Cadastrar Produto</router-link>
        </nav>
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
    align-items: center
    width: 100%
    #nav
      width: $container-width
      margin: 0 auto
      display: flex
      justify-content: space-between
      #logo
        width: 150px
        background: url('./assets/logo.png') no-repeat
        background-size: contain
      nav a
        text-decoration: none
        padding: 10px 20px
        border-radius: $border-radius
        color: $bg-secondary
        &:hover
          background: $bg-tertiary
</style>
