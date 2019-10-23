<template>
  <div class="cart">
    <NavBar class="nav">
      <div slot="center">购物车({{goodsLength}})</div>
    </NavBar>
    <GoodsList :goodsList="goodsList"></GoodsList>
    <cart-bottom-bar :totalPrice="totalPrice" @checkAll="checkAll" :flag="flag"></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  import GoodsList from '@/components/content/GoodsList'
  import CartBottomBar from '@/components/content/CartBottomBar'
  export default {
    name: 'cart',
    components: {
      NavBar,
      GoodsList,
      CartBottomBar
    },
    data() {
      return {
        goodsList: [
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1, check: false},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 1599.00, num: 1, check: false},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999.99, num: 1, check: false},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 2999, num: 1, check: false},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1, check: false},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 12999, num: 1, check: false},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1, check: false},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1, check: false},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 4999, num: 1, check: false},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 5999, num: 1, check: false},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1, check: false}
        ]
      }
    },
    computed: {
      goodsLength() {
        return this.goodsList.length
      },
      totalPrice() {
        return this.goodsList.filter(item => {
          return item.check
        }).reduce((preValue, item) => {
          return preValue += item.price * item.num
        },0)
      },
      flag() {
        if(this.goodsList.length) {
          return !this.goodsList.filter(item => !item.check).length
        } else {
          return false
        }
      }
    },
    methods: {
      checkAll() {
        if(!this.flag){
          for(let item of this.goodsList) {
            item.check = true
          }
        }else {
          for(let item of this.goodsList) {
            item.check = false
          }
        }
      }
    }
  }
</script>

<style scoped>
  .nav{
    width: 100%;
    background-color: #ff8198;
    color: #fff;
  }
</style>
