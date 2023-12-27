// eslint-disable-next-line n/no-unpublished-require
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  plugins: ['promise', 'jsdoc'],
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:jsdoc/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended'
  ]
})
