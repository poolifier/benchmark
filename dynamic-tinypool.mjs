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
  filename: './functions/function-to-bench.mjs',
  minThreads: Math.floor(size / 2),
  maxThreads: size,
  idleTimeout: BenchmarkDefaults.idleTimeout
})

/**
 *
 */
const run = async () => {
  const promises = new Set()
  for (let i = 0; i < numIterations; i++) {
    promises.add(tinypool.run(data))
  }
  await Promise.all(promises)
  // eslint-disable-next-line n/no-process-exit
  process.exit()
}

await executeAsyncFn(run)
