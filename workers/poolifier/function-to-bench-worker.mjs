import { ThreadWorker } from 'poolifier'

import functionToBench from '../../functions/function-to-bench.cjs'
export default new ThreadWorker(functionToBench)
