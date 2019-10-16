<template>
  <div id="detail">
    <DetailNav></DetailNav>
    <Swiper/>
  </div>
</template>

<script>
  import DetailNav from '@/components/content/DetailNavBar'
  import Swiper from '@/components/content/Swiper'
  export default {
    name: 'detail',
    components: {
      DetailNav,
      Swiper
    },
    data() {
      return {
        id: null
      }
    },
    methods: {

    },
    created() {
      this.id = this.$route.params.id
    }
  }
</script>

<style scoped>
</style>
