<template>
  <div>
    <header-home></header-home>
    <home-left></home-left>
    <home-right></home-right>
  </div>
</template>

<script>
import HeaderHome from './components/Header'
import HomeLeft from '@/pages/homeLeft/Left'
import HomeRight from '@/pages/homeRight/Right'

export default {
  name: 'Home',
  components: {
    HeaderHome,
    HomeLeft,
    HomeRight
  }
}
</script>

<style scoped>

</style>
