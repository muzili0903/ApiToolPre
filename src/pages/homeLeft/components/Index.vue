<template>
  <div class="content" @click="indexClickChange">首页</div>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    indexClickChange () {
      this.$store.commit('changeIndex', 'Index')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content
    padding-top .5rem
    overflow hidden
    background green
    width 80%
    float right
</style>
