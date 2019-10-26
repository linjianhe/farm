<template>
  <el-carousel :interval="3000" arrow="always" height="200px">
    <el-carousel-item v-for="(item,index) in banner" :key="index">
      <img :src="item.banner_img" alt=""/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: 'swiper',
    data() {
      return {
        banner: []
      }
    },
    methods: {
      getBanner() {
        this.$store.dispatch('home/GetBanner').then(res => {
          this.banner = res.data
        })
      }
    },
    created() {
      this.getBanner()
    }
  }
</script>

<style scoped>
  .el-carousel__item img {
    width: 100%;
    height: 200px;
  }
</style>
