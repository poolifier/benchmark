const { availableParallelism } = require('poolifier')

const executeAsyncFn = async fn => {
  try {
    await fn()
  } catch (e) {
    console.error(e)
    // eslint-disable-next-line n/no-process-exit
    process.exit(1)
  }
}

const BenchmarkDefaults = {
  poolSize: availableParallelism(),
  numIterations: 100000,
  taskType: 'CPU_INTENSIVE',
  taskSize: 5000
}

module.exports = {
  executeAsyncFn,
  BenchmarkDefaults
}
