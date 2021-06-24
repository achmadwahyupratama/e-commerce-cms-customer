<template>
<div class="container mb-4">
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Product</th>
                            <th scope="col" class="text-center">Quantity</th>
                            <th scope="col" class="text-right">Price</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProductInCart
                         v-for="item in $store.state.carts" :key="item.ProductId"
                         :item="item"
                        ></ProductInCart>
                        <!-- <tr>
                            <td></td>
                            <td></td>
                            <td><strong>Total</strong></td>
                            <td class="text-right"><strong>346,90 €</strong></td>
                            <td></td>
                        </tr> -->
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col mb-2">
            <div class="row d-flex justify-content-end">
                <div class="col-sm-12 col-md-6 text-right">
                    <button class="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ProductInCart from '../components/ProductInCart.vue'
export default {
  name: 'Cart',
  created () {
    this.$store.dispatch('fetchCarts')
  },
  components: {
    ProductInCart
  }
}
</script>

<style>

</style>
