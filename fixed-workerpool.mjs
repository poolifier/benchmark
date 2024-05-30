import workerpool from 'workerpool'

import { BenchmarkDefaults, executeAsyncFn } from './utils.cjs'

const size =
  Number.parseInt(process.env.POOL_SIZE) || BenchmarkDefaults.poolSize
const numIterations =
  Number.parseInt(process.env.NUM_ITERATIONS) || BenchmarkDefaults.numIterations
const dataArray = [
  'MYBENCH',
  process.env.TASK_TYPE || BenchmarkDefaults.taskType,
  Number.parseInt(process.env.TASK_SIZE) || BenchmarkDefaults.taskSize,
]

const workerPool = workerpool.pool(
  './workers/workerpool/function-to-bench-worker.mjs',
  {
    minWorkers: size,
    maxWorkers: size,
    workerType: 'thread',
  }
)

/**
 *
 */
const run = async () => {
  const promises = new Set()
  for (let i = 0; i < numIterations; i++) {
    promises.add(workerPool.exec('functionToBench', dataArray))
  }
  await Promise.all(promises)
  // eslint-disable-next-line n/no-process-exit
  process.exit()
}

await executeAsyncFn(run)
