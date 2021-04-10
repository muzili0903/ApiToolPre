<template>
  <div class="header">
    <span class="title">muzili api auto tool</span>
    <router-link to="/register" tag="span" class="register">注册</router-link>
  </div>
</template>

<script>
export default {
  name: 'HeaderHome'
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
      width 40%
      text-align center
      line-height .4rem
</style>
