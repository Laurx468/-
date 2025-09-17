module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    API_BASE_URL: '"https://api.smarthome.example.com"'
  },
  mini: {},
  h5: {
    router: {
      mode: 'hash'
    },
    publicPath: '/'
  }
}