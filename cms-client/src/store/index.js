import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    SET_products (state, payload) {
      state.products = payload
    }
  },
  actions: {
    fetchAllProducts ({ commit }) {
      // console.log('masuk')
      axios({
        url: '/products',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          // console.log(data)
          commit('SET_products', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    login (context, payload) {
      return axios({
        url: '/loginAdmin',
        method: 'post',
        data: payload
      })
    },
    fetchProductById (context, productId) {
      return axios({
        url: `/products/${productId}`,
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    editProductById (context, payload) {
      return axios({
        url: `/products/${payload.id}`,
        method: 'put',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          productName: payload.productName,
          price: payload.price,
          stock: payload.stock,
          imageUrl: payload.imageUrl
        }
      })
    },
    deleteProduct (context, productId) {
      return axios({
        url: `/products/${productId}`,
        method: 'delete',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    createProduct (context, payload) {
      return axios({
        url: '/products',
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          productName: payload.productName,
          price: payload.price,
          stock: payload.stock,
          imageUrl: payload.imageUrl
        }
      })
    }
  },
  modules: {
  }
})
