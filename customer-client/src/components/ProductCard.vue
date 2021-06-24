<template>
  <div class='container col-4'>
    <div class="card mx-auto col-md-3 col-10 mt-5">
      <img class='mx-auto img-thumbnail' :src="product.imageUrl" width="auto" height="auto" />
      <div class="card-body text-center mx-auto">
        <div class='cvp'>
          <h5 class="card-title font-weight-bold">{{product.productName}}</h5>
          <p class="card-text">IDR {{product.price}}</p>
          <p class="card-text">STOCK {{product.stock}}</p> <br />
          <a @click.prevent="addToCart(product.id)" class="btn cart px-auto">ADD TO CART</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    addToCart (productId) {
      this.$store.dispatch('addToCart', productId)
        .then(({ data }) => {
          console.log('added to cart:', data)
          this.$store.dispatch('fetchCarts')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.cart {
    background-color: #212121;
    color: white;
    margin-top: 10px;
    font-size: 12px;
    font-weight: 900;
    width: 100%;
    height: 39px;
    padding-top: 9px;
    box-shadow: 0px 5px 10px #212121
}

.card {
    width: fit-content
}

.card-body {
    width: fit-content
}

.btn {
    border-radius: 0
}

.img-thumbnail {
    border: none
}

.card {
    box-shadow: 0 20px 40px rgba(0, 0, 0, .2);
    border-radius: 5px;
    padding-bottom: 10px
}

</style>
