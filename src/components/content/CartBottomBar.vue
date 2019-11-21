<template>
  <div class="cartBottomBar">
    <img :src="imgUrl" @click="checkAll"/>
    <div>全选</div>
    <div class="totalPrice">合计:￥{{totalPrice | total}}</div>
    <div class="goPay" @click="goConfirmBuy">去结算</div>
  </div>
</template>

<script>
  export default {
    name: 'CartBottomBar',
    props: {
      totalPrice: {
        type: Number,
        default() {
          return 0
        }
      },
      flag: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
      }
    },
    computed: {
      imgUrl() {
        if(!this.flag) {
          return require('../../assets/img/choose.svg')
        } else{
          return require('../../assets/img/choosed.svg')
        }
      }
    },
    filters: {
      total(price) {
        return price.toFixed(2)
      }
    },
    methods: {
      checkAll() {
        this.$emit('checkAll')
      },
      goConfirmBuy() {
        this.$emit('goConfirmBuy')
      }
    }
  }
</script>

<style scoped>
  .cartBottomBar{
    display: flex;
    align-items: center;
    height: 40px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    background-color: #ccc;
    padding: 0 0 0 15px;
  }
  .cartBottomBar img{
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }
  .totalPrice{
    margin-left: 40px;
    margin-right: auto;
  }
  .goPay{
    background-color: orangered;
    height: 40px;
    width: 80px;
    line-height: 40px;
    text-align: center;
    color: #fff;
  }
</style>
