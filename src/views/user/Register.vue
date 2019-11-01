<template>
  <div class="forgetPass">
    <NavBar bgc="#fff" >
      <div slot="left" class="forgetPass-nav" @click="goBack"><</div>
      <div slot="center" class="forgetPass-nav">注册</div>
    </NavBar>
    <div class="forgetPass-form">
      <h2>欢迎新用户注册~</h2>
      <div class="form-content">
        <img class="forgetPass-img" src="../../assets/img/email.svg"/>
        <input type="text" class="forgetPass-input" v-model="email" placeholder="请输入邮箱" @input="userNameCheck($event)" @blur="emailCheck"/>
      </div>
      <div class="form-content">
        <img class="forgetPass-img" src="../../assets/img/pass.svg"/>
        <input type="text" class="forgetPass-input" v-model="checkCode" placeholder="请输入验证码" @input="codeCheck($event)"/>
        <div class="sendEmail" :class="{disabled: disabled}" @click="sendEmail">{{btn}}</div>
      </div>
      <div class="form-content">
        <img class="forgetPass-img" src="../../assets/img/pass.svg"/>
        <input v-if="isShow" type="password" class="forgetPass-input" v-model="password" placeholder="请输入密码" @input="passCheck($event)"/>
        <input v-else type="text" class="forgetPass-input" v-model="password" placeholder="请输入密码" @input="passCheck($event)"/>
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ddd" @change="changeShow"></el-switch>
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
          this.$message({
            type: 'warning',
            message: '请输入正确的邮箱'
          })
          return false
        }
      },
      codeCheck(event) {
        this.checkCode = event.target.value.replace(/[^\w]/g,'');
      },
      passCheck(event) {
        this.password = event.target.value.replace(/[^\w]/g,'');
      },
      register: utils.debounce(function () {
        if(!this.email){
          this.$message({
            message: '邮箱不能为空',
            type: 'warning'
          })
          return false
        }
        if(!this.checkCode) {
          this.$message({
            message: '验证码不能为空',
            type: 'warning'
          })
          return false
        }
        if(!this.password) {
          this.$message({
            message: '密码不能为空',
            type: 'warning'
          })
          return false
        }
        let userInfo = {
          email: this.email,
          checkCode: this.checkCode,
          password: this.password,
        }
        this.$store.dispatch('user/Register', userInfo).then(res => {
          if(res.code === 202) {
            this.$message({
              type: 'warning',
              message: res.msg
            })
          }
          if(res.code === 200) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.$router.go(-1)
          }
          if(res.code === 101) {
            this.$message({
              type: 'warning',
              message: res.msg
            })
          }
          if(res.code === 0) {
            this.$message({
              type: 'error',
              message: res.msg
            })
          } else {
            console.log(res.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      }, 500),
      sendEmail() {
        if(!this.email) {
          this.$message({
            type: 'warning',
            message: '请先输入邮箱'
          })
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
        this.$store.dispatch('user/SendEmail', data).then(res => {
          if(res.code === 200) {
            this.$message({
              type: 'success',
              message: res.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
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
  .form-content{
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
  .disabled{
    cursor: not-allowed;
    pointer-events: none;
    background-color: #ddd;
  }
</style>
