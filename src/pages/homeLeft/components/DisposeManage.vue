<template>
  <div class="content">
    <div @click="handleClick"><span class="iconfont">&#xe68e;</span>配置管理</div>
    <div class="content-menu" v-show="this.show" @click="envDisposeClickChange">
      <i class="vxe-icon--dot"></i>环境配置
    </div>
    <div class="content-menu" v-show="this.show" @click="sqlDisposeClickChange">
      <i class="vxe-icon--dot"></i>数据库配置
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisposeManage',
  data () {
    return {
      show: false
    }
  },
  methods: {
    handleClick () {
      this.show = !this.show
    },
    // 通过改变 sessionStorage 的 currentIndex 值来控制右边页面的显示
    envDisposeClickChange () {
      this.$store.commit('changeIndex', 'envDispose')
    },
    sqlDisposeClickChange () {
      this.$store.commit('changeIndex', 'sqlDispose')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .content
    padding-top .2rem
    overflow hidden
    background green
    width 80%
    float right
    .content-menu
      padding-top .2rem
      padding-left .1rem
</style>
