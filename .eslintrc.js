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
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12, // Equivalent to ES2021, so might be updated to match the env.es2021.
    sourceType: 'module',
  },
  rules: {
    'react/jsx-uses-vars': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
};
