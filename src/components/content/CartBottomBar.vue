<template>
  <div class="cartBottomBar">
    <img :src="imgUrl" @click=""/>
    <div>全选</div>
    <div class="totalPrice">合计:￥{{2000}}</div>
    <div class="goPay">去结算</div>
  </div>
</template>

<script>
  export default {
    name: 'CartBottomBar',
    computed: {
      imgUrl() {
        if(1) {
          return require('../../assets/img/choose.svg')
        } else{
          return require('../../assets/img/choosed.svg')
        }
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
  }
</style>
