const path = require('path')

module.exports = {
  configureWebpack: {
    node: {
      __dirname: true,
    }
  }
};
