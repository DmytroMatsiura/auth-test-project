module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  plugins: ['only-error'],
  rules: {
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/block-tag-newline': 'error',
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'prettier/prettier': ['error']
  },
  globals: {
    defineModel: 'readonly'
  }
}
