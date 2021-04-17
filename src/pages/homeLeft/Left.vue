<template>
  <div class="content">
    <left-index></left-index>
    <case-manage></case-manage>
    <dispose-manage></dispose-manage>
    <execute-manage></execute-manage>
  </div>
</template>

<script>
import LeftIndex from './components/Index'
import CaseManage from './components/CaseManage'
import DisposeManage from './components/DisposeManage'
import ExecuteManage from './components/ExecuteManage'

export default {
  name: 'HomeLeft',
  components: {
    LeftIndex,
    DisposeManage,
    CaseManage,
    ExecuteManage
  }
}
</script>

<style lang="stylus" scoped>
  .content
    background red
    width 20%
    line-height 100%
    float left
</style>
