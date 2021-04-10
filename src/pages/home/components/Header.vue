<template>
  <div class="header">
    <span class="title">muzili api auto tool</span>
    <router-link to="/register" tag="span" class="register" v-show="!this.user">注册</router-link>
    <span class="user-name" v-show="this.user">用户名：{{this.user}}</span>
  </div>
</template>

<script>
export default {
  name: 'HeaderHome',
  props: {
    user: {
      type: String,
      default: ''
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
