<template>
  <div id="home">
    <nav-bar :bgc="bgc" :fontColor="fontColor">
      <div slot="center">购物街</div>
    </nav-bar>
    <Swiper/>

    <recommends/>
    <img style="width: 100%;height: 350px;" src="@/assets/img/testImg/hot.jpg">
    <div style="height: 40px;" v-show="isFixed"></div>
    <tabControl :class="{fixed: isFixed}" class="tab-control" :title="['流行', '精款', '精选']" ref="tabControl" @changeType="changeType"/>
    <back-top v-if="show" @click.native="backTop"/>
    <goods :goods="goods"/>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  import Swiper from '@/components/content/Swiper'
  import Recommends from '@/components/content/Recommends'
  import TabControl from '@/components/content/TabControl'
  import BackTop from '@/components/content/BackTop'
  import Goods from '@/components/content/Goods'
  import { Toast } from 'vant'
  import { Notify } from 'vant'

  export default {
    name: 'home',
    data() {
      return {
        bgc: '#ff8198',
        fontColor: '#fff',
        isFixed: false,
        goods: [],
        goodsInfo: [],
        show: false,
        tabOffsetTop: 0,
      }
    },
    components: {
      NavBar,
      Swiper,
      Recommends,
      TabControl,
      BackTop,
      Goods
    },
    created() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      this.$store.dispatch('home/GetGoods').then(res => {
        console.log(res)
        if(res.code === 200) {
          this.goodsInfo = res.data
          this.goods = this.goodsInfo.filter(item => {
            return item.type === 0
          })
          Toast.success('加载成功');
        }
      })
    },
    mounted() {
      window.addEventListener('scroll',this.handleScroll)
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll())
    },
    activated() {
    },
    deactivated() {
    },
    methods: {
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
        // let offsetTop = document.querySelector('.tab-control').offsetTop;  // 要滚动到顶部吸附的元素的偏移量
        this.isFixed = (scrollTop > this.tabOffsetTop-44 );  // 如果滚动到顶部了，this.isFixed就为true
        this.show = (scrollTop >= 1000)
      },
      backTop() {
        console.log('回到顶部')
        const that = this
        let timer = setInterval(() => {
          let ispeed = -50
          document.documentElement.scrollTop += ispeed
          if (document.documentElement.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },
      changeType(index) {
        this.goods = this.goodsInfo.filter(item => {
          return item.type === index
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    margin-top: 44px;
    margin-bottom: 49px;
  }
  .fixed{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
  .tab-control{
    /*position: sticky;*/
    /*top: 44px;*/
    /*z-index: 1;*/
    background-color: #fff;
  }
</style>
