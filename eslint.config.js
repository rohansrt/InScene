import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'scripts', 'qa-artifacts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2022, globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // An effect whose arrow has an expression body returns that value, and React calls it as
      // cleanup on unmount. DOM methods like scrollIntoView now return Promises in Chrome, which
      // crashes with "destroy is not a function". Use a block body (returning a cleanup arrow is fine).
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name=/^use(Layout|Insertion)?Effect$/] > ArrowFunctionExpression.arguments:first-child[body.type!='BlockStatement'][body.type!='ArrowFunctionExpression']",
          message: 'Use a block body for effect callbacks ({ ... }). A returned value is treated as a cleanup function.',
        },
      ],
    },
  },
)
