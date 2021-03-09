import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddProduct from "../views/products/AddProduct.vue";
import EditProduct from "../views/products/EditProduct.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:page?",
    name: "home",
    component: Home
  },
  {
    path: "/product/add",
    name: 'add_product',
    component: AddProduct
  },
  {
    path: "/product/:id/edit",
    name: 'edit_product',
    component: EditProduct
  }
];

const router = new VueRouter({
  routes
});

export default router;
