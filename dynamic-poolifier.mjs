import { DynamicThreadPool, WorkerChoiceStrategies } from 'poolifier'

import { BenchmarkDefaults, executeAsyncFn } from './utils.cjs'

const size = parseInt(process.env.POOL_SIZE) || BenchmarkDefaults.poolSize
const numIterations =
  parseInt(process.env.NUM_ITERATIONS) || BenchmarkDefaults.numIterations
const data = {
  test: 'MYBENCH',
  taskType: process.env.TASK_TYPE || BenchmarkDefaults.taskType,
  taskSize: parseInt(process.env.TASK_SIZE) || BenchmarkDefaults.taskSize
}

const dynamicThreadPool = new DynamicThreadPool(
  Math.floor(size / 2),
  size,
  './workers/poolifier/function-to-bench-worker.mjs',
  {
    workerChoiceStrategy: WorkerChoiceStrategies.LEAST_USED,
    enableTasksQueue: true
  }
)

/**
 *
 */
const run = async () => {
  const promises = new Set()
  for (let i = 0; i < numIterations; i++) {
    promises.add(dynamicThreadPool.execute(data))
  }
  await Promise.all(promises)
  // eslint-disable-next-line n/no-process-exit
  process.exit()
}

await executeAsyncFn(run)
