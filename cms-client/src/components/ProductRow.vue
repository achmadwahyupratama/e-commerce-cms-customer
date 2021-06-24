<template>
  <tr>
    <th scope="row">{{product.id}}</th>
    <td>
      <div class="container d-flex flex-row align-items-center">
        <div>
          <img :src="`${product.imageUrl}`" :alt="`image`" style="max-height:200px">
        </div>
        <div>{{product.productName}}</div>
      </div>
    </td>
    <td>{{product.price}}</td>
    <td>{{product.stock}}</td>
    <td>
        <router-link class="btn btn-secondary" :to="`/EditProduct/${product.id}`">Edit</router-link> |
        <a class="btn btn-danger" href="#" @click.prevent="deleteProduct(product.id)">Delete</a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ProductRow',
  methods: {
    deleteProduct (productId) {
      console.log(`delete ${productId}`)
      this.$store.dispatch('deleteProduct', productId)
        .then(({ data }) => {
          console.log(data)
          this.$store.dispatch('fetchAllProducts')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  props: ['product']
}
</script>

<style>

</style>
