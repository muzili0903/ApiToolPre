<template>
  <div class="header">
    <span class="title">muzili api auto tool</span>
    <router-link to="/register" tag="span" class="register" v-show="!this.userName">注册</router-link>
    <span class="user-name" v-show="this.userName">用户名：{{this.userName}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeaderHome',
  computed: {
    ...mapState({
      userName: 'userName'
    })
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
    .register
      float right
      width 20%
      text-align center
      line-height .4rem
    .user-name
      float right
      width 20%
      text-align center
      line-height .4rem
</style>
