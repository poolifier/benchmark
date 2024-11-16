export default {
  '*.{js,jsx,cjs,mjs}': [
    'biome format --no-errors-on-unmatched --write',
    'eslint --cache --fix',
  ],
  '*.{md,yml,yaml}': ['prettier --cache --write'],
  '*.json': ['biome format --no-errors-on-unmatched --write'],
}
