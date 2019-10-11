<template>
  <div class="recommends">
    <div v-for="item in recommends" class="recommends-item">
      <a href="">
        <img src="@/assets/img/testImg/yaotou.jpg" alt=""/>
        <div>{{item.text}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'recommends',
    data() {
      return {
        recommends: [
          {img: '@/assets/img/testImg/one.jpg',text: '十点推荐'},
          {img: '@/assets/img/testImg/six.jpg',text: '好吃特卖'},
          {img: '@/assets/img/testImg/three.jpg',text: '内部福利'},
          {img: '@/assets/img/testImg/yaotou.jpg',text: '初夜上新'}
        ]
      }
    }
  }
</script>

<style scoped>
  .recommends{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 15px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommends-item{
    flex: 1;
  }
  .recommends-item img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-bottom: 5px;
  }
  .recommends-item a{
    text-decoration: none;
  }
</style>
