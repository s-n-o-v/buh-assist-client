import nuxtEslintConfig from '@nuxt/eslint-config'

export default [
  ...nuxtEslintConfig,
  {
    rules: {
      'prettier/prettier': 'off', // мы используем Prettier отдельно
    }
  }
]
