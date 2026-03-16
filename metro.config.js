const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable HTTPS
config.server = {
  ...config.server,
  https: {
    cert: './localhost+1.pem',
    key: './localhost+1-key.pem',
  },
};

module.exports = config;