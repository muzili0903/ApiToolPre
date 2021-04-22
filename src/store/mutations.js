// mutations 改变 state 的值

export default {
  changeUserName (state, userName) {
    state.userName = userName
    try {
      sessionStorage.userName = userName
    } catch (e) {
    }
  },
  changeIndex (state, currentIndex) {
    state.currentIndex = currentIndex
    try {
      sessionStorage.currentIndex = currentIndex
    } catch (e) {
    }
  }
}
