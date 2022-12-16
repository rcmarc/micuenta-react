module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['turbo', 'eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
