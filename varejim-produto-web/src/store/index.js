import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    active_page: 1,
    pagination: { start: 0, limit: 10, total: 0 },
    sections: [],
    products: [],
    filter_section: "",
    filter: "",
    form: {
      id: "",
      descricao: "",
      secao_id: ""
    }
  },
  mutations: {
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_ACTIVE_PAGE(state, active_page) {
      state.active_page = active_page;
    },
    SET_SECTIONS(state, sections) {
      state.sections = sections;
    },
    SET_FILTER(state, filter) {
      state.filter = filter;
    },
    SET_FILTER_SECTION(state, filter_section) {
      state.filter_section = filter_section;
    },
    SET_FORM_EDIT(state, data) {
      state.form = data;
    },
    ADD_PRODUCT(state, product) {
      state.products = [...state.products, product];
    },
    UPDATE_PRODUCT(state, data) {
      state.products = state.products.map(product => product.id === data.id ? data : product);
    }
  },
  actions: {
    set_products({ commit, state }, page) {
      const start = (page - 1) * state.pagination.limit
      fetch(`http://localhost:3000/produtos?start=${start}`)
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
    set_pagination_start({ commit, state }, page) {
      const start = (page - 1) * state.pagination.limit
      fetch(`http://localhost:3000/produtos?start=${start}`)
        .then(async response => {
          const { start, limit, total, items } = await response.json();
          commit("SET_PRODUCTS", items);
          commit("SET_PAGINATION", { start, limit, total });
        })
        .catch(error => console.log(error));
    },
    set_active_page({ commit }, page) {
      window.location.href = `/#/${page}`;
      commit("SET_ACTIVE_PAGE", page);
    },
    set_filter({ commit }, filter) {
      commit("SET_FILTER", filter);
    },
    set_filter_section({ commit }, filter_section) {
      commit("SET_FILTER_SECTION", filter_section);
    },
    async set_form_edit({ commit }, data) {
      commit("SET_FORM_EDIT", data);
    },
    get_product_by_id({ commit }, id) {
      fetch(`http://localhost:3000/produtos/${id}`)
      .then(async response => {
        const data = await response.json();
        commit("SET_FORM_EDIT", data);
      })
      .catch(error => console.log(error));
    },
    add_product({ commit, state, dispatch }, product) {
      return new Promise(resolve => {
        fetch("http://localhost:3000/produtos", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(product)
        })
          .then(response => {
            if (response.ok) {
              commit("SET_ACTIVE_PAGE", "1");
              dispatch("set_products", state.active_page);
            }
            resolve(response.ok)
          })
          .catch(error => console.log(error))
      })
    },
    edit_product({ commit, state }) {
      return new Promise(resolve => {
        const { form } = state;
        fetch(`http://localhost:3000/produtos/${form.id}`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify(form)
        })
          .then(response => {
            if (response.ok) {
              commit('UPDATE_PRODUCT', form);
            }
            resolve(response.ok)
          })
          .catch(error => console.log(error))
      })
    },
    delete_product({ commit, dispatch, state }, id) {
      return new Promise(resolve => {
        fetch(`http://localhost:3000/produtos/${id}`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          method: "DELETE",
          body: JSON.stringify({ id })
        })
          .then(response => {
            console.log(response);
            if (response.ok) {
              commit("SET_ACTIVE_PAGE", "1");
              dispatch("set_products", state.active_page);
            }
            resolve(response);
          })
          .catch(error => console.log(error))
      })
    }
  },
  getters: {
    get_products: state => {
      return state.products
        .filter(product => state.filter_section === "" || product.secao_id === state.filter_section)
        .filter(product => state.filter.length > 0 ? product.id.toString().indexOf(state.filter) !== -1 : product);
    },
    get_product_by_id: state => id => {
      return state.products.find(product => product.id === id);
    }
  },
  modules: {}
});
