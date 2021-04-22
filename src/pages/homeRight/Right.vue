<template>
  <div class="content">
    <right-index v-show="this.currentIndex==='Index'"></right-index>
    <env-dispose v-show="this.currentIndex==='envDispose'"></env-dispose>
  </div>
</template>

<script>
import RightIndex from './components/Index'
import EnvDispose from './components/EnvDispose'
import {mapState} from 'vuex'

export default {
  name: 'HomeRight',
  components: {
    RightIndex,
    EnvDispose
  },
  computed: {
    ...mapState({
      currentIndex: 'currentIndex'
    })
  }
}
</script>

<style lang="stylus" scoped>
  .content
    // background red
    width 86%
    height 100%
    line-height 100%
    float left
</style>
