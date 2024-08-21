import { ThreadPool } from 'nanothreads'

import functionToBench from './functions/function-to-bench.mjs'
import { BenchmarkDefaults, executeAsyncFn } from './utils.cjs'

const size =
  Number.parseInt(process.env.POOL_SIZE) || BenchmarkDefaults.poolSize
const numIterations =
  Number.parseInt(process.env.NUM_ITERATIONS) || BenchmarkDefaults.numIterations
const data = {
  taskSize:
    Number.parseInt(process.env.TASK_SIZE) || BenchmarkDefaults.taskSize,
  taskType: process.env.TASK_TYPE || BenchmarkDefaults.taskType,
  test: 'MYBENCH',
}

const threadPool = new ThreadPool({
  count: size,
  task: functionToBench,
})

/**
 *
 */
const run = async () => {
  const promises = new Set()
  for (let i = 0; i < numIterations; i++) {
    promises.add(threadPool.exec(data))
  }
  await Promise.all(promises)
  // eslint-disable-next-line n/no-process-exit
  process.exit()
}

await executeAsyncFn(run)
