<template>
  <div id="home">
    <nav-bar :bgc="bgc" :fontColor="fontColor">
      <div slot="center">购物街</div>
    </nav-bar>
    <Swiper/>
    <recommends/>
    <img style="width: 100%;" src="@/assets/img/testImg/hot.jpg">
    <tabControl class="tab-control" :title="['流行', '精款', '精选']"/>
    <ul>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>nihao</li>
      <li>底部</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'

  import Swiper from '@/components/content/Swiper'
  import Recommends from '@/components/content/Recommends'
  import TabControl from '@/components/content/TabControl'

  export default {
    name: 'home',
    data() {
      return {
        bgc: '#ff8198',
        fontColor: '#fff'
      }
    },
    components: {
      NavBar,
      Swiper,
      Recommends,
      TabControl
    },
    created() {
      this.$store.dispatch('home/LogOut').then(res => {
        console.log(res)
      })
    }
  }
</script>

<style scoped>
  #home{
    margin-top: 44px;
    margin-bottom: 49px;
  }
  .tab-control{
    position: sticky;
    top: 44px;
    background-color: #fff;
  }
</style>
