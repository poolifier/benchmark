import { ThreadPool } from 'nanothreads'
import { BenchmarkDefaults, executeAsyncFn } from './utils.cjs'
import functionToBench from './functions/function-to-bench.cjs'

const size = parseInt(process.env.POOL_SIZE) || BenchmarkDefaults.poolSize
const numIterations =
  parseInt(process.env.NUM_ITERATIONS) || BenchmarkDefaults.numIterations
const data = {
  test: 'MYBENCH',
  taskType: process.env.TASK_TYPE || BenchmarkDefaults.taskType,
  taskSize: parseInt(process.env.TASK_SIZE) || BenchmarkDefaults.taskSize
}

const threadPool = new ThreadPool({
  task: functionToBench,
  count: size
})

/**
 *
 */
async function run () {
  const promises = new Set()
  for (let i = 0; i < numIterations; i++) {
    promises.add(threadPool.exec(data))
  }
  await Promise.all(promises)
  // eslint-disable-next-line n/no-process-exit
  process.exit()
}

await executeAsyncFn(run)
