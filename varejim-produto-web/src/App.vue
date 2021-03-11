<template>
  <div id="app">
    <header>
      <div id="nav">
        <div id="logo"></div>
        <nav>
          <router-link to="/">Início</router-link>
          <router-link to="/product/add">Cadastrar Produto</router-link>
        </nav>
        <button class="menu-button" type="button" @click="toggleMenu">
          <eva-icon name="menu-outline" title="Editar Produto"></eva-icon>
        </button>
      </div>
    </header>
    <ul class="menu-list" :style="`display: ${menu_open ? 'block' : 'none'}`">
      <router-link to="/"><li @click="toggleMenu">Início</li></router-link>
      <router-link to="/product/add"><li @click="toggleMenu">Cadastrar Produto</li></router-link>
    </ul>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AppVarejim",
  data() {
    return {
      menu_open: false
    }
  },
  methods: {
    ...mapActions(['set_sections']),
    toggleMenu() {
      this.menu_open = !this.menu_open
    }
  },
  async created() {
    await this.set_sections()
  }
}
</script>

<style lang="sass">
  *
    margin: 0
    padding: 0
    box-sizing: border-box

  #app
    font-family: 'Oxygen', sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
  
  header
    background: $bg-primary
    height: 60px
    line-height: 60px
    align-items: center
    width: 100%
    #nav
      max-width: $container-width
      margin: 0 auto
      display: flex
      justify-content: space-between
      #logo
        width: 300px
        height: 60px
        background: url('./assets/logo.png') no-repeat
        background-size: contain
      nav
        @media (max-width: 768px)
          display: none
        a
          text-decoration: none
          padding: 10px 20px
          border-radius: $border-radius
          color: $bg-secondary
          &:hover
            background: $bg-tertiary
      .menu-button
        @media (max-width: 768px)
          display: block
        display: none
        background: $bg-primary
        border: none
        padding: 5px
        border-radius: 5px
        margin: 10px 20px
        cursor: pointer
        outline: none
  .menu-list
    background: #FFFFFF
    list-style-type: none
    a
      text-decoration: none
      color: $bg-tertiary
      li
        padding: 20px 10px
        cursor: pointer
        border-bottom: 1px solid #f4f4f4
</style>
