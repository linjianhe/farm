<template>
  <div class="goodsListItem">
    <img :src="imgUrl" @click="imgClick"/>
    <div class="item-img">
      <img :src="goodsItem.productImg" alt=""/>
    </div>
    <div class="item-info">
      <div class="item-title">{{goodsItem.productName}}</div>
      <div class="item-sku">{{goodsItem.sku_name}}</div>
      <div class="info-bottom">
        <div class="item-price">￥{{goodsItem.special_price | price}}</div>
        <input type="button" value="-" class="num-down" :disabled="goodsItem.num<1" @click="numDown"/>
        <div class="item-num">{{goodsItem.num}}</div>
        <input type="button" value="+" class="num-up"  @click="numUp"/>
      </div>
    </div>
  </div>
</template>

<script>
  import eventBus from '../../common/eventBus'
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
      }
    },
    computed: {
      imgUrl() {
        if(!this.goodsItem.checked) {
          return require('../../assets/img/choose.svg')
        } else{
          return require('../../assets/img/choosed.svg')
        }
      }
    },
    filters: {
      price(special_price) {
        return special_price.toFixed(2)
      }
    },
    methods: {
      imgClick() {
        this.goodsItem.checked = !this.goodsItem.checked
      },
      numDown() {
        eventBus.$emit('numChange', this.goodsItem, -1)
      },
      numUp() {
        eventBus.$emit('numChange', this.goodsItem, 1)
      }
    },
    created() {
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
    flex: 1;
  }
  .item-title{
    width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .info-bottom{
    display: flex;
    margin-top: 45px;
  }
  .item-price{
    color: red;
    font-size: 18px;
    margin-right: auto;
  }
  .num-down{
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
