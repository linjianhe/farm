<template>
  <div class="order">
    <NavBar class="order-nav">
      <div slot="left" style="font-size: 28px" @click="goBack"><</div>
      <div slot="center">我的订单</div>
    </NavBar>
    <div class="order-type">
      <div v-for="(item, index) in type" class="order-type-item" :class="{active: currentIndex === index}" @click="changeType(index)">
        <span>{{item}}</span>
      </div>
    </div>
    <div class="orders">
      <div class="order-item" v-for="(item, index) in orderList1">
        <div class="order-id">
          <div>
            <span class="order-item-id">订单编号:{{item.order.order_id}}</span>
          </div>
          <div>
            <span class="state">{{item.order.order_status | state}}</span>
          </div>
        </div>
        <div class="item-info" v-for="(item1, index1) in item.goods">
          <div class="item-img" @click="goGoodsDetail(item1)">
            <img :src="item1.productImg" alt=""/>
          </div>
          <div class="item-desc">
            <div class="item-title">{{item1.productName}}</div>
            <div class="item-sku">{{item1.goods_sku_name}}</div>
            <div class="info-bottom">
              <div class="item-price">￥{{item1.discount_price}}</div>
              <div class="item-num">x{{item1.goods_num}}</div>
            </div>
          </div>
        </div>
        <div class="item-money">
          <div>
            应付金额：<span class="order-money">￥{{item.order.order_price}}</span>
          </div>
          <div v-if="item.order.order_status < 5" @click="changeState(item.order)">
            <span class="action">{{item.order.order_status | action}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  import { Toast, Dialog } from 'vant'

  export default {
    name: 'order',
    components: {
      NavBar
    },
    data() {
      return {
        type: ['全部','待付款','待发货','待收货','待评论'],
        currentIndex: 0,
        orderList: [],
        orderList1: []
      }
    },
    filters: {
      state(data) {
        switch (data) {
          case 1: return '待付款';
          case 2: return '待发货';
          case 3: return '待收货';
          case 4: return '待评价';
          case 5: return '已完成';
          case 6: return '已取消';
        }
      },
      action(data) {
        switch (data) {
          case 1: return '去付款';
          case 2: return '催一下';
          case 3: return '去收货';
          case 4: return '去评价';
        }
      }
    },
    methods: {
      changeType(index) {
        this.currentIndex = index
        if(index > 0){
          this.orderList1 = this.orderList.filter(item => {
            return Number(item.order.order_status) === index
          })
        } else {
          this.orderList1 = this.orderList
        }
      },
      goBack() {
        this.$router.go(-1)
      },
      goGoodsDetail(item){
        console.log(item.productId)
        this.$router.push('/detail/' + item.productId)
      },
      changeState(order) {
        let status = order.order_status
        let money = order.order_price
        let order_id = order.order_id
        if (status === 2) {
          Toast('商家已经收到您的催货')
        } else if (status === 1) {
          Dialog.confirm({
            title: '提示',
            message: '确定付款么'
          }).then(() => {
            Toast.loading({
              duration: 0,
              message: '支付中...',
              forbidClick: true
            });
            this.$store.dispatch('order/ChangeState', {state: status,money: money, order_id: order_id}).then(res => {
              if (res.code === 200) {
                setTimeout(function (){Toast.success('支付成功')},800)
                order.order_status = 2
                this.changeType(1)
              }
            })
          }).catch(() => {
            // on cancel
            Toast.clear()
          })
        } else if (status === 3) {
          this.$store.dispatch('order/ChangeState', {state: status,money: money, order_id: order_id}).then(res => {
            if (res.code === 200) {
              Toast.success('收货成功')
              order.order_status = 4
              this.changeType(3)
            }
          })
        }
      },
      initOrder() {
        this.orderList = []
        this.orderList1 = []
        this.$store.dispatch('order/GetOrder').then(res => {
          if(res.code === 200) {
            this.orderList = res.data
            this.orderList1 = res.data
          }
        })
      }
    },
    created() {
      this.initOrder()
    }
  }
</script>

<style scoped>
  .order{
    position: relative;
    z-index: 999;
    background-color: #ddd;
    height: calc(100vh - 88px);
  }
  .order-nav{
    background-color: #ff8198;
    color: #fff;
  }
  .order-type{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 44px 0 0 0;
    display: flex;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .order-type-item{
    flex: 1;
    text-align: center;
  }
  .active{
    color: #FE6B28;
  }
  .active span{
    border-bottom: 2px solid #FE6B28;
  }
  .orders{
    margin-top: 88px;
    height: calc(100vh - 88px);
    overflow: scroll;
  }
  .order-item{
    margin: 10px;
    border-radius: 10px;
    background-color: #fff;
  }
  .order-id{
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
  }
  .order-item-id{
    flex: 1;
  }
  .state{
    color: orange;
    flex: 1;
    margin-right: 20px;
  }
  .item-info{
    display: flex;
    margin:5px;
    padding: 5px;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 15px;
  }
  .item-info img{
    width: 20px;
    height: 20px;
    align-self: center;
    margin-right: 5px;
    margin-left: 5px;
  }
  .item-info div img{
    width: 110px;
    height: 90px;
    margin-right: 30px;
  }
  .item-desc{
    display: flex;
    flex-direction: column;
  }
  .item-title{
    width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .item-sku{
    font-size: 13px;
  }
  .info-bottom{
    display: flex;
    margin-top: 25px;
  }
  .item-price{
    color: red;
    font-size: 18px;
    margin-right: auto;
  }
  .item-num{
    width: 25px;
    text-align: center;
  }
  .item-money{
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #ddd;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
  }
  .order-money{
    color: red;
    flex: 1;
  }
  .action{
    border: 1px solid #ddd;
    color: red;
    flex: 1;
    margin-right: 15px;
    padding: 5px;
  }
</style>
