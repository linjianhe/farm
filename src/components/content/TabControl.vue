<template>
  <div class="tabControl">
    <div class="tabControl-item" v-for="(item,index) in title" :class="{active:index === currentIndex}" @click="changeTab(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tabControl',
    props: {
      title: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      changeTab(index) {
        this.currentIndex = index
        this.$emit('changeType', index)
      }
    }
  }
</script>

<style scoped>
  .tabControl{
    display: flex;
    text-align: center;
  }
  .tabControl-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tabControl-item span{
    padding: 0 5px 3px;
  }
  .active{
    color: #ff5777;
  }
  .active span{
    border-bottom: 3px solid #ff8198;
  }
</style>
