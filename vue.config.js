module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  devServer: {
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
  configureWebpack: {
    performance: {
      hints: false,
    },
  },
};
