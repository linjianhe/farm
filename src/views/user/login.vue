<template>
  <div class="login" style="margin-top: 50px;">
    <NavBar bgc="#fff" >
      <div slot="left" class="login-nav"><</div>
      <div slot="center" class="login-nav">登录</div>
    </NavBar>
    <div class="login-content">
      <h1>来5斤商城</h1>

    </div>
    <input v-model="userName"/>
    <input v-model="password"/>
    <button @click="login">登录</button>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navBar/NavBar'
  export default {
    name: 'login',
    components: {
      NavBar
    },
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    methods: {
      login() {
        let data = {
          userName: this.userName,
          password: this.password
        }
        this.$store.dispatch('user/Login',data).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  .login-nav{
    font-size: 22px;
  }
</style>
