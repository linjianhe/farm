<template>
  <div class="cart">
    <NavBar class="nav">
      <div slot="center">购物车({{goodsLength}})</div>
    </NavBar>
    <GoodsList :goodsList="goodsList"></GoodsList>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  import GoodsList from '@/components/content/GoodsList'
  export default {
    name: 'cart',
    components: {
      NavBar,
      GoodsList
    },
    data() {
      return {
        goodsList: [
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1},
          {img: 'https://gd4.alicdn.com/imgextra/i4/75859100/O1CN01OXWmHO2H5ql6Rotse_!!75859100.jpg', name: '新品Xiaomi/小米9Pro 5g官方旗舰骁龙855plus全面屏手机mix4pro正', price: 3999, num: 1}
        ]
      }
    },
    computed: {
      goodsLength() {
        return this.goodsList.length
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
