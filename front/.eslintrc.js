const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-typescript'
  ],
  rules: {
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'object-curly-newline': ['error', {
      multiline: true,
      minProperties: 1,
    }],
    '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '^_' }],
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
        node: {
            paths: [path.resolve(__dirname, 'src')],
        },
    },
  },
  plugins: ['react', '@typescript-eslint', 'import'],
};
