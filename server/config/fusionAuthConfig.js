const { FusionAuthClient } = require('fusionauth-node-client')
require('dotenv').config()

const client = new FusionAuthClient(
  `${process.env.API_KEY}`,
  'http://localhost:9011'
)

module.exports = client
