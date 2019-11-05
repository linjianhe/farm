<template>
  <div class="order">
    <NavBar class="order-nav">
      <div slot="left" style="font-size: 28px" @click="goBack"><</div>
      <div slot="center">我的订单</div>
    </NavBar>
    <div class="order-type">
      <div v-for="(item, index) in type" class="order-type-item" :class="{active: currentIndex === index}" @click="changeType(index)">
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  export default {
    name: 'order',
    components: {
      NavBar
    },
    data() {
      return {
        type: ['全部','待付款','待发货','待收货','待评论'],
        currentIndex: 0
      }
    },
    methods: {
      changeType(index) {
        this.currentIndex = index
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .order{
    position: relative;
    z-index: 999;
    background-color: #fff;
    height: calc(100vh - 44px);
  }
  .order-nav{
    background-color: #ff8198;
    color: #fff;
  }
  .order-type{
    margin: 44px 0 0 0;
    display: flex;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #ddd;
  }
  .order-type-item{
    flex: 1;
    text-align: center;
  }
  .active{
    color: #FE6B28;
  }
  .active span{
    border-bottom: 2px solid #FE6B28;
  }
</style>
