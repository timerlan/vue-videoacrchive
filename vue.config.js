module.exports = {
  chainWebpack: config => {
    config.module
        .rule('js')
        .include.add(/src\/components/)
        .end()
        .use('babel')
        .loader('babel-loader');
  }
};
