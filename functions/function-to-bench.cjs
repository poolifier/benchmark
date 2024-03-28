'use strict'
/**
 * The task function to execute during pools benchmarks.
 * NOTE: This function requires to be self-contained and thread-safe (some libraries requirement).
 * @param {*} data The worker data.
 * @returns {*} The result.
 */
const functionToBench = data => {
  const { randomInt } = require('node:crypto')
  const {
    existsSync,
    mkdirSync,
    readFileSync,
    rmSync,
    writeFileSync
  } = require('node:fs')
  const { TaskTypes, BenchmarkDefaults } = require('./utils.cjs')
  data = data || {}
  data.taskType = data.taskType || BenchmarkDefaults.taskType
  data.taskSize = data.taskSize || BenchmarkDefaults.taskSize
  if (data.taskType == null) throw new Error('Task type is required')
  if (data.taskSize == null) throw new Error('Task size is required')
  if (typeof data.taskType !== 'string') {
    throw new Error('Task type must be a string')
  }
  if (!Number.isSafeInteger(data.taskSize)) {
    throw new Error('Task size must be an integer')
  }
  if (data.taskSize < 0) throw new Error('Task size must be a positive number')
  const baseDirectory = `/tmp/poolifier-benchmarks/${randomInt(
    281474976710655
  )}`
  let factorial
  switch (data.taskType) {
    case TaskTypes.CPU_INTENSIVE:
      // CPU intensive task
      if (data.taskSize === 0 || data.taskSize === 1) {
        factorial = 1n
      } else {
        data.taskSize = BigInt(data.taskSize)
        factorial = 1n
        for (let i = 1n; i <= data.taskSize; i++) {
          factorial *= i
        }
      }
      return { ok: 1, factorial }
    case TaskTypes.IO_INTENSIVE:
      // IO intensive task
      if (existsSync(baseDirectory) === true) {
        rmSync(baseDirectory, { recursive: true })
      }
      mkdirSync(baseDirectory, { recursive: true })
      for (let i = 0; i < data.taskSize; i++) {
        const filePath = `${baseDirectory}/${i}`
        writeFileSync(filePath, i.toString(), {
          encoding: 'utf8',
          flag: 'a'
        })
        readFileSync(filePath, 'utf8')
      }
      rmSync(baseDirectory, { recursive: true })
      return { ok: 1 }
    default:
      throw new Error(`Unknown task type: ${data.taskType}`)
  }
}

module.exports = functionToBench
