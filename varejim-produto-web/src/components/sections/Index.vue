<template>
  <nav>
    <ul>
      <li @click="filterBySectionCod('')" class="badge active">Todos</li>
      <li @click="filterBySectionCod(section.id)" class="badge" v-for="section in sections" :key="section.id">{{section.descricao}}</li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'Sections',
  props: {
    sections: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    ...mapActions(['set_filter_section']),
    updateActiveBadge () {
      document.addEventListener('click', event => {
        const { target } = event;
        const { tagName, classList } = target;
        if (tagName === "LI", classList.contains('badge')) {
          const allBadges = document.querySelectorAll('.badge');
          Array.from(allBadges).forEach(element => console.log(element.classList.remove('active')));
          target.classList.add('active');
        }
      }, false);
    },
    filterBySectionCod (filter_section) {
      this.updateActiveBadge();
      this.set_filter_section(filter_section);
    }
  }
}
</script>

<style lang="sass">
  nav
    margin: 20px 0
    ul
      display: flex
      justify-content: center
      list-style-type: none
  
  .badge
    margin: 0 20px
    background-color: $bg-secondary
    padding: 10px 15px
    border: 1px solid $bg-primary
    border-radius: $border-radius
    color: darken($bg-primary, 15%)
    cursor: pointer
    &:hover
      background-color: lighten($bg-primary, 10%)
      border: 1px solid lighten($bg-primary, 10%)
      color: $bg-secondary  
  
  .active
    background-color: $bg-primary
    color: $bg-secondary
</style>