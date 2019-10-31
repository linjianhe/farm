<template>
  <div class="category">
    <NavBar class="nav">
      <div slot="center">分类</div>
    </NavBar>
    <div class="category-content">
      <div class="category-left">
        <div v-for="(item,index) in category" class="category-item" :class="{check: currentIndex=== index}" @click="choose(index)">{{item}}</div>
      </div>
      <div class="category-right">
        <goods :goods="goods"></goods>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  import Goods from '@/components/content/Goods'
  export default {
    name: 'category',
    components: {
      NavBar,
      Goods
    },
    data() {
      return {
        category: ['气球','手机','电脑','小车','衣服','裤子','足球','面包','篮球','羽毛球','鞋子','帽子'],
        currentIndex: 0,
        goods: []
      }
    },
    methods: {
      choose(index) {
        this.currentIndex = index
        if(index >= 1){
          this.$store.dispatch('home/GetCarsCopy',index).then(res => {
            this.goods = res.info
          })
        }
      }
    },
    created() {
      this.$store.dispatch('home/GetCars').then(res => {
        this.goods = res.info
      })
    },
  }
</script>

<style scoped>
  .nav{
    background-color: #ff8198;
    color: #fff;
  }
  .category-content{
    width: 100%;
    display: flex;
    height: calc(100vh - 44px - 49px);
    overflow: auto;
    margin-top: 44px;
  }
  .category-item{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #eee;
  }
  .category-left{
    width: 25%;
    overflow: auto;
  }
  .category-right{
    width: 75%;
    overflow: auto;
  }
  .check{
    border-left: 2px solid #000;
    background-color: #fff;
    font-size: 18px;
  }
</style>
