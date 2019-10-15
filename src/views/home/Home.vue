<template>
  <div id="home">
    <nav-bar :bgc="bgc" :fontColor="fontColor">
      <div slot="center">购物街</div>
    </nav-bar>
    <Swiper/>
    <recommends/>
    <img style="width: 100%;height: 350px;" src="@/assets/img/testImg/hot.jpg">
    <div style="height: 40px;" v-show="isFixed"></div>
    <tabControl :class="{fixed: isFixed}" class="tab-control" :title="['流行', '精款', '精选']" ref="tabControl"/>
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

  export default {
    name: 'home',
    data() {
      return {
        bgc: '#ff8198',
        fontColor: '#fff',
        isFixed: false,
        goods: [
          {img: 'http://photocdn.sohu.com/20120314/Img337695482.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'http://00.minipic.eastday.com/20180509/20180509161611_f84f35ca9fddb1e4241fb74ac165cfe7_5.jpeg', name: '汽车', price: 24232},
          {img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {img: 'https://abc.2008php.com/2014_Website_appreciate/2014-12-09/20141209225309.jpg', name: '汽车', price: 24232},
          {img: 'http://photocdn.sohu.com/20120314/Img337695482.jpg', name: '汽车', price: 24232},
          {img: 'http://photocdn.sohu.com/20120314/Img337695482.jpg', name: '汽车', price: 24232},
          {img: 'http://photocdn.sohu.com/20120314/Img337695482.jpg', name: '汽车', price: 24232}
        ],
        show: false,
        tabOffsetTop: 0
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
      this.$store.dispatch('home/LogOut').then(res => {
        // console.log(res)
      })
    },
    mounted() {
      window.addEventListener('scroll',this.handleScroll)
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll())
    },
    methods: {
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
        // let offsetTop = document.querySelector('.tab-control').offsetTop;  // 要滚动到顶部吸附的元素的偏移量
        this.isFixed = (scrollTop > this.tabOffsetTop-44 );  // 如果滚动到顶部了，this.isFixed就为true
        this.show = (scrollTop >= 1000)
        console.log(this.isFixed, this.tabOffsetTop, scrollTop)
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
