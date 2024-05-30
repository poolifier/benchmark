// Reexport to workaround nanothreads 'module not found' error
module.exports = {
  BenchmarkDefaults: require('../utils.cjs').BenchmarkDefaults,
  TaskTypes: require('../utils.cjs').TaskTypes,
}
