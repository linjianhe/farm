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
  import { Toast } from 'vant'
  export default {
    name: 'cart',
    components: {
      NavBar,
      GoodsList,
      CartBottomBar
    },
    data() {
      return {
        goodsList: [],
        goodsLength: 0
      }
    },
    computed: {
      totalPrice() {
        return this.goodsList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue += item.special_price * item.num
        },0)
      },
      flag() {
        if(this.goodsList.length) {
          return !this.goodsList.filter(item => !item.checked).length
        } else {
          return false
        }
      }
    },
    methods: {
      checkAll() {
        console.log('全选')
        if(!this.flag){
          for(let item of this.goodsList) {
            item.checked = true
          }
        }else {
          for(let item of this.goodsList) {
            item.checked = false
          }
        }
      }
    },
    created() {
      this.$store.dispatch('goods/CartInfo').then(res => {
        if(res.code === 200) {
          this.goodsList = res.data
          this.goodsLength = res.data.length
        } else {
          this.$confirm('未登录，是否去登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$router.push('/login')
          }).catch(() => {
          })
        }
      })
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
