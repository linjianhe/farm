import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Category = () => import('../views/category/Category')
const Detail = () => import('../views/detail/Detail')
const BrandsDetail = () => import('../views/brandsDetail/BrandsDetail')
const Order = () => import('../views/order/Order')
const Login = () => import('../views/user/Login')
const ForgetPass = () => import('../views/user/ForgetPass')
const Register = () => import('../views/user/Register')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:id',
      component: Detail
    },
    {
      path: '/brandsDetail/:id/:name',
      component: BrandsDetail
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/forgetPass',
      component: ForgetPass
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
