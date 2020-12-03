module.exports = {
  // essential option
  root: true,
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
  	'plugin:@typescript-eslint/recommended',
  	// 'airbnb-typescript',
  ],
  plugins: ['@typescript-eslint'],
};
