<template>
  <div class="goods-item" @click="itemDetail">
    <img v-lazy="goodsItem.productImg || 'http://car3.autoimg.cn/cardfs/series/g26/M05/AA/A1/autohomecar__wKgHEVs8raOAIlAJAAAsu8M_vL0825.png'" alt=""/>
    <p>{{goodsItem.productName}}</p>
<!--    <p>￥:{{goodsItem.price}}</p>-->
  </div>
</template>

<script>
  export default {
    name: 'Goodsitem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      itemDetail() {
        this.$router.push('/detail/' + this.goodsItem.productId)//商品详情
        // this.$router.push({
        //   path: `/brandsDetail/${this.goodsItem.id}/${this.goodsItem.name}`
        // }) // 品牌详情
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    width: 48%;
    text-align: center;
    background-color: #fff;
    margin: 5px 0;
    border-radius: 10px;
  }
  .goods-item img{
    width: 100%;
    height: 200px;
  }
  .goods-item p{
    font-size: 14px;
    margin-bottom: 5px;
  }
  p:nth-child(3){
    margin-bottom: 20px;
  }
</style>
