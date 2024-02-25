module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'react/jsx-uses-vars': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'tailwindcss/no-custom-classname': 'off',
    '@typescript-eslint/prefer-readonly': 'warn',
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
