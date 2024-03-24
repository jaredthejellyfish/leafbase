/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@trivago/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@c/(.*)$',
    '^@u/(.*)$',
    '^@l/(.*)$',
    '^@p/(.*)$',
    '^@/(.*)$',
    '^[./]',
  ],
};

export default config;
