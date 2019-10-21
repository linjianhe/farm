<template>
  <div id="brandsDetail">
    <BrandsDetailNav :brandName="brandName"></BrandsDetailNav>
    <div>
      <ul class="brandCar">
        <li v-for="item in brandCar" :key="item" @click="detail(item)"><span>></span>{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BrandsDetailNav from '@/components/content/BrandsDetailNav'
  export default {
    name: 'brandsDetail',
    data() {
      return {
        id: null,
        brandCar: [],
        brandName: null
      }
    },
    components: {
      BrandsDetailNav
    },
    methods: {
      detail(item) {
        this.$router.push({
          path: '/carDetail',
          params: {
            id: item.id
          }
        })
      }
    },
    created() {
      this.id = this.$route.params.id
      this.brandName = this.$route.params.name
      this.$store.dispatch('brandsDetail/GetBrandsDetail', this.id).then(res => {
        console.log(res)
        this.brandCar = res.data.info
      })
    }
  }
</script>

<style scoped>
  #brandsDetail{
    position: relative;
    z-index: 999;
    background-color: #fff;
    height: 100vh;
    overflow: scroll;
  }
  .brandCar{
    margin-top: 50px;
  }
  .brandCar li{
    margin: 10px 0 0;
    list-style-type: none;
    background-color: #bbb;
    height: 30px;
    line-height: 30px;
  }
  .brandCar li span{
    color: #ccc;
  }
</style>
