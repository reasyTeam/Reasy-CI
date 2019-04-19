const marked = require("marked");
const renderer = new marked.Renderer();

module.exports = {
    lintOnSave: undefined,
    configureWebpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: [{
                    loader: "html-loader"
                },
                {
                    loader: "markdown-loader",
                    options: {
                        pedantic: true,
                        renderer
                    }
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
                // target: 'http://localhost:8888'
                target: 'http://192.168.137.1:8888'
            }
        }
    }
}