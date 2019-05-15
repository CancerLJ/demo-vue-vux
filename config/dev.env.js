'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  urlApi: '"http://localhost:3001/api"',
  urlUpload: '"http://www.wmm66.com"'
})
