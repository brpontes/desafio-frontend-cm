import Vue from "vue";
import Vuex from "vuex";
import { getProducts, getProductById, addProduct, editProductById, deleteProductById } from "@/api/products";
import { getSections } from "@/api/sections";

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
    async set_products({ commit, state }, page) {
      const startRow = (page - 1) * state.pagination.limit;
      const { start, limit, total, items } = await getProducts(startRow);
      commit("SET_PRODUCTS", items);
      commit("SET_PAGINATION", { start, limit, total });
    },
    async get_product_by_id({ commit }, id) {
      const data = await getProductById(id);
      commit("SET_FORM_EDIT", data);
    },
    async add_product({ commit, state, dispatch }, product) {
      await addProduct(product);
      commit("SET_ACTIVE_PAGE", "1");
      dispatch("set_products", state.active_page);
    },
    async edit_product({ commit, state }) {
      await editProductById(state.form);
      commit("UPDATE_PRODUCT", state.form);
    },
    async delete_product({ commit, dispatch, state }, id) {
      await deleteProductById(id);
      commit("SET_ACTIVE_PAGE", "1");
      dispatch("set_products", state.active_page);
    },
    async set_sections({ commit }) {
      const { items } = await getSections();
      commit("SET_SECTIONS", items);
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
    set_form_edit({ commit }, data) {
      commit("SET_FORM_EDIT", data);
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
