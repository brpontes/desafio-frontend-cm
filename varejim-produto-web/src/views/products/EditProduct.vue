<template>
  <div class="container">
    <HeaderForm title="Editar Produto" />
    <ProductForm edit />
  </div>
</template>

<script>
import HeaderForm from "@/components/products/HeaderForm"
import ProductForm from "@/components/products/Form"

export default {
  name: 'EditProduct',
  components: { HeaderForm, ProductForm }
}
</script>
