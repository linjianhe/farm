<template>
  <div class="order">
    <NavBar class="order-nav">
      <div slot="center">我的订单</div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  export default {
    name: 'order',
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .order{
    position: relative;
    z-index: 999;
    background-color: #fff;
    height: 100vh;
  }
  .order-nav{
    background-color: #ff8198;
    color: #fff;
  }
</style>
