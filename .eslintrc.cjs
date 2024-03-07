// eslint-disable-next-line n/no-unpublished-require
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    es2022: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022
  },
  plugins: ['simple-import-sort', 'promise', 'jsdoc'],
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:jsdoc/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended'
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  }
})
