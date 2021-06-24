import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: []
  },
  mutations: {
    SET_products (state, payload) {
      state.products = payload
    },
    SET_carts (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    register (context, payload) {
      // console.log(payload)
      return axios({
        url: '/register',
        method: 'post',
        data: payload
      })
    },
    login (context, payload) {
      // console.log(payload)
      return axios({
        url: '/login',
        method: 'post',
        data: payload
      })
    },
    fetchProducts ({ commit }) {
      axios({
        url: '/products',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_products', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addToCart (context, productId) {
      return axios({
        url: '/carts/' + productId,
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    fetchCarts ({ commit }) {
      axios({
        url: '/carts',
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_carts', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addQuantity (context, productId) {
      axios({
        url: '/carts/' + productId,
        method: 'patch',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          method: 'add'
        }
      })
    },
    minQuantity (context, productId) {
      axios({
        url: '/carts/' + productId,
        method: 'patch',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          method: 'min'
        }
      })
    },
    deleteItem (context, productId) {
      axios({
        url: '/carts/' + productId,
        method: 'delete',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
})
