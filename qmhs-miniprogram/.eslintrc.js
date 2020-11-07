module.exports = {
  extends: ['airbnb-base', 'plugin:promise/recommended'], // Airbnb 风格
  rules: {
    'arrow-parens': 'off',
    'comma-dangle': [
      'error',
      'only-multiline',
    ],
    'func-names': 'off',
    'global-require': 'off',
    'import/no-unresolved': [
      'error',
      {
        caseSensitive: true,
        commonjs: true,
        ignore: ['^[^.]'],
      },
    ],
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'no-catch-shadow': 'error',
    'no-continue': 'off',
    'no-div-regex': 'warn',
    'no-else-return': 'off',
    'no-param-reassign': 'off',
    // S 监测复杂度
    'max-len': ['error', {code: 1000}],
    complexity: ['error', 30],
    // E 监测复杂度
    'no-plusplus': 'off',
    'no-shadow': 'off',
    // enable console for this project
    'no-console': 'off',
    'no-multi-assign': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-spacing': [
      'error',
      'never',
    ],
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          ':': 'before',
          '?': 'before',
        },
      },
    ],
    'prefer-arrow-callback': 'off',
    'prefer-destructuring': 'off',
    'prefer-template': 'off',
    'quote-props': [
      1,
      'as-needed',
      {
        unnecessary: true,
      },
    ],
    semi: [
      'error',
      'never',
    ],
  },
  globals: {
    window: true,
    document: true,
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    worker: true,
    getApp: true,
    getCurrentPages: true
  },
}
