module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    API_BASE_URL: '"https://dev-api.smarthome.example.com"'
  },
  mini: {},
  h5: {
    devServer: {
      host: 'localhost',
      port: 10086
    }
  }
}