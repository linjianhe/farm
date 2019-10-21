<template>
  <div id="detailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="back"><</div>
      <div slot="center" class="nav">
        <div slot="center">{{brandName}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  export default {
    name: 'BrandsDetailNav',
    props: {
      brandName: null
    },
    components: {
      NavBar
    },
    data() {
      return {
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  #detailNavBar{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    text-align: center;
    background-color: #fff;
    margin-bottom: 50px;
    height: 50px;
    line-height: 50px;
    margin-top: 0;
  }
  .back{
    font-size: 24px;
  }
  .nav{
    font-size: 25px;
  }
</style>
