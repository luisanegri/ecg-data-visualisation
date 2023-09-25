module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescripteslint/recommended',
    'plugin:reacthooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescripteslint/parser',
  plugins: ['reactrefresh'],
  rules: {
    'reactrefresh/onlyexportcomponents': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
