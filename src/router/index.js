import Vue from 'vue'
import Router from 'vue-router'

// 路由按需加载
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
const ConfirmBuy = () => import('../views/order/ConfirmBuy')
const PayOrder = () => import('../views/order/PayOrder')

Vue.use(Router)

const router =  new Router({
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
    },
    {
      path: '/confirmBuy',
      name: 'confirmBuy',
      component: ConfirmBuy
    },
    {
      path: '/payOrder',
      name: 'payOrder',
      component: PayOrder
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('我是路由卫士', to.path)
  next()
})

export default router
