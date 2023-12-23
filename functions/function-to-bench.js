'use strict'
const { randomInt } = require('node:crypto')
const {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} = require('node:fs')

/**
 * The task function to execute during pools benchmarks.
 * NOTE: This function requires to be thread-safe.
 * @param {*} data The worker data.
 * @returns {*} The result.
 */
const functionToBench = data => {
  const TaskTypes = {
    CPU_INTENSIVE: 'CPU_INTENSIVE',
    IO_INTENSIVE: 'IO_INTENSIVE'
  }
  data = data || {}
  data.taskType = data.taskType || TaskTypes.CPU_INTENSIVE
  data.taskSize = data.taskSize || 5000
  const baseDirectory = `/tmp/poolifier-benchmarks/${randomInt(
    281474976710655
  )}`
  switch (data.taskType) {
    case TaskTypes.CPU_INTENSIVE:
      // CPU intensive task
      for (let i = 0; i < data.taskSize; i++) {
        const o = {
          a: i
        }
        JSON.stringify(o)
      }
      return { ok: 1 }
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
