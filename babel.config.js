console.log('Babel config detected!');

module.exports = function (api) {
  const isTest = api.env('test');
  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = ['@babel/plugin-transform-runtime'];
  return {
    presets,
    plugins
  }
};