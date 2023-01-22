module.exports = {
  /* parser allow for ESLint to lint TS source code */
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  // global variables
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': [
      'warn',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false,
      },
    ],
    /* disables unused variables */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
      },
    ],
    /* empty string before return */
    'newline-before-return': 'error',
    /* camelСase for variables */
    camelcase: [
      'error',
      {
        properties: 'always',
        ignoreDestructuring: true,
      },
    ],
    'arrow-body-style': ['warn', 'as-needed'],
    'prefer-arrow-callback': 'warn',
    'no-unreachable': 'error',
    'no-else-return': 'error',
    'no-useless-return': 'error',
    'no-empty': 'error',
    'no-useless-escape': 'off',
    'import/no-useless-path-segments': 'error',
    /* prevent cycle imports */
    'import/no-cycle': 'error',
    /* prohibits re-import */
    'import/no-duplicates': 'error',
    /* throws an error if not all imports are at the beginning of the file */
    'import/first': 'error',
    /* inserts an empty string after the last import */
    'import/newline-after-import': 'error',
  },
};
