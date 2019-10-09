<template>
  <div class="tabBar">
    <tab-bar-item path="/home" activeColor="red">
      <img slot="item-icon" src="@/assets/img/tabBar/icon_tabbar_homeup.svg" alt="">
      <img slot="item-icon1" src="@/assets/img/tabBar/icon_tabbar_homeup1.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="red">
      <img slot="item-icon" src="@/assets/img/tabBar/class.svg" alt="">
      <img slot="item-icon1" src="@/assets/img/tabBar/class1.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="red">
      <img slot="item-icon" src="@/assets/img/tabBar/icon_tabbar_shoppingup.svg" alt="">
      <img slot="item-icon1" src="@/assets/img/tabBar/icon_tabbar_shoppingup1.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="red">
      <img slot="item-icon" src="@/assets/img/tabBar/icon_tabbar_myup.svg" alt="">
      <img slot="item-icon1" src="@/assets/img/tabBar/icon_tabbar_myup1.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </div>
</template>

<script>
import TabBarItem from './TabBarItem'
export default {
  name: 'TabBar',
  components: {
    TabBarItem
  }
}
</script>

<style scoped>
  .tabBar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -1px 1px rgba(100,100,100,0.2);
  }
</style>
