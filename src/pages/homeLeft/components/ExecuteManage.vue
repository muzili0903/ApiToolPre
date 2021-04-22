<template>
  <div class="content">
  <div @click="handleClick"><span class="iconfont">&#xe68e;</span>执行管理</div>
    <div class="content-menu" v-show="this.show" @click="caseExecuteLogClickChange">
      <i class="vxe-icon--dot"></i>案例执行记录
    </div>
    <div class="content-menu" v-show="this.show" @click="caseCensusClickChange">
      <i class="vxe-icon--dot"></i>案例统计
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExecuteManage',
  data () {
    return {
      show: false
    }
  },
  methods: {
    handleClick () {
      this.show = !this.show
    },
    caseExecuteLogClickChange () {
      this.$store.commit('changeIndex', 'caseExecuteLog')
    },
    caseCensusClickChange () {
      this.$store.commit('changeIndex', 'caseCensus')
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
