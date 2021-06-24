<template>
  <div class="container d-flex flex-column align-items-center">
    <h1>Add New Product</h1>
    <div class="card col-10 mx-auto my-2">
      <div class="card-body d-flex me-3">
        <div class=" col-6 me-3">
          <form @submit.prevent="submitNewProduct">
            <div class="form-group">
              <label for="name">Product Name</label>
              <input class="form-control" id="name" v-model="productName" type="text" placeholder="product name" required>
            </div>
            <div class="form-group">
              <label for="price">Price (IDR)</label>
              <input class="form-control" id="price" v-model="price" type="number" placeholder="min 0" min="0">
            </div>
            <div class="form-group">
              <label for="stock">Stock</label>
              <input class="form-control" id="stock" v-model="stock" type="number" placeholder="min 1" min="1">
            </div>
            <div class="form-group">
              <label for="imageUrl">Image URL</label>
              <input class="form-control" id="imageUrl" v-model="imageUrl" @keyup="imagePreview" @paste="imagePreview" type="text" placeholder="i.e. http://image-url.jpg" required>
            </div>
            <button class="btn btn-primary" type="submit">add product</button>
          </form>
        </div>
        <div class="col-6 me-3">
          <img :src="imageUrlPreview" alt="image preview" class="img-fluid rounded">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'NewProduct',
  data () {
    return {
      productName: '',
      price: 0,
      stock: 1,
      imageUrl: '',
      imageUrlPreview: ''
    }
  },
  methods: {
    submitNewProduct () {
      const newProduct = {
        productName: this.productName,
        price: +this.price,
        stock: +this.stock,
        imageUrl: this.imageUrl
      }
      // console.log(newProduct)
      this.$store.dispatch('createProduct', newProduct)
        .then(({ data }) => {
          console.log({ created: data })
          this.$store.dispatch('fetchAllProducts')
          this.$router.push('/products').catch(() => {})
        })
        .catch((err) => {
          console.log(err)
        })
    },
    imagePreview: _.debounce(function () {
      this.imageUrlPreview = this.imageUrl
    }, 300)
  }
}
</script>

<style>

</style>
