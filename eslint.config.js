import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', '.next', 'node_modules', 'public'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Client-side files
    files: ['src/app/**/*.{js,jsx,ts,tsx}', 'src/components/**/*.{js,jsx,ts,tsx}', 'src/hooks/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  // Server-side / lib files (Node.js globals)
  {
    files: ['src/lib/**/*.{js,ts}', 'src/app/api/**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  // Root / config files
  {
    files: ['*.js', '*.mjs', '*.config.{js,mjs}', 'next.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'off',
    }
  }
)
