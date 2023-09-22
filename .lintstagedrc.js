module.exports = {
  '*.{js,jsx,cjs,mjs}': [
    'biome format --write',
    'standard --fix',
    'eslint --cache --fix'
  ],
  '*.json': ['biome format --write'],
  '*.{md,yml,yaml}': ['prettier --cache --write']
}
