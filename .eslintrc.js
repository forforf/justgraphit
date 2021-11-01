module.exports = {
  env: {
    browser: true, // browser global variables
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:testing-library/react',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    // 'import'  // eslint-plugin-import
    '@typescript-eslint'
  ],
  root: true,
  rules: {
    'react/prop-types': 'off'
  },
  // overrides: [
  //   {
  //     files: ["*.test.js"],
  //     rules: {
  //       "react/react-in-jsx-scope": 0
  //     }
  //   }
  // ],
  settings: {
    react: {
      version: 'detect'
    }
  }
};