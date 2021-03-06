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
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'import/first': 'error',
    'import/order': ['error', {
      'groups': [
          ['builtin', 'external'], 'internal', 'parent', 'sibling', 'index'
      ],
      'pathGroups': [
        {
          'pattern': 'react',
          'group': 'external',
          'position': 'before'
        }
      ],
      'pathGroupsExcludedImportTypes': ['react'],
      'newlines-between': 'always',
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': true
      }
    }],
    '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '_' }],
    'sort-imports': ['error', {
      'ignoreCase': true,
      'ignoreDeclarationSort': true,
      'ignoreMemberSort': false,
    }],
    'jsx-quotes': ['error', 'prefer-single'],
    'object-curly-newline': ['error', {
      'ObjectExpression': { 'multiline': true },
      'ObjectPattern': { 'multiline': true },
      'ImportDeclaration': { 'multiline': true, 'minProperties': 4 },
      'ExportDeclaration': { 'multiline': true, 'minProperties': 4 }
    }],
    '@typescript-eslint/type-annotation-spacing': 'error',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    "react/jsx-no-duplicate-props": ['error', { "ignoreCase": false }],
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
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'react-hooks'
  ],
};
