<template>
  <div class="detail">
    <DetailNav></DetailNav>
    <el-carousel :interval="3000" arrow="always" height="200px">
      <el-carousel-item v-for="(item,index) in goodsSku" :key="index">
        <img :src="item.sku_url" alt=""/>
      </el-carousel-item>
    </el-carousel>
    <div class="goods-info">
      <div class="base-info">
        <h1>{{goods.productName}}</h1>
        <p>{{goods.describe}}</p>
      </div>
      <div class="price">
        <span class="price-tag">价格：</span>
        <span class="price-sp">￥{{chooseSku.special_price}}</span>
        <span class="price-sale">￥{{chooseSku.sale_price}}</span>
      </div>
      <div class="sku">
        <div class="sku-item" :class="{check:currentIndex === index}" v-for="(item, index) in goodsSku" @click="changeType(index)">
          <span>{{item.sku_name}}</span>
        </div>
      </div>
      <div class="cont-buy">
        <p style="line-height: 25px;margin-right: auto;font-size:20px;">购买数量</p>
        <div style="display: flex;flex-direction: row;margin-right: 5%">
          <button class="numDown"  :disabled="number <= 1" @click="down">-</button>
          <input class="numValue" type="number" v-model="number" placeholder="0" @input="changeNum($event)"/>
          <button class="numUp"  :disabled="number >= chooseSku.stock"  @click="add">+</button>
        </div>
      </div>
    </div>
    <div class="bottom-warp">
      <div class="total">价格：￥{{total}}</div>
      <div class="into-cart" @click="addCart">加入购物车</div>
      <div class="payNow" @click="buyNow">立即购买</div>
    </div>
  </div>
</template>

<script>
  import DetailNav from '@/components/content/DetailNavBar'
  import utils from '@/common/utils'
  export default {
    name: 'detail',
    components: {
      DetailNav
    },
    data() {
      return {
        id: null,
        number: 1,
        currentIndex: 0,
        goods: {},
        goodsSku: [],
        chooseSku: {}
      }
    },
    methods: {
      down() {
        this.number = Number(this.number) - 1
      },
      add() {
        this.number = Number(this.number) + 1
      },
      changeNum(e) {
        if (e.target.value > this.chooseSku.stock) {
          this.$message('超出数量范围')
          this.number = this.chooseSku.stock
        } else {
          this.number = e.target.value.replace(/\D/g, '')
        }
      },
      changeType(index) {
        if (this.currentIndex === index) {
          this.currentIndex = -1
          this.chooseSku = this.goodsSku[0]
        } else {
          this.currentIndex = index
          this.chooseSku = this.goodsSku[index]
          if (this.number > this.chooseSku.stock) {
            this.number = this.chooseSku.stock
          }
        }
      },
      addCart: utils.throttle(function (e) {
        if (this.chooseSku) {
          if (this.chooseSku.stock === 0) {
            this.$message('没有货源了！')
          } else {
            let data = {
              goodsId: this.id,
              goodsSkuId: this.chooseSku.sku_id,
              goodsNum: this.number
            }
            console.log(data)
            this.$store.dispatch('goods/AddCart', data).then(res => {
              // 马上请求购物车数量，如果相同商品就不加1，不同就+1
              if (res.code === 200) {
                this.$message(res.msg)
              } else if (res.code === 201) {
                this.$message(res.msg)
              }
              console.log(res)
            }, err => {
              console.log(err)
            })
          }
        } else {
          this.$message('请选择规格！')
        }
      }, 2500),
      buyNow: utils.throttle(function () {
        console.log('----')
        if (this.chooseSku) {
          if (this.chooseSku.stock === 0) {
            this.$message('已无货源！')
          } else {
            let goodsList = [{
              goodsId: this.goodsId,
              skuId: this.chooseSku.skuId,
              amount: this.number
            }]
            this.$store.dispatch('goods/BuyNow', goodsList).then(res => {
              if (res.code === 1) {
                // console.log('token:', res.data.re.token)
                // let obj = {
                //   del: false,
                //   discountPrice: this.chooseGoods.specialPrice,
                //   goodsId: this.goodsId,
                //   goodsImgUrl: this.chooseGoods.imgList[0],
                //   goodsName: this.goods.goodsName,
                //   goodsNum: this.number,
                //   goodsSkuId: this.chooseGoods.skuId,
                //   goodsSkuName: this.chooseGoods.skuName,
                //   goodsState: 2,
                //   salePrice: this.chooseGoods.salePrice
                // }
                // this.$app.$base.$goto('/pages/order/submitOrder/submitOrder', 'goods', {
                //   list: [obj],
                //   token: res.data.re.token
                // })
                console.log(res)
              } else if (res.code === 0) {
                console.log(res.msg)
              } else {
                console.log(res.msg)
              }
            }, err => {
              console.log(err)
            })
          }
        } else {
          this.$message('请选择规格！')
        }
      }, 2500)
    },
    computed: {
      total () {
        return (this.chooseSku.special_price * this.number).toFixed(2)
      }
    },
    created() {
      this.id = this.$route.params.id
      this.$store.dispatch('goods/Detail',{id: this.id}).then(res => {
        console.log(res)
        if(res.code === 200) {
          this.goodsSku = res.data.goodsSku
          this.goods = res.data.goods
          this.chooseSku = this.goodsSku[0]
        }
      })
    }
  }
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 98;
    background-color: #fff;
    width: 100%;
    height: calc(100vh - 49px);
    overflow: scroll;
  }
  .el-carousel__item img {
    width: 100%;
    height: 200px;
  }
  .base-info{
    border-top: 1px solid #ddd;
  }
  .base-info h1{
    text-align: center;
  }
  .base-info p{
    margin: 0 20px;
    font-size: 18px;
  }
  .price{
    margin: 20px 20px;
    border-top: 1px solid #ddd;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  .price-tag{
    font-size: 17px;
  }
  .price-sp{
    color: red;
    margin-right: 5px;
  }
  .price-sale{
    text-decoration: line-through;
  }
  .sku{
    display: flex;
    flex-wrap: wrap;
    margin: 0 20px;
  }
  .sku-item{
    padding: 15px;
    margin: 0 10px 5px 0;
    border-radius: 15px;
    background-color: #F5F5F5;
    font-size: 16px;
  }
  .cont-buy{
    display: flex;
    flex-direction: row;
    margin: 25px 0 25px 30px;
    height: 25px;
  }
  .numDown{
    line-height: 25px;
    background-color:#E4E4E4;
    font-size: 20px;
  }
  .numValue{
    width: 50px;
    height:25px;
    line-height:25px;
    text-align: center;
    background-color:#e3e3e3;
    margin: 0 5px;
    font-size: 20px;
  }
  .numUp{
    line-height: 25px;
    background-color:#E4E4E4;
    font-size: 20px;
  }
  .check{
    border: 1px solid #FEB493;
    color: #FE6B28;
    background-color: #FEF8F8;
  }
  .bottom-warp{
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: fixed;
    z-index: 999;
    background-color: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #ccc;
  }
  .total{
    width: 50%;
    height: 49px;
    line-height: 49px;
    padding: 0 0 0 10px;
  }
  .into-cart, .payNow{
    width: 25%;
    height: 49px;
    text-align: center;
    line-height: 49px;
    border-radius: 15px;
    color: #fff;
  }
  .into-cart{
    background-color: #cc3232;
  }
  .payNow{
    background-color: #000;
  }
</style>
