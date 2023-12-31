import { Tinypool } from 'tinypool'
import { BenchmarkDefaults, executeAsyncFn } from './utils.cjs'

const size = parseInt(process.env.POOL_SIZE) || BenchmarkDefaults.poolSize
const numIterations =
  parseInt(process.env.NUM_ITERATIONS) || BenchmarkDefaults.numIterations
const data = {
  test: 'MYBENCH',
  taskType: process.env.TASK_TYPE || BenchmarkDefaults.taskType,
  taskSize: parseInt(process.env.TASK_SIZE) || BenchmarkDefaults.taskSize
}

const tinypool = new Tinypool({
  filename: './workers/tinypool/function-to-bench-worker.mjs',
  minThreads: size,
  maxThreads: size,
  idleTimeout: 60000 // this is the same as poolifier default
})

/**
 *
 */
async function run () {
  const promises = new Set()
  for (let i = 0; i < numIterations; i++) {
    promises.add(tinypool.run(data))
  }
  await Promise.all(promises)
  // eslint-disable-next-line n/no-process-exit
  process.exit()
}

await executeAsyncFn(run)
