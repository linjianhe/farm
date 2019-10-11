<template>
  <el-carousel :interval="3000" arrow="always" height="170px">
    <el-carousel-item v-for="item in 4" :key="item">
      <img src="@/assets/img/testImg/test.jpg" alt=""/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: ''
  }
</script>

<style scoped>
  .el-carousel__item img {
    width: 100%;
    height: 170px;
  }
</style>
