<template>
    <tr>
        <td><div class="col-12"><img class='mx-auto img-thumbnail' width="auto" height="auto" :src="item.Product.imageUrl" /></div> </td>
        <td>{{item.Product.productName}}</td>
        <td><a class="btn btn-light shadow" @click.prevent="minQuantity(item.ProductId)">-</a> {{item.quantity}} <a class="btn btn-light shadow" @click.prevent="addQuantity(item.ProductId)">+</a></td>
        <td class="text-right">{{item.Product.price}}</td>
        <td class="text-right"><button class="btn btn-sm btn-danger rounded" @click.prevent="deleteItem(item.ProductId)">remove</button> </td>
    </tr>
</template>

<script>
export default {
  name: 'ProductInCart',
  props: ['item'],
  data () {
    return {
      priceAndQuantity: 0
    }
  },
  methods: {
    addQuantity (productId) {
      this.$store.dispatch('addQuantity', productId)
        .then((data) => {
          this.$store.dispatch('fetchCarts')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    minQuantity (productId) {
      this.$store.dispatch('minQuantity', productId)
        .then((data) => {
          this.$store.dispatch('fetchCarts')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteItem (productId) {
      this.$store.dispatch('deleteItem', productId)
        .then((data) => {
          this.$store.dispatch('fetchCarts')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
img {
  max-height: 90px;
}
</style>
