<template>
  <div class="header">
    <span class="title">muzili api auto tool</span>
    <router-link to="/register" tag="span" class="register" v-show="!this.userName">注册</router-link>
    <span class="user-name" v-show="this.userName">用户名：{{this.userName}}</span>
    <span class="but-submit" @click="onSubmit()">退出</span>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
  name: 'HeaderHome',
  computed: {
    ...mapState({
      userName: 'userName'
    })
  },
  methods: {
    onSubmit () {
      console.log('退出')
      axios({
        method: 'post',
        url: '/api/user/logout',
        data: {userName: this.userName}
      }).then((res) => {
        console.log(res.data)
        res = res.data
        if (res.code === 0 && res.data) {
          this.$store.commit('changeUserName', '')
          this.$router.push({path: '/signin'})
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
  .header
    display flex
    line-height .5rem
    width 100%
    background #eaeaea
    .title
      float left
      width 60%
      text-align center
      line-height .4rem
    .register, .user-name, .but-submit
      float right
      width 20%
      text-align center
      line-height .4rem
</style>
