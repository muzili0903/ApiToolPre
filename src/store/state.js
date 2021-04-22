// 存公用数据
let defaultUser = ''
let defaultIndex = 'Index'
try {
  if (sessionStorage.userName) {
    defaultUser = sessionStorage.userName
    defaultIndex = sessionStorage.currentIndex
    console.log('defaultUser', defaultUser)
    console.log('defaultIndex', defaultIndex)
  }
} catch (e) {
}

export default {
  // localStorage 本地存储
  // city 优先从 localStorage.city 取值，取不到值就默认为 defaultCity=上海
  userName: defaultUser,
  currentIndex: defaultIndex
}
