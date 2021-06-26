module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/riichi/pointer/' : '/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
