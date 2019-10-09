<template>
  <div id="app">
    <tab-bar></tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import TabBar from './components/common/tabbar/TabBar'

export default {
  name: 'App',
  components: {
    TabBar
  }
}
</script>

<style lang="scss">
@import "./assets/css/base.css";
</style>
