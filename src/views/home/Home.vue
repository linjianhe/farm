<template>
  <div id="home">
    <nav-bar :bgc="bgc" :fontColor="fontColor">
      <div slot="center">购物街</div>
    </nav-bar>
    <Swiper/>
    <recommends/>
    <img style="width: 100%;height: 150px;" src="@/assets/img/testImg/hot.jpg">
    <tabControl :class="{fixed: fixed}" class="tab-control" :title="['流行', '精款', '精选']"/>
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
        fontColor: '#fff',
        fixed: false
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
    },
    mounted() {
      window.addEventListener('scroll',this.handleScroll)
    },
    methods: {
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
        let offsetTop = document.querySelector('.tab-control').offsetTop;  // 要滚动到顶部吸附的元素的偏移量
        this.Fixed = (scrollTop > offsetTop-44 );  // 如果滚动到顶部了，this.isFixed就为true
      }
    }
  }
</script>

<style scoped>
  #home{
    margin-top: 44px;
    margin-bottom: 49px;
  }
  /*.fixed{*/
  /*  position: fixed;*/
  /*  top: 44px;*/
  /*  z-index: 20;*/
  /*}*/
  .tab-control{
    position: sticky;
    top: 44px;
    z-index: 1;
    background-color: #fff;
  }
</style>
