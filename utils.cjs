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
  IO_INTENSIVE: 'IO_INTENSIVE',
}

const BenchmarkDefaults = {
  idleTimeout: 60000,
  numIterations: 100000,
  poolSize: availableParallelism(),
  taskSize: 1000,
  taskType: TaskTypes.CPU_INTENSIVE,
}

// Parse an integer, keeping 0 (valid) but rejecting missing/invalid values.
const parseIntOr = (value, fallback, min = 0) => {
  const parsed = Number.parseInt(value, 10)
  if (!Number.isSafeInteger(parsed) || parsed < min) return fallback
  return parsed
}

module.exports = {
  BenchmarkDefaults,
  executeAsyncFn,
  parseIntOr,
  TaskTypes,
}
