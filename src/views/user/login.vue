<template>
  <div class="login">
    <NavBar bgc="#fff" >
      <div slot="left" class="login-nav" @click="goBack"><</div>
      <div slot="center" class="login-nav">登录</div>
    </NavBar>
    <div class="login-content">
      <h1>来5斤商城</h1>
      <div class="login-form">
        <div style="margin-bottom: 10px">
          <img class="login-img" src="../../assets/img/user.svg"/>
          <input type="text" class="login-input" v-model="userName" placeholder="请输入用户名" onkeyup="this.value=this.value.replace(/\s+/g,'')" @input="userNameCheck($event)"/>
        </div>
        <div style="display: flex">
          <img class="login-img" src="../../assets/img/pass.svg"/>
          <input v-if="isShow" type="password" class="login-input1" v-model="password" placeholder="请输入密码" onkeyup="this.value=this.value.replace(/[^\w]/g,'');" @input="passCheck($event)"/>
          <input v-else type="text" class="login-input1" v-model="password" placeholder="请输入密码" onkeyup="this.value=this.value.replace(/[^\w]/g,'');" @input="passCheck($event)"/>
          <el-switch style=" margin-left: 30px;" v-model="value" active-color="#13ce66" inactive-color="#ddd" @change="changeShow"></el-switch>
        </div>
      </div>
    </div>
    <div class="login-other">
      <span class="register" @click="Register">立即创建</span>
      <span class="forgetPass" @click="forgetPass">忘记密码</span>
    </div>
    <div class="login-btn" @click="login">登录</div>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  import utils from '@/common/utils'
  export default {
    name: 'login',
    components: {
      NavBar
    },
    data() {
      return {
        userName: '',
        password: '',
        value: false,
        isShow: true
      }
    },
    methods: {
      login: utils.debounce(function() {
        let data = {
          userName: this.userName,
          password: this.password
        }
        this.$store.dispatch('user/Login',data).then(res => {
          console.log(res)
        })
      }, 500),
      goBack() {
        this.$router.go(-1)
      },
      Register() {
        this.$router.push('/register')
      },
      forgetPass() {
        this.$router.push('/forgetPass')
      },
      userNameCheck(event) {
        this.userName = event.target.value.replace(/\s+/g,"");
        console.log(this.userName)
      },
      passCheck(event) {
        this.password = event.target.value.replace(/\s+/g,"");
      },
      changeShow() {
        this.isShow = !this.isShow
      }
    },
    created () {
    }
  }
</script>

<style scoped>
  .login-nav{
    font-size: 22px;
  }
  .login-content{
    width: 285px;
    margin: 150px auto 0;
  }
  .login-content h1{
    text-align: center;
    margin-bottom: 80px;
    text-shadow:3px 2px 2px grey;
  }
  .login-form{
    width: 285px;
    margin: 0 auto;
  }
  .login-form div{
    width: 285px;
    margin: 0 auto;
    border-bottom: 2px solid #ccc;
    height: 37px;
  }
  .login-img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .login-input, .login-input1{
    width: 245px;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
    border: none;
  }
  .login-input1{
    width: 210px;
  }
  .login-other{
    margin: 10px auto 0;
    width: 250px;
    display: flex;
    font-size: 12px;
    color: #FFAD66;
  }
  .register{
    margin-right: auto;
  }
  .login-btn{
    width: 170px;
    height: 40px;
    line-height: 40px;
    margin: 50px auto 0;
    border-radius: 20px;
    text-align: center;
    background-color: #000;
    color: #fff;
  }
</style>
