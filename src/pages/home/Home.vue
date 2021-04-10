<template>
  <div>
    <signin-home v-show="!this.user"></signin-home>
    <header-home></header-home>
  </div>
</template>

<script>
import HeaderHome from './components/Header'
import SigninHome from './components/Signin'

export default {
  name: 'Home',
  data () {
    return {
      user: ''
    }
  },
  components: {
    SigninHome,
    HeaderHome
  }
}
</script>

<style scoped>

</style>
