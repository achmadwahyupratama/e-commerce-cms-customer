<template>
  <div class="card col-10 mx-auto my-2">
    <h1>Edit product #{{id}}</h1>
    <div class="card-body d-flex me-3">
      <div class="col-6 me-3">
        <form @submit.prevent="submitEditProduct()">
          <div class="form-group">
            <label for="name">Product Name</label>
            <input class="form-control" v-model="productName" id="name" type="text" placeholder="product name" required>
          </div>
          <div class="form-group">
            <label for="price">Price (IDR)</label>
            <input class="form-control" v-model="price" id="price" type="number" min="0" placeholder="price" required>
          </div>
          <div class="form-group">
            <label for="stock">Stock</label>
            <input class="form-control" v-model="stock" id="stock" type="number" min="1" placeholder="stock" required>
          </div>
          <div class="form-group">
            <label for="imageUrl">Image URL</label>
            <input class="form-control" v-model="imageUrl" id="imageUrl" type="text" placeholder="imageUrl" @keyup="imagePreview" @paste="imagePreview" required>
          </div>
          <button class="btn btn-primary" type="submit">update</button>
        </form>
      </div>
      <div class="col-6 me-3">
        <img :src="imageUrlPreview" alt="image preview" class="img-fluid rounded">
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'EditProduct',
  data () {
    return {
      id: 0,
      productName: '',
      stock: 0,
      price: 0,
      imageUrl: '',
      imageUrlPreview: ''
    }
  },
  created () {
    this.$store.dispatch('fetchProductById', this.$route.params.productId)
      .then(({ data }) => {
        // console.log(data)
        this.id = data.id
        this.productName = data.productName
        this.stock = data.stock
        this.price = data.price
        this.imageUrl = data.imageUrl
        this.imageUrlPreview = data.imageUrl
      })
      .catch((err) => {
        console.log(err)
      })
  },
  computed: {
  },
  methods: {
    submitEditProduct () {
      const payload = {
        id: +this.id,
        productName: this.productName,
        stock: +this.stock,
        price: +this.price,
        imageUrl: this.imageUrl
      }
      this.$store.dispatch('editProductById', payload)
        .then(({ data }) => {
          console.log({ updated: data })
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
