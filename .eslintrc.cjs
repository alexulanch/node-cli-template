module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
    typescriptPath: require.resolve('typescript'),
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-console': 'warn',
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: [
        '*.config.js',
        '*.config.cjs',
        'vitest.config.ts',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
      ],
      parserOptions: {
        project: './tsconfig.eslint.json',
        typescriptPath: require.resolve('typescript'),
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-console': 'off',
        'prettier/prettier': 'off',
      },
    },
  ],
  ignorePatterns: ['dist/', 'node_modules/', 'docs/'],
};
