<template>
  <div class="goods-item">
    <img :src="goodsItem.img" alt=""/>
    <p>{{goodsItem.name}}</p>
    <p>￥:{{goodsItem.price}}</p>
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
    }
  }
</script>

<style scoped>
  .goods-item{
    width: 48%;
    text-align: center;
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
