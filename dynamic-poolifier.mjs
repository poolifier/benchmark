import { DynamicThreadPool, WorkerChoiceStrategies } from 'poolifier'

import { BenchmarkDefaults, executeAsyncFn, parseIntOr } from './utils.cjs'

const size = parseIntOr(process.env.POOL_SIZE, BenchmarkDefaults.poolSize, 1)
const numIterations = parseIntOr(
  process.env.NUM_ITERATIONS,
  BenchmarkDefaults.numIterations
)
const data = {
  taskSize: parseIntOr(process.env.TASK_SIZE, BenchmarkDefaults.taskSize),
  taskType: process.env.TASK_TYPE || BenchmarkDefaults.taskType,
  test: 'MYBENCH',
}

const dynamicThreadPool = new DynamicThreadPool(
  Math.floor(size / 2),
  size,
  './workers/poolifier/function-to-bench-worker.mjs',
  {
    enableTasksQueue: true,
    workerChoiceStrategy: WorkerChoiceStrategies.LEAST_USED,
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
