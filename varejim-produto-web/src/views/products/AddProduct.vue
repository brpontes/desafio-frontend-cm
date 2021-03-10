<template>
  <div class="container">
    <HeaderForm title="Cadastrar Produto" />
    <ProductForm />
  </div>
</template>

<script>
import HeaderForm from "@/components/products/HeaderForm"
import ProductForm from "@/components/products/Form"

export default {
  name: 'AddProduct',
  components: { HeaderForm, ProductForm }
}
</script>