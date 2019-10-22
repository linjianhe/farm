<template>
  <div class="goodsListItem">
    <img :src="imgUrl" @click="imgClick"/>
    <div class="item-img">
      <img :src="goods.img" alt=""/>
    </div>
    <div class="item-info">
      <div class="item-title">{{goods.name}}</div>
      <div class="info-bottom">
        <div class="item-price">￥{{goods.price}}</div>
        <input type="button" value="-" class="num-down" :disabled="goods.num<1" @click="numDown"/>
        <div class="item-num">{{goods.num}}</div>
        <input type="button" value="+" class="num-up" :disabled="goods.num>=5" @click="numUp"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        check: false
      }
    },
    computed: {
      imgUrl() {
        if(!this.goods.check) {
          return require('../../assets/img/choose.svg')
        } else{
          return require('../../assets/img/choosed.svg')
        }
      }
    },
    methods: {
      imgClick() {
        this.goods.check = !this.goods.check
      },
      numDown() {
        this.goods.num --
      },
      numUp() {
        this.goods.num ++
      }
    }
  }
</script>

<style scoped>
  .goodsListItem{
    display: flex;
    margin:15px;
    padding: 10px;
    background-color: #fff;
    border-radius: 15px;
  }
  .goodsListItem img{
    width: 20px;
    height: 20px;
    align-self: center;
  }
  .goodsListItem div img{
    width: 130px;
    height: 150px;
  }
  .item-info{
    margin: 20px 0;
  }
  .item-title{
    width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .info-bottom{
    display: flex;
    margin-top: 60px;
  }
  .item-price{
    color: red;
    font-size: 18px;
  }
  .num-down{
    margin-left: 70px;
  }
  .item-num{
    width: 25px;
    text-align: center;
  }
  .num-down, .num-up{
    background-color: #F1F1F1;
    border: 1px solid #B2B2B2;
    width: 25px;
    text-align: center;
  }
</style>
