<template>
  <div class="goods">
    <goods-item :goodsItem="item"  v-for="item in goods"/>
  </div>
</template>

<script>
  import GoodsItem from '@/components/content/GoodsItem'
  export default {
    name: 'Goods',
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsItem
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
    background-color: #ddd;
  }
</style>
