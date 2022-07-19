module.exports = {
  install: (less, pluginManager, fun) => {
    fun.add('random', () => Math.random())
  }
}
