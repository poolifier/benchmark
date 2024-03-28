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

const TaskTypes = {
  CPU_INTENSIVE: 'CPU_INTENSIVE',
  IO_INTENSIVE: 'IO_INTENSIVE'
}

const BenchmarkDefaults = {
  poolSize: availableParallelism(),
  numIterations: 100000,
  taskType: TaskTypes.CPU_INTENSIVE,
  taskSize: 50000,
  idleTimeout: 60000
}

module.exports = {
  BenchmarkDefaults,
  executeAsyncFn,
  TaskTypes
}
