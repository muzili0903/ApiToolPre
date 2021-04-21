<template>
  <div class="content">
    <right-index></right-index>
  </div>
</template>

<script>
import RightIndex from './components/Index'
export default {
  name: 'HomeRight',
  components: {
    RightIndex
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
