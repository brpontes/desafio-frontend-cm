<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
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
  #app
    font-family: 'Oxygen', sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
</style>
