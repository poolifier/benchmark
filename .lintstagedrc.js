export default {
  '*.{js,jsx,cjs,mjs}': [
    'biome format --write',
    'standard --fix',
    'eslint --cache --fix'
  ],
  '!(package.json)*.json': ['biome format --write'],
  '*.{md,yml,yaml}': ['prettier --cache --write']
}
