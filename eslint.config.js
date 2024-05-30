/* eslint-disable n/no-unpublished-import */
// const { defineConfig } = require('eslint-define-config')

// module.exports = defineConfig({
//   root: true,
//   env: {
//     es2022: true,
//     node: true
//   },
//   parserOptions: {
//     sourceType: 'module',
//     ecmaVersion: 2022
//   },
//   plugins: ['simple-import-sort', 'promise', 'jsdoc'],
//   extends: [
//     'standard',
//     'eslint:recommended',
//     'plugin:n/recommended',
//     'plugin:jsdoc/recommended',
//     'plugin:import/recommended',
//     'plugin:promise/recommended'
//   ],
//   rules: {
//     'simple-import-sort/imports': 'error',
//     'simple-import-sort/exports': 'error'
//   }
// })

import js from '@eslint/js'
import { defineFlatConfig } from 'eslint-define-config'
import jsdoc from 'eslint-plugin-jsdoc'
import nodePlugin from 'eslint-plugin-n'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import neostandard from 'neostandard'

export default defineFlatConfig([
  ...neostandard({
    globals: {
      ...globals.commonjs,
      ...globals.node,
    },
  }),
  js.configs.recommended,
  ...nodePlugin.configs['flat/mixed-esm-and-cjs'],
  jsdoc.configs['flat/recommended'],
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
])
