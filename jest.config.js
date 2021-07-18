module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: ['**/tests/unit/**/*.spec.js', '**/tests/integration/**/*.spec.js']
}
