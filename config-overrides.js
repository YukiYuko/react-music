const { injectBabelPlugin } = require('react-app-rewired');
const rewireMobX = require("react-app-rewire-mobx");
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
  config = rewireMobX(config, env);
  config = rewireLess(config, env);
  return config;
};