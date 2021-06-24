<template>
  <div class="home">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
      <div class="container">
        <a class="navbar-brand" @click.prevent="" href="#">Y Store</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/products">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/NewProduct">New Product</router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Full Page Image Header with Vertically Centered Content -->
    <header class="masthead">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12 text-center">
            <h1 class="font-weight-light">Y Store</h1>
            <p class="lead">Content Management System (CMS) Client</p>
          </div>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  created () {
    this.$store.dispatch('fetchAllProducts')
    this.$router.push('/products').catch(() => {})
  }
}
</script>
