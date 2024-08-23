import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

const developmentOff = process.env.NODE_ENV === 'development' ? 'off' : 'error'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.{vue,ts}'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      'no-unused-vars': developmentOff,
      'no-console': developmentOff,
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-nested-ternary': 'off',
      'no-bitwise': 'off',
      'no-multi-assign': 'off',
      'no-restricted-exports': 'off',
      'vue/multi-word-component-names': 'off',
      'import/no-extraneous-dependencies': 'off',
      'consistent-return': 'off',
      'no-useless-escape': 'off',
      'default-case': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-namespace': 'off'
    }
  },
  {
    files: ['**/components/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'error'
    }
  },
  {
    files: ['./mobile/**/*.ts', './tests/**/*.ts'],
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['**/*.vue', '**/types.ts', '**/*.d.ts'],
    rules: {
      'no-unused-vars': 'off'
    }
  },
  {
    ignores: ['node_modules', 'dist', '**/fonts/**', 'build']
  }
]
