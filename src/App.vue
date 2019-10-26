<template>
  <div id="app">
<!--    <tab-bar></tab-bar>-->
<!--    <keep-alive include="home"><router-view/></keep-alive>-->
    <login></login>
  </div>
</template>

<script>
import TabBar from './components/common/tabbar/TabBar'
import Login from '@/views/user/login'

export default {
  name: 'App',
  components: {
    TabBar,
    Login
  }
}
</script>

<style lang="scss">
@import "./assets/css/base.css";
</style>
