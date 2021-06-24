import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
// import Products from '../views/Products.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/products',
        name: 'Products',
        // component: Products
        component: () => import('../views/Products.vue')
      }, {
        path: '/newproduct',
        name: 'NewProducts',
        component: () => import('../views/NewProduct.vue')
      }, {
        path: '/editproduct/:productId',
        name: 'EditProducts',
        component: () => import('../views/EditProduct.vue')
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')
  if (!token) {
    if (to.name !== 'Login') {
      return next('/login')
    } else {
      return next()
    }
  } else {
    if (to.name !== 'Login') {
      return next()
    } else {
      return next('/')
    }
  }
})
export default router
