module.exports = {
  root: true,
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2019,
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
