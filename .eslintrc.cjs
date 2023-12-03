module.exports = {
  root: true,
  env: {
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  ignorePatterns: ['tests/*']
}
