<template>
  <div id="detail">
    <DetailNav></DetailNav>
    <el-carousel :interval="3000" arrow="always" height="200px">
      <el-carousel-item v-for="(item,index) in chooseSku" :key="index">
        <img :src="chooseSku.sku_url" alt=""/>
      </el-carousel-item>
    </el-carousel>
    <div class="goods-info">
      <div class="base-info">
        <h1>{{goods.productName}}</h1>
        <p>{{goods.describe}}</p>
      </div>
      <div class="price">
        <span class="price-tag">价格：</span>
        <span class="price-sp">￥:{{chooseSku.special_price}}</span>
        <span class="price-sale">￥:{{chooseSku.sale_price}}</span>
      </div>
      <div class="sku">
        <div class="sku-item" v-for="(item, index) in goodsSku" >
          <span>{{item.sku_name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DetailNav from '@/components/content/DetailNavBar'
  import Swiper from '@/components/content/Swiper'
  export default {
    name: 'detail',
    components: {
      DetailNav
    },
    data() {
      return {
        id: null,
        goods: {
          productName: '乐事薯片',
          describe: '乐事无限薯片三连罐104g*3罐休闲食品零食小吃礼包膨化',
        },
        goodsSku: [
          {sku_name: '规格一', sale_price: 100.00, special_price: 99.00, stock: 51, sku_url: 'http://img.yzcdn.cn/upload_files/2015/11/15/FhyINrmo5lRD8yxIQCeCv9mIsNEW.jpg?imageView2/2/w/580/h/580/q/75/format/jpg', is_default: 1},
          {sku_name: '规格二', sale_price: 89.00, special_price: 80.00, stock: 34, sku_url: 'http://img.yzcdn.cn/upload_files/2018/03/03/Fp0t10Fz3jF0kHAHg_wmYnlvTLy4.jpg?imageView2/2/w/580/h/580/q/75/format/jpg', is_default: 0},
          {sku_name: '规格三', sale_price: 110.00, special_price: 101.00, stock: 23, sku_url: 'http://img10.360buyimg.com/n1/jfs/t751/213/780480569/96960/9c4db708/54f3f8b6N815cecc2.jpg', is_default: 0},
          {sku_name: '规格四', sale_price: 135.00, special_price: 120.00, stock: 222, sku_url: 'http://img.feiniu.com/C/item/2015/0804/201508C040003430/_302136456_400x400.jpg', is_default: 0}
        ],
        chooseSku: {sku_name: '规格一', sale_price: 100.00, special_price: 99.00, stock: 51, sku_url: 'http://img.yzcdn.cn/upload_files/2015/11/15/FhyINrmo5lRD8yxIQCeCv9mIsNEW.jpg?imageView2/2/w/580/h/580/q/75/format/jpg', is_default: 1}
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
  .el-carousel__item img {
    width: 100%;
    height: 200px;
  }
  .base-info{
    border-top: 1px solid #ddd;
  }
  .base-info h1{
    text-align: center;
  }
  .base-info p{
    margin: 0 20px;
    font-size: 18px;
  }
  .price{
    margin: 20px 20px;
    border-top: 1px solid #ddd;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  .price-tag{
    font-size: 17px;
  }
  .price-sp{
    color: red;
    margin-right: 5px;
  }
  .price-sale{
    text-decoration: line-through;
  }
  .sku{
    display: flex;
    flex-wrap: wrap;
    margin: 0 20px;
  }
  .sku-item{
    padding: 15px;
    margin: 0 10px 5px 0;
    border-radius: 15px;
    background-color: #F5F5F5;
    font-size: 18px;
  }
</style>
