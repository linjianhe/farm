<template>
  <div class="login">
    <NavBar bgc="#fff" >
      <div slot="left" class="login-nav" @click="goBack"><</div>
      <div slot="center" class="login-nav">登录</div>
    </NavBar>
    <div class="login-content">
      <h1>来5斤商城</h1>
      <div class="login-form">
        <div class="login-wrap">
          <img class="login-img" src="../../assets/img/user.svg"/>
          <input type="text" class="login-input" v-model="userName" placeholder="请输入用户名" @input="userNameCheck($event)"/>
        </div>
        <div class="login-wrap">
          <img class="login-img" src="../../assets/img/pass.svg"/>
          <input v-if="isShow" type="password" class="login-input" v-model="password" placeholder="请输入密码" @keyup.enter="login" @input="passCheck($event)"/>
          <input v-else type="text" class="login-input" v-model="password" placeholder="请输入密码" @keyup.enter="login" @input="passCheck($event)"/>
          <el-switch v-model="switchValue" active-color="#13ce66" inactive-color="#ddd" @change="changeShow"></el-switch>
        </div>
        <div class="login-wrap">
          <input type="text" class="login-input" style="margin-left: 0;" v-model="code" placeholder="请输入验证码" @input="codeCheck($event)" @keyup.enter="login"/>
<!--          <img ref="captcha" @click.prevent="getCaptcha()" width="100px" height="35px" :src="codeImg"/>-->
          <a class="codeImg" v-html="codeImg" @click.prevent="getCaptcha()"></a>
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
  import { Notify,Toast } from 'vant'
  export default {
    name: 'login',
    components: {
      NavBar
    },
    data() {
      return {
        userName: 'linjianhe', //用户名
        password: '123456', //密码
        switchValue: false, //明文密码开关值
        isShow: true, //是否显示明文密码
        code: '', //验证码
        codeImg:null
      }
    },
    methods: {
      login: utils.debounce(function() {
        if(!this.userName){
          Notify({ type: 'warning', message: '账号不能为空' })
          return false
        }
        if(!this.password) {
          Notify({ type: 'warning', message: '密码不能为空' })
          return false
        }
        if(!this.code) {
          Notify({ type: 'warning', message: '验证码不能为空' })
          return false
        }
        let data = {
          userName: this.userName,
          password: this.password,
          code: this.code
        }
        this.$store.dispatch('user/Login',data).then(res => {
          if(res.code === 200) {
            Toast.success('登陆成功')
            this.$store.state.user.userInfo = res.userInfo
            this.goBack()
          } else if(res.code === 0) {
            Notify({ type: 'danger', message: '账号或密码错误' })
          } else if(res.code === 101) {
            Notify({ type: 'danger', message: '验证码错误' })
          } else {
            console.log(res.msg)
          }
        }).catch(error => {
          Notify({ type: 'danger', message: '网络发生错误' })
          console.log(error)
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
        this.userName = event.target.value.replace(/\s+/g, '');
      },
      passCheck(event) {
        this.password = event.target.value.replace(/[^\w]/g, '');
      },
      codeCheck(event) {
        this.code = event.target.value.replace(/[^\w]/g, '');
      },
      changeShow() {
        this.isShow = !this.isShow
      },
      getCaptcha() {
        // this.$refs.captcha.src = 'http://localhost:3000/users/captcha?time=' + new Date()
        this.$store.dispatch('user/Captcha').then(res => {
          this.codeImg = res
        })
      }
    },
    created () {
      this.getCaptcha()
      console.log(this.$el)
    },
    mounted() {
      console.log(this.$el)
    }
  }
</script>

<style scoped>
  .login{
    position: relative;
    z-index: 999;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }
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
  .login-wrap{
    width: 285px;
    margin: 0 auto 10px;
    border-bottom: 2px solid #ccc;
    height: 37px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .login-img{
    width: 20px;
    /*height: 20px;*/
    vertical-align: middle;
  }
  .login-input{
    width: 255px;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
    border: none;
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
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 50px auto 0;
    border-radius: 20px;
    text-align: center;
    background-color: #000;
    color: #fff;
  }
  .codeImg{
    margin: -15px 0 0 -30px;
  }
</style>
