'use strict'
const WorkerNodes = require('worker-nodes')

const { BenchmarkDefaults, executeAsyncFn } = require('./utils.cjs')

const size =
  Number.parseInt(process.env.POOL_SIZE) || BenchmarkDefaults.poolSize
const numIterations =
  Number.parseInt(process.env.NUM_ITERATIONS) || BenchmarkDefaults.numIterations
const data = {
  test: 'MYBENCH',
  taskType: process.env.TASK_TYPE || BenchmarkDefaults.taskType,
  taskSize: Number.parseInt(process.env.TASK_SIZE) || BenchmarkDefaults.taskSize
}

const workerNodes = new WorkerNodes(require.resolve('./functions/index.cjs'), {
  minWorkers: Math.floor(size / 2),
  maxWorkers: size,
  taskTimeout: BenchmarkDefaults.idleTimeout
})

/**
 *
 */
const run = async () => {
  const promises = new Set()
  for (let i = 0; i < numIterations; i++) {
    promises.add(workerNodes.call.functionToBench(data))
  }
  await Promise.all(promises)
  // eslint-disable-next-line n/no-process-exit
  process.exit()
}
;(async () => {
  await executeAsyncFn(run)
})()
