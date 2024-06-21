import Piscina from 'piscina'

import { BenchmarkDefaults, executeAsyncFn } from './utils.cjs'

const size =
  Number.parseInt(process.env.POOL_SIZE) || BenchmarkDefaults.poolSize
const numIterations =
  Number.parseInt(process.env.NUM_ITERATIONS) || BenchmarkDefaults.numIterations
const data = {
  test: 'MYBENCH',
  taskType: process.env.TASK_TYPE || BenchmarkDefaults.taskType,
  taskSize:
    Number.parseInt(process.env.TASK_SIZE) || BenchmarkDefaults.taskSize,
}

const piscina = new Piscina({
  filename: './functions/function-to-bench.mjs',
  minThreads: size,
  maxThreads: size,
  idleTimeout: BenchmarkDefaults.idleTimeout,
})

/**
 *
 */
const run = async () => {
  const promises = new Set()
  for (let i = 0; i < numIterations; i++) {
    promises.add(piscina.run(data))
  }
  await Promise.all(promises)
  // eslint-disable-next-line n/no-process-exit
  process.exit()
}

await executeAsyncFn(run)
