import Piscina from 'piscina'

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

const piscina = new Piscina({
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
    promises.add(piscina.run(data))
  }
  await Promise.all(promises)
  // eslint-disable-next-line n/no-process-exit
  process.exit()
}

await executeAsyncFn(run)
