<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="forgetPass">
    <NavBar bgc="#fff" >
      <template v-slot:left>
        <div class="forgetPass-nav" @click="goBack"><</div>
      </template>
      <template v-slot:center>
        <div class="forgetPass-nav">找回密码</div>
      </template>
    </NavBar>
    <div class="forgetPass-form">
      <h2>忘记密码了(╥╯^╰╥)</h2>
      <div class="forgetPass-content">
        <img class="forgetPass-img" src="../../assets/img/email.svg"/>
        <input type="text" class="forgetPass-input" v-model="email" placeholder="请输入邮箱" @input="userNameCheck($event)" @blur="emailCheck"/>
      </div>
      <div class="forgetPass-content">
        <img class="forgetPass-img" src="../../assets/img/pass.svg"/>
        <input type="text" class="forgetPass-input" v-model="checkCode" placeholder="请输入验证码" @input="codeCheck($event)"/>
        <div class="sendEmail" :class="{disabled: disabled}" @click="sendEmail">{{btn}}</div>
      </div>
      <div class="forgetPass-content">
        <img class="forgetPass-img" src="../../assets/img/pass.svg"/>
        <input v-if="isShow" type="password" class="forgetPass-input" v-model="password" placeholder="请输入密码" @input="passCheck($event)"/>
        <input v-else type="text" class="forgetPass-input" v-model="password" placeholder="请输入密码" @input="passCheck($event)"/>
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ddd" @change="changeShow"></el-switch>
      </div>
    </div>
    <div class="forgetPass-btn" @click="forgetPass">确认</div>
  </div>
</template>

<script>
  import utils from '@/common/utils'
  import base from '@/common/mixins'
  import { Notify,Toast } from 'vant'
  export default {
    name: 'forgetPass',
    mixins: [base],
    data() {
      return {
      }
    },
    methods: {
      forgetPass: utils.debounce(function () {
          if(!this.email){
            Notify({ type: 'danger', message: '邮箱不能为空' })
            return false
          }
          if(!this.checkCode) {
            Notify({ type: 'danger', message: '验证码不能为空' })
            return false
          }
          if(!this.password) {
            Notify({ type: 'danger', message: '密码不能为空' })
            return false
          }
          let userInfo = {
            email: this.email,
            checkCode: this.checkCode,
            password: this.password,
          }
          this.$store.dispatch('user/ForgetPass', userInfo).then(res => {
            if(res.code === 202) {
              Notify({ type: 'warning', message: res.msg})
            }
            if(res.code === 200) {
              Toast.success('找回密码成功')
              this.$router.go(-1)
            }
            if(res.code === 101) {
              Notify({ type: 'warning', message: res.msg})
            }
            if(res.code === 0) {
              Notify({ type: 'danger', message: res.msg})
            } else {
              console.log(res.msg)
            }
          }).catch(error => {
            console.log(error)
          })
        },500)
    }
  }
</script>

<style scoped>
  .forgetPass{
    position: relative;
    z-index: 999;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }
  .forgetPass-nav{
    font-size: 21px;
  }
  .forgetPass-form{
    width: 285px;
    margin: 150px auto 0;
  }
  .forgetPass-form h2{
    text-align: center;
    margin-bottom: 80px;
    text-shadow:3px 2px 2px grey;
  }
  .forgetPass-content{
    width: 285px;
    margin: 0 auto 10px;
    border-bottom: 2px solid #ccc;
    height: 37px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .forgetPass-img{
    width: 20px;
    /*height: 20px;*/
    vertical-align: middle;
  }
  .forgetPass-input{
    width: 255px;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
    border: none;
  }
  .sendEmail{
    height: 25px;
    width: 75px;
    line-height: 25px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    background-color: #a0cfff;
    border-radius: 10px;
    align-self: center;
  }
  .disabled{
    cursor: not-allowed;
    pointer-events: none;
    background-color: #ddd;
  }
  .forgetPass-btn{
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 50px auto 0;
    border-radius: 20px;
    text-align: center;
    background-color: #000;
    color: #fff;
  }
</style>
