module.exports = {
    lintOnSave: undefined,
    configureWebpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: [{
                    loader: "html-loader"
                },
                {
                    loader: "markdown-loader"
                }
            ]
        })
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/css/variable.scss";`
            }
        }
    },
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:8888'
            }
        }
    }
}