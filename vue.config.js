module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3011/",
        changeOrigin: true
      }
    }
  }
};
