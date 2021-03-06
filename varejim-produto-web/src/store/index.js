import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pagination: { start: 0, limit: 0, total: 0 },
    sections: [],
    products: [],
    filter_section: "",
    filter: ""
  },
  mutations: {
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_SECTIONS(state, sections) {
      state.sections = sections;
    },
    SET_FILTER(state, filter) {
      state.filter = filter;
    },
    SET_FILTER_SECTION(state, filter_section) {
      state.filter_section = filter_section;
    }
  },
  actions: {
    set_products({ commit }) {
      fetch("http://localhost:3000/produtos")
        .then(async response => {
          const { start, limit, total, items } = await response.json();
          commit("SET_PRODUCTS", items);
          commit("SET_PAGINATION", { start, limit, total });
        })
        .catch(error => console.log(error));
    },
    set_sections({ commit }) {
      fetch("http://localhost:3000/secoes")
        .then(async response => {
          const { items } = await response.json();
          commit("SET_SECTIONS", items);
        })
        .catch(error => console.log(error));
    },
    set_filter({ commit }, filter) {
      commit("SET_FILTER", filter);
    },
    set_filter_section({ commit }, filter_section) {
      commit("SET_FILTER_SECTION", filter_section);
    }
  },
  getters: {
    get_products: state => {
      const filtered_products_by_section_id = state.products
        .filter(product => state.filter_section === "" || product.secao_id === state.filter_section);

      return state.filter.length === 0
        ? filtered_products_by_section_id
        : filtered_products_by_section_id.filter(product => product.id.toString().indexOf(state.filter) !== -1);
    }
  },
  modules: {}
});
