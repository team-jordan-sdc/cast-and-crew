module.exports = function (api) {
  const isTest = api.env('test');
  const presets = ['@babel/preset-env', '@babel/preset-react'];
  return {
    presets,
  };
};
