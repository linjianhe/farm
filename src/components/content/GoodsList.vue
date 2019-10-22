<template>
  <div class="goodsList">
    <GoodsListItem v-for="item in goodsList" :goods="item"></GoodsListItem>
  </div>
</template>

<script>
  import GoodsListItem from '@/components/content/GoodsListItem'
  export default {
    name: 'goodsList',
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goodsList{
    width: 100%;
    margin-top: 44px;
    background-color: #EAEAEA;
    height: calc(100vh - 44px - 49px);
    overflow: auto;
  }
</style>
