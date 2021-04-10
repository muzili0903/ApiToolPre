<template>
  <div>
    <header-home></header-home>
    <signin-home></signin-home>
  </div>
</template>

<script>
import SigninHome from './components/Signin'
import HeaderHome from './components/Header'

export default {
  name: 'Home',
  components: {
    HeaderHome,
    SigninHome
  }
}
</script>

<style scoped>

</style>
