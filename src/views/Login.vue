<template>
  <div class="login">
    <img class="logo" src="../assets/img/logo.png">
    <img class="logo-text" src="../assets/img/logo-text.png">
    <form v-on:submit.prevent="submit">
      <i class="icon user-icon"></i>
      <div class="form-group">
        <input
          class="user"
          type="text"
          placeholder="请输入账号"
          v-model="form.username"
        >
      </div>
      <div class="form-group">
      <i class="icon password-icon"></i>
        <input
          class="password"
          type="password"
          placeholder="密码"
          v-model="form.password"
          v-on:keyup.enter="submit()"
        >
      </div>
      <button class="btn">登录</button>
    </form>
    <img src="../assets/img/logo-text2.png" class="logo-text2">
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['USER_SIGNIN']),
    submit () {
      this.login()
    },
    login () {
      this.$http.get('/fidnews/v1/mobileWeb/login', {
        params: {
          userName: this.form.username,
          password: this.form.password
        }
      })
      .then((data) => {
        if (data.code !== '-1') {
          let user = {
            menus: data.menus,
            userName: this.form.username,
            password: this.form.password
          }
          this.USER_SIGNIN(user)
          this.$router.push({ path: '/' })
        } else {
          this.form.password = ''
        }
      })
    }
  }
}
</script>

<style scoped>
.login{
  text-align: center;
}
.logo{
  display: block;
  margin-left: auto;
  margin-right: auto; 
  margin-top: 3.2rem;
  width: 2.4rem;
  height: 2.4rem;
}
.logo-text{
  display: block;
  margin-left: auto;
  margin-right: auto; 
  margin-top: 0.4rem;
  margin-bottom: 1.73rem;
  width: 2.33rem;
  height: 0.47rem;
}
.form-group input{
  display: block;
  width: 6.37rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0.56rem;
  line-height: 0.8rem;
  border: none;
  border-radius: 0;
  outline:none;
  background-color:transparent;  
  FILTER: alpha(opacity=0); /*androd*/  
  appearance:none;  /*下拉框去掉右侧图标*/  
  -moz-appearance:none;  
  -webkit-appearance:none;
  text-indent: 0.9rem;
  border-bottom: 1px solid #2e2e37;
}
input:-webkit-autofill { 
-webkit-box-shadow: 0 0 0px 1000px #fff inset; 
}
.icon{
  display: block;
  width: 0.64rem;
  height: 0.64rem;
  background-repeat: no-repeat;
  background-size: 0.64rem;
  position: absolute;
  left: 1.9rem;
}
.user-icon{
  background-image: url('../assets/img/1.png');
}
.password-icon{
  background-image: url('../assets/img/2.png');
}
.btn{
  height: 1.01rem;
  width: 6.37rem;
  background-color: #2e2e37;
  color: #f4ce46;
  border-radius: 0.1rem;
  margin-top: 0.27rem;
}
.logo-text2{
  width: 2.41rem;
  height: 0.69rem;
  position: absolute;
  bottom: 0.8rem;
  left: 5rem;
  transform: translate(-50%);
}
</style>
