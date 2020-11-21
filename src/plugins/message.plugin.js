export default {
  install(Vue, message) {
    Vue.prototype.$message = function(text) {}
  }
}
