module.exports = {
  root: true,
  rules: {
    'import/extensions': ['off'],
    'import/no-default-export': ['off'],
    'no-plusplus': ['off'],
  },
  env: { browser: false, es2024: true },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
};
