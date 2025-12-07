module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
  ],
  overrides: [
    {
      files: ['tests/**/*.ts', 'playwright.config.ts'],
      env: {
        'playwright/playwright-test': true,
      },
    },
  ],
  rules: {
    // your custom rules here, e.g.:
    // '@typescript-eslint/no-unused-vars': ['error'],
  },
};
