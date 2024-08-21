export default {
  '*.{js,jsx,cjs,mjs}': ['biome format --write', 'eslint --cache --fix'],
  '*.{md,yml,yaml}': ['prettier --cache --write'],
  '*.json': ['biome format --write'],
}
