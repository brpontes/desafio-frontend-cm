<template>
  <nav>
    <ul>
      <li @click="filter('')" class="badge">Todos</li>
      <li @click="filter(section.id)" class="badge" v-for="section in sections" :key="section.id">{{section.descricao}}</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Sections',
  props: {
    sections: {
      type: Array,
      default: () => []
    },
    filter: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="sass" scoped>
  nav
    margin: 20px 0
    ul
      display: flex
      justify-content: center
      list-style-type: none
  
  .badge
    margin: 0 20px
    background-color: #069
    padding: 10px 15px
    border-radius: 5px
    color: #f4f4f4
    cursor: pointer
</style>