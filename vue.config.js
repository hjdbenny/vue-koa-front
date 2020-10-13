module.exports = {
    // gtiee用
    publicPath: process.env.NODE_ENV == "production" ? "/blog" : "/",
    runtimeCompiler: true,
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3011/",
                changeOrigin: true,
            },
        },
    },
};
