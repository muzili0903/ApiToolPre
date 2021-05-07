<template>
  <div class="container-register">
    <form action="">
      <span class="title">账号：</span><input type="text" placeholder="请输入账号" v-model="registerData.user">
      <span class="title">密码：</span><input type="password" placeholder="请输入密码" v-model="registerData.password">
      <span class="title">确认密码：</span><input type="password" placeholder="请确认密码" v-model="registerData.pwd">
    </form>
    <span class="but-submit" @click="onSubmit()"><button class="but">提交</button></span>
    <dialog-bar v-model="dialog.sendVal" :type="this.dialog.type" :title="this.dialog.title"
                :content="this.dialog.content" @confirmSkip="clickConfirmSkip"></dialog-bar>
  </div>
</template>

<script>
import axios from 'axios'
import dialogBar from 'common/Dialog'

export default {
  name: 'RegisterHome',
  components: {
    dialogBar
  },
  data () {
    return {
      registerData: {
        user: '',
        password: '',
        pwd: ''
      },
      dialog: {
        sendVal: false,
        content: '',
        title: '注册温馨提示',
        type: 'confirm'
      }
    }
  },
  methods: {
    clickConfirmSkip () {
      this.$store.commit('changeUserName', '')
      this.$router.push({path: '/signin'})
    },
    onSubmit () {
      if (!this.registerData.user) {
        this.dialog.sendVal = true
        this.dialog.content = '请输入账号，再提交'
        return
      }
      if (!this.registerData.password) {
        this.dialog.sendVal = true
        this.dialog.content = '请输入密码，再提交'
        return
      }
      if (!this.registerData.pwd) {
        this.dialog.sendVal = true
        this.dialog.content = '请确认密码，再提交'
        return
      }
      if (this.registerData.password !== this.registerData.pwd) {
        this.dialog.sendVal = true
        this.dialog.content = '密码不一致，请重新密码'
        return
      }
      let formData = new FormData()
      for (let key in this.registerData) {
        formData.append(key, this.registerData[key])
      }
      axios({
        method: 'post',
        url: '/api/user/register',
        data: formData
      }).then((res) => {
        console.log(res.data)
        res = res.data
        if (res.code === 0) {
          this.dialog.sendVal = true
          this.dialog.content = '用户注册成功'
          this.dialog.type = 'confirm-skip'
        }
        if (res.code !== 0) {
          this.dialog.sendVal = true
          this.dialog.content = res.data.msg
        }
      }).catch((error) => {
        this.dialog.sendVal = true
        this.dialog.content = 'issues 页面出错了' + error
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

  .container-register
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
    margin-left 40%
    .but
      margin-top .1rem
      border-radius .1rem
      border none
      display: inline-block
      text-decoration: none
      background-color: #4CAF50
      color white
</style>
