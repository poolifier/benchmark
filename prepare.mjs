import { env } from 'node:process'
// eslint-disable-next-line n/no-unpublished-import
import { install } from 'husky'

const isCIEnvironment = env.CI != null
if (isCIEnvironment === false) {
  install()
}
