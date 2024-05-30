import { ThreadWorker } from 'poolifier'

import functionToBench from '../../functions/function-to-bench.mjs'
import { BenchmarkDefaults } from '../../utils.cjs'

export default new ThreadWorker(functionToBench, {
  maxInactiveTime: BenchmarkDefaults.idleTimeout,
})
