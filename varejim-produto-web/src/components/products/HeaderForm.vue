<template>
  <div class="header-form">
    <h1>{{ title }}</h1>
    <router-link to="/">
      <eva-icon name="arrow-ios-back-outline"></eva-icon>
      Voltar
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HeaderForm',
  props: {
    title: {
      type: String,
      default: ""
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
</style>