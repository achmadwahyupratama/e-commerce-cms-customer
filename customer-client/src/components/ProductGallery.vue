<template>
    <div class="container d-flex flex-wrap">
        <ProductCard
         v-for="product in $store.state.products" :key="product.id"
         :product="product"
        ></ProductCard>
    </div>
</template>

<script>
import ProductCard from './ProductCard'
export default {
  name: 'ProductGallery',
  components: {
    ProductCard
  }
}
</script>

<style>

</style>
