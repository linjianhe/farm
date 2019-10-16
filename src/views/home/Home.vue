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
          {id: '11', img: 'http://photocdn.sohu.com/20120314/Img337695482.jpg', name: '汽车', price: 24232},
          {id: '12', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '13', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '14', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '15', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '16', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '17', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '18', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '19', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '111', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '112', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '113', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '114', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '115', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '116', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '117', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '118', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '119', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '120', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '121', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '122', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '123', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '124', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '125', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '126', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '127', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '128', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '129', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '130', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '131', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '132', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '133', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '134', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '135', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '136', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '137', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '138', img: 'http://00.minipic.eastday.com/20180509/20180509161611_f84f35ca9fddb1e4241fb74ac165cfe7_5.jpeg', name: '汽车', price: 24232},
          {id: '139', img: 'http://file16.zk71.com/File/CorpProductImages/2017/10/31/shipin_3028_0_20171031155950.jpg', name: '汽车', price: 24232},
          {id: '140', img: 'https://abc.2008php.com/2014_Website_appreciate/2014-12-09/20141209225309.jpg', name: '汽车', price: 24232},
          {id: '141', img: 'http://photocdn.sohu.com/20120314/Img337695482.jpg', name: '汽车', price: 24232},
          {id: '142', img: 'http://photocdn.sohu.com/20120314/Img337695482.jpg', name: '汽车', price: 24232},
          {id: '143', img: 'http://photocdn.sohu.com/20120314/Img337695482.jpg', name: '汽车', price: 24232}
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
