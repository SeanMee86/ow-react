const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:4000",
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api/v1/hero'
            }
        })
    );

    app.use(
        "/heroes",
        createProxyMiddleware({
            target: "http://localhost:4000",
            changeOrigin: true,
        })
    )
};