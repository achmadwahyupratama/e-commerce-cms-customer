<template>
<div>
    <!-- Page Content -->
  <div class="products-view container d-flex flex-column align-items-center">
    <section class="py-5">
      <div class="container">
        <h2 class="font-weight-light">List of Products</h2>
        <p>To add new product on the list, please click 'New Product' on menu bar. To edit or delete product from the list, please click button in action column.</p>
      </div>
    </section>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">id</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <ProductRow
              v-for="product in $store.state.products" :key="product.id"
              :product="product"
            >
            </ProductRow>
        </tbody>
    </table>
  </div>
</div>
</template>

<script>
import ProductRow from '../components/ProductRow.vue'
export default {
  name: 'Products',
  methods: {
    deleteProduct () {
      console.log('delete')
    }
  },
  components: {
    ProductRow
  }
}
</script>

<style>

</style>
