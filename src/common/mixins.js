import { Notify } from 'vant'
import NavBar from '@/components/common/navBar/NavBar'
const base = {
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

export default base
