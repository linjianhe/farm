<template>
  <div class="profile">
    <div class="profile-img">
      <img src="@/assets/img/testImg/yaotou.jpg" alt=""/>
      <span>林剑河</span>
    </div>
    <div class="profile-menu">
      <div class="profile-menu-item" @click="goOrder">
        <img src="@/assets/img/order.svg"/>
        <span>我的订单</span>
        <p>></p>
      </div>
      <div class="profile-menu-item">
        <img src="@/assets/img/address.svg"/>
        <span>地址管理</span>
        <p>></p>
      </div>
      <div class="profile-menu-item">
        <img src="@/assets/img/purse.svg"/>
        <span>我的钱包</span>
        <p>></p>
      </div>
      <div>
        <img src="@/assets/img/message.svg"/>
        <span>我的消息</span>
        <p>></p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'profile',
  data() {
    return {
      // title: ['我的订单', '地址管理', '我的钱包', '我的消息']
    }
  },
  methods: {
    goOrder() {
      this.$router.push({
        path: '/order'
      })
    }
  },
  created() {
    this.$store.dispatch('home/Test').then(res => {
      console.log(res)
    })
    // axios.get('/goods').then(res => {
    //   console.log('===--', res)
    // })
  }
}
</script>

<style scoped>
  .profile-img{
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to bottom right, red, #FF8D66, #FFBC14, yellow);
  }
  .profile-img img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .profile-menu{
    margin-top: 20px;
  }
  .profile-menu div{
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
  }
  .profile-menu div img{
    width: 30px;
    height: 30px;
    margin-left: 30px;
    margin-right: 20px;
  }
  .profile-menu div p{
    width: 70px;
    text-align: center;
    font-size: 22px;
  }
  .profile-menu div span{
    flex: 1;
  }
  .profile-menu-item{
    border-bottom: 1px solid #eee;
  }
</style>
