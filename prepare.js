const isCIEnvironment = process.env.CI != null
if (isCIEnvironment === false) {
  // eslint-disable-next-line n/no-unpublished-require
  require('husky').install()
}
