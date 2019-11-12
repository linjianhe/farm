<template>
  <div class="confirmBuy">
    <NavBar class="nav">
      <div slot="left" @click="goBack"><</div>
      <div slot="center">确认订单</div>
    </NavBar>
    <div class="address" style="width: 100%;height: 100px;background-color: #ccc;">
      <div class="address-title">收货地址</div>
      <span class="address-content">福建省漳平市溪南镇下林村下林44号</span>
    </div>
    <div class="goods">
      <div class="goods-item" v-for="(item, index) in goods">
        <img :src="item.sku_url" alt=""/>
        <div class="item-info">
          <div class="item-title">{{item.productName}}</div>
          <div class="item-sku">{{item.sku_name}}</div>
          <div class="info-bottom">
            <div class="item-price">￥{{item.special_price && item.special_price.toFixed(2)}}</div>
            <div class="item-num">x{{item.num}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="others">
      <div>配送方式：顺丰</div>
      <div>运费险：100w</div>
      <div>订单备注：无</div>
    </div>
    <div class="confirm-bottom">
      <div class="total">共{{goods.length}}件，合计￥<span>{{totalPrice}}</span></div>
      <div class="sub-btn" @click="subOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  import utils from '@/common/utils'
  export default {
    name: 'confirmBuy',
    components: {
      NavBar
    },
    data () {
      return {
        goods: []
      }
    },
    mounted() {

    },
    created() {
      console.log(this.$route.params.goods)
      this.goods = this.$route.params.goods
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      subOrder: utils.debounce(function () {
        this.$store.dispatch('order/AddOrder', {goods: this.goods,total: this.totalPrice}).then(res => {
          console.log(res)
        })
        this.$router.push({
          name: 'payOrder',
          params: {
            goods: this.goods,
            totalPrice: this.totalPrice
          }
        })
      },500)
    },
    computed: {
      totalPrice() {
        return this.goods.reduce((preValue, item) => {
          return preValue += item.special_price * item.num
        },0).toFixed(2)
      }
    }
  }
</script>

<style scoped>
  .confirmBuy{
    position: relative;
    z-index: 99;
    background-color: #ddd;
    width: 100%;
    height: calc(100vh - 44px - 49px);
    overflow: scroll;
    margin: 44px 0 0 0;
  }
  .nav{
    width: 100%;
    background-color: #000;
    color: #fff;
  }
  .goods-item{
    display: flex;
    margin:15px;
    padding: 10px;
    background-color: #fff;
    border-radius: 15px;
  }
  .goods-item img{
    width: 130px;
    height: 100px;
  }
  .item-info{
    margin: 5px 0 10px 10px;
    flex: 1;
  }
  .item-sku{
    font-size: 12px;
  }
  .item-title{
    width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .info-bottom{
    display: flex;
    margin-top: 25px;
  }
  .item-price{
    color: red;
    font-size: 16px;
    margin-right: auto;
  }
  .others{
    margin:15px;
  }
  .others div{
    margin-bottom: 10px;
  }
  .confirm-bottom{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 49px;
    display: flex;
    line-height: 49px;
    background-color: #fff;
  }
  .total{
    margin-left: auto;
    margin-right: 20px;
  }
  .sub-btn{
    width: 90px;
    text-align: center;
    border: 1px solid #aaa;
    color: #fff;
    background-color: green;
    border-radius: 20px;
  }
  .address-title{
    padding: 20px;
    font-size: 22px;
    color: #FE6B28;
  }
  .address-content{
    padding: 20px;
  }
</style>
