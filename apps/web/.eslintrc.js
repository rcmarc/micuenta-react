module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'next',
    'turbo'
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
  },
  env: {
    es6: true,
  },
};
