import { Tinypool } from 'tinypool'

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

const tinypool = new Tinypool({
  filename: './functions/function-to-bench.mjs',
  idleTimeout: BenchmarkDefaults.idleTimeout,
  maxThreads: size,
  minThreads: size,
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
