import workerpool from 'workerpool'

import { BenchmarkDefaults, executeAsyncFn, parseIntOr } from './utils.cjs'

const size = parseIntOr(process.env.POOL_SIZE, BenchmarkDefaults.poolSize, 1)
const numIterations = parseIntOr(
  process.env.NUM_ITERATIONS,
  BenchmarkDefaults.numIterations
)
const dataArray = [
  'MYBENCH',
  process.env.TASK_TYPE || BenchmarkDefaults.taskType,
  parseIntOr(process.env.TASK_SIZE, BenchmarkDefaults.taskSize),
]

const workerPool = workerpool.pool(
  './workers/workerpool/function-to-bench-worker.mjs',
  {
    maxWorkers: size,
    minWorkers: Math.floor(size / 2),
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
