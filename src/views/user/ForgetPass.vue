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
  import NavBar from '@/components/common/navBar/NavBar'
  import utils from '@/common/utils'
  import { Notify,Toast } from 'vant'
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
        isShow: true,
        btn: '发送邮件',
        time: 60,
        disabled: false
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
        this.email = event.target.value.replace(/\s+/g,'');
      },
      emailCheck() {
        if(!this.email) {
          return false
        }
        let result = (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(this.email)
        if(!result) {
          Notify({ type: 'danger', message: '请输入正确的邮箱' })
          return false
        }
      },
      codeCheck(event) {
        this.checkCode = event.target.value.replace(/[^\w]/g,'');
      },
      passCheck(event) {
        this.password = event.target.value.replace(/[^\w]/g,'');
      },
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
        },500),
      sendEmail() {
        if(!this.email) {
          Notify({ type: 'warning', message: '请先输入邮箱'})
          return false
        }
        let result = (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(this.email)
        if(!result) {
          return false
        }
        let data = {
          email: this.email
        }
        this.time = 60
        this.timer()
        this.disabled = true
        console.log('----')
        this.$store.dispatch('user/SendEmail', data).then(res => {
          if(res.code === 200) {
            Notify({ type: 'success', message: res.msg})
          } else {
            Notify({ type: 'danger', message: res.msg})
          }
        }).catch(error => {
          console.log(error)
        })
      },
      timer() {
        if (this.time > 1) {
          this.time--;
          this.btn = this.time + 's'
          setTimeout(this.timer, 1000)
        } else {
          this.time = 60
          this.disabled = false
          this.btn = "发送邮件"
        }
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
