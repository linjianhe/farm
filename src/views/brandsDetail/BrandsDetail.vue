<template>
  <div id="brandsDetail">
    <h1>{{brandName}}</h1>
    <ul class="brandCar">
      <li v-for="item in brandCar">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'brandsDetail',
    data() {
      return {
        id: null,
        brandCar: [],
        brandName: null
      }
    },
    methods: {

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
  #brandsDetail h1{
    text-align: center;
    background-color: #ddd;
  }
  .brandCar li{
    margin: 0 0 15px;
  }
</style>
