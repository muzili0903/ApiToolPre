<template>
  <div class="content">
    <div @click="handleClick"><span class="iconfont">&#xe68e;</span>案例管理</div>
    <div class="content-menu" v-show="this.show" @click="caseCreateClickChange">
      <i class="vxe-icon--dot"></i>创建系统案例
    </div>
    <div class="content-menu" v-show="this.show" @click="caseAutoClickChange">
      <i class="vxe-icon--dot"></i>案例自动生成
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaseManage',
  data () {
    return {
      show: false
    }
  },
  methods: {
    handleClick () {
      this.show = !this.show
    },
    caseCreateClickChange () {
      this.$store.commit('changeIndex', 'caseCreate')
    },
    caseAutoClickChange () {
      this.$store.commit('changeIndex', 'caseAuto')
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
