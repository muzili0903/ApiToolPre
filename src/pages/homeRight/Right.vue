<template>
  <div class="content">
    <right-index v-show="this.currentIndex==='Index'"></right-index>
    <env-dispose v-show="this.currentIndex==='envDispose'"></env-dispose>
    <sql-dispose v-show="this.currentIndex==='sqlDispose'"></sql-dispose>
    <!--<test v-show="this.currentIndex==='sqlDispose'"></test>-->
    <case-create v-show="this.currentIndex==='caseCreate'"></case-create>
    <case-auto v-show="this.currentIndex==='caseAuto'"></case-auto>
    <case-execute-log v-show="this.currentIndex==='caseExecuteLog'"></case-execute-log>
    <case-census v-show="this.currentIndex==='caseCensus'"></case-census>
  </div>
</template>

<script>
import RightIndex from './components/Index'
import EnvDispose from './components/EnvDispose'
import SqlDispose from './components/SqlDispose'
import CaseCreate from './components/CaseCreate'
import CaseAuto from './components/CaseAuto'
import CaseExecuteLog from './components/CaseExecuteLog'
import CaseCensus from './components/CaseCensus'
import test from './components/test'
import {mapState} from 'vuex'

export default {
  name: 'HomeRight',
  components: {
    RightIndex,
    EnvDispose,
    SqlDispose,
    CaseCreate,
    CaseAuto,
    CaseExecuteLog,
    CaseCensus,
    test
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
