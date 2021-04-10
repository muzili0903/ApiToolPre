<template>
  <div class="container-signin">
    <form action="">
      <span class="title">账号：</span><input type="text" placeholder="请输入账号" v-model="signinData.user">
      <span class="title">密码：</span><input type="password" placeholder="请输入密码" v-model="signinData.password">
    </form>
    <span class="but-submit" @click="onSubmit()"><button class="but">登录</button></span>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SigninHome',
  data () {
    return {
      signinData: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let formData = new FormData()
      for (let key in this.signinData) {
        formData.append(key, this.signinData[key])
      }
      axios({
        method: 'post',
        url: '/api/user/login',
        data: formData
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log('issues 页面出错了', error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

  .container-signin
    margin: 5rem auto
    border: 1px solid red
    width: 6rem
    height: 4rem
    form
      width: 90%;
      margin: auto;
      margin-top .1rem
      // border: .01rem solid gray;
      display: flex;
      flex-wrap: wrap;
      input
        text-align: center
        width: 60%;
        height: .5rem;
        margin-bottom: .2rem;
        border: .01rem solid black;
    .title
      width 30%
      line-height .5rem
      margin-bottom: .2rem;
      text-align center

  .but-submit
    font-size .3rem
    margin-left 42%
    .but
      margin-top .1rem
      border-radius .1rem
      border none
      display: inline-block
      text-decoration: none
      background-color: #4CAF50
      color white
</style>
