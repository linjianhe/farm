<template>
  <div class="forgetPass">
    <NavBar bgc="#fff" >
      <div slot="left" class="forgetPass-nav" @click="goBack"><</div>
      <div slot="center" class="forgetPass-nav">找回密码</div>
    </NavBar>
    <div class="forgetPass-form">
      <h2>忘记密码了(╥╯^╰╥)</h2>
      <div class="forgetPass-content">
        <img class="forgetPass-img" src="../../assets/img/email.svg"/>
        <input type="text" class="forgetPass-input" v-model="email" placeholder="请输入邮箱" onkeyup="this.value=this.value.replace(/\s+/g,'')" @input="userNameCheck($event)"/>
      </div>
      <div class="forgetPass-content">
        <img class="forgetPass-img" src="../../assets/img/pass.svg"/>
        <input type="text" class="forgetPass-input" v-model="checkCode" placeholder="请输入验证码" onkeyup="this.value=this.value.replace(/[^\w]/g,'');" @input="passCheck($event)"/>
        <div class="sendEmail">发送邮件</div>
      </div>
      <div class="forgetPass-content">
        <img class="forgetPass-img" src="../../assets/img/pass.svg"/>
        <input v-if="isShow" type="password" class="forgetPass-input" v-model="password" placeholder="请输入密码" onkeyup="this.value=this.value.replace(/[^\w]/g,'');" @input="passCheck($event)"/>
        <input v-else type="text" class="forgetPass-input" v-model="password" placeholder="请输入密码" onkeyup="this.value=this.value.replace(/[^\w]/g,'');" @input="passCheck($event)"/>
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ddd" @change="changeShow"></el-switch>
      </div>
    </div>
    <div class="forgetPass-btn" @click="forgetPass">确认</div>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  import utils from '@/common/utils'
  export default {
    name: 'forgetPass',
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
      forgetPass() {

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
    width: 75px;
    line-height: 35px;
    text-align: center;
    color: #b14545;
    font-size: 12px;
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
