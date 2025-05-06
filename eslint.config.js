/* eslint-disable n/no-unpublished-import */
import js from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import perfectionist from 'eslint-plugin-perfectionist'
import { defineConfig } from 'eslint/config'
import neostandard, { plugins } from 'neostandard'

export default defineConfig([
  js.configs.recommended,
  plugins.promise.configs['flat/recommended'],
  ...plugins.n.configs['flat/mixed-esm-and-cjs'],
  jsdoc.configs['flat/recommended'],
  perfectionist.configs['recommended-natural'],
  ...neostandard({ noJsx: true }),
])
