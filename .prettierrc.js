module.exports = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  sortingMethod: 'lineLength',
  stripNewlines: true, // Optional, based on your preference
  importTypeOrder: ['NPMPackages', 'localImports'],
  newlineBetweenTypes: true, // Optional, based on your preference
  pluginSearchDirs: ['./node_modules'],
  plugins: ['./node_modules/prettier-plugin-sort-imports'],
};
