import { concurrent } from '@bitair/concurrent.js'

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

concurrent.config({
  maxThreads: size,
  minThreads: size,
  threadIdleTimeout: BenchmarkDefaults.idleTimeout,
})

const functionToBenchModule = concurrent.import(
  new URL('./functions/index.mjs', import.meta.url)
)

/**
 *
 */
const run = async () => {
  const promises = new Set()
  for (let i = 0; i < numIterations; i++) {
    const { functionToBench } = await functionToBenchModule.load()
    promises.add(functionToBench(data))
  }
  await Promise.all(promises)
  // eslint-disable-next-line n/no-process-exit
  process.exit()
}

await executeAsyncFn(run)
