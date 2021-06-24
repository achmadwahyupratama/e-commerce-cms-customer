<template>
  <div class="home">
    <!-- Navigation -->
    <NavBar/>
    <div class="container">
      <router-view></router-view>
      <ProductGallery></ProductGallery>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '../components/NavBar'
import ProductGallery from '../components/ProductGallery'

export default {
  name: 'Home',
  components: {
    NavBar,
    ProductGallery
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  async created () {
    await this.$store.dispatch('fetchProducts')
    console.log(this.$store.state.products)
  }
}
</script>
