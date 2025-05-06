import workerpool from 'workerpool'

import functionToBench from '../../functions/function-to-bench.mjs'

const functionToBenchWrapper = (testName, taskType, taskSize) => {
  return functionToBench({
    taskSize,
    taskType,
    test: testName,
  })
}

workerpool.worker({
  functionToBench: functionToBenchWrapper,
})
