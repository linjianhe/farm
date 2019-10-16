<template>
  <div id="detailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="back"><</div>
      <div slot="center" class="nav">
        <div class="nav-title" v-for="(item,index) in title" @click="itemClick(index)" :class="{active: currentIndex === index}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  export default {
    name: 'detailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
      },
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  #detailNavBar{
    height: 44px;
  }
  .back{
    font-size: 24px;
  }
  .nav{
    display: flex;
    font-size: 14px;
  }
  .nav-title{
    flex: 1;
  }
  .active{
    color: red;
  }
</style>
