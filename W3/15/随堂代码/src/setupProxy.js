const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/functions',
        createProxyMiddleware({
            target: 'https://rsvokvjzqdsfxyxobrks.supabase.co/functions',
            changeOrigin: true,
            logger:console
        })
    );
};