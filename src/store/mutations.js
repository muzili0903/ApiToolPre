// mutations 改变 state 的值

export default {
  changeUserName (state, userName) {
    state.userName = userName
    try {
      localStorage.userName = userName
    } catch (e) {
    }
  }
}
