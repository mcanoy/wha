'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_API_URL: '"http://home-pi.local:8181"',
  VUE_APP_CUBE_JSON: '"https://gist.githubusercontent.com/mcanoy/5ae113f00b9fc7e82bc0a4275f07453a/raw/"',
})
