<template>
  <div class="forgetPass">
    <NavBar bgc="#fff" >
      <div slot="left" class="forgetPass-nav" @click="goBack"><</div>
      <div slot="center" class="forgetPass-nav">注册</div>
    </NavBar>
    <div class="forgetPass-form">
      <h2>欢迎新用户注册~</h2>
      <div style="margin-bottom: 10px">
        <img class="forgetPass-img" src="../../assets/img/email.svg"/>
        <input type="text" class="forgetPass-input" v-model="email" placeholder="请输入邮箱" onkeyup="this.value=this.value.replace(/\s+/g,'')" @input="userNameCheck($event)"/>
      </div>
      <div style="display: flex;margin-bottom: 10px;">
        <img class="forgetPass-img" src="../../assets/img/pass.svg"/>
        <input type="text" class="forgetPass-input1" v-model="checkCode" placeholder="请输入验证码" onkeyup="this.value=this.value.replace(/[^\w]/g,'');" @input="codeCheck($event)"/>
        <div class="sendEmail" style="margin-left: 30px;" @click="sendEmail">发送邮件</div>
      </div>
      <div style="display: flex">
        <img class="forgetPass-img" src="../../assets/img/pass.svg"/>
        <input v-if="isShow" type="password" class="forgetPass-input1" v-model="password" placeholder="请输入密码" onkeyup="this.value=this.value.replace(/[^\w]/g,'');" @input="passCheck($event)"/>
        <input v-else type="text" class="forgetPass-input1" v-model="password" placeholder="请输入密码" onkeyup="this.value=this.value.replace(/[^\w]/g,'');" @input="passCheck($event)"/>
        <el-switch style=" margin-left: 40px;" v-model="value" active-color="#13ce66" inactive-color="#ddd" @change="changeShow"></el-switch>
      </div>
    </div>
    <div class="agree">
      <span>注册即同意并遵守<label>《用户服务协议》</label></span>
    </div>
    <div class="forgetPass-btn" @click="register">确认</div>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  import utils from '@/common/utils'
  export default {
    name: 'register',
    components: {
      NavBar
    },
    data() {
      return {
        email: '',
        checkCode: '',
        password: '',
        value: false,
        isShow: true
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      changeShow() {
        this.isShow = !this.isShow
      },
      userNameCheck(event) {
        this.email = event.target.value.replace(/\s+/g,"");
      },
      codeCheck(event) {
        this.checkCode = event.target.value.replace(/\s+/g,"");
      },
      passCheck(event) {
        this.password = event.target.value.replace(/\s+/g,"");
      },
      register: utils.debounce(function () {
        let userInfo = {
          email: this.email,
          checkCode: this.checkCode,
          password: this.password,
        }
        this.$store.dispatch('user/Register', userInfo).then(res => {
          if(res.result.code === 202) {
            this.$message({
              type: 'warning',
              message: res.result.msg
            })
          }
          if(res.result.code === 200) {
            this.$message({
              type: 'success',
              message: res.result.msg
            })
          }
        })
      }, 500),
      sendEmail() {
        let data = {
          email: 'linjianhe0902@163.com'
        }
        this.$store.dispatch('user/SendEmail', data).then(res => {
          console.log('11')
        })
      }
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
  .forgetPass-form div{
    width: 285px;
    margin: 0 auto;
    border-bottom: 2px solid #ccc;
    height: 37px;
  }
  .forgetPass-img{
    width: 20px;
    /*height: 20px;*/
    vertical-align: middle;
  }
  .forgetPass-input, .forgetPass-input1{
    width: 245px;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
    border: none;
  }
  .forgetPass-input1{
    width: 210px;
  }
  .sendEmail{
    line-height: 35px;
    text-align: center;
    color: #b14545;
    font-size: 12px;
  }
  .agree{
    width: 285px;
    margin: 40px auto;
    font-size: 13px;
  }
  .agree span label{
    color: #b14545;
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
