import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/products/AddProduct.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/product/add",
    name: 'add_product',
    component: About
  }
];

const router = new VueRouter({
  routes
});

export default router;
