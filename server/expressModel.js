const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const Midware = require('./midware/midware');
const dbModel = require('./database/modelHandle');
const CONFIG = require('./config/server');
class ExpressModel {
    constructor() {
        this.app = express();
        this.midware = '';
        this.init();
    }

    preInit() {
        // for parsing application/json
        this.app.use(bodyParser.json());
        // for parsing application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // 启用静态文件的访问 todo by xc 完善地址信息
        this.app.use(Express.static(path.join(process.cwd(), CONFIG.context)));

        /**
         * 处理所有的请求，中间件
         */
        this.app.all('*', function(req, res, next) {
            // 允许跨域
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,CONFIG");

            if (showLog) {
                let reqData = req.body;
                global.console.log(`请求：${req.path}, 内容：${JSON.stringify(reqData, 2)}`);
            }
            next();
        });

        //请求地址为空，默认重定向到index.html文件
        this.app.get('/', (req, res) => {
            res.redirect(301, 'index.html');
        });
    }

    init() {
        this.preInit();
        // 添加中间件等接口处理

        dbModel().then((data) => {
            this.tableModel = data;
            this.initMidware();
        }).then(() => {
            this.afterInit();
            // 处理接下来的逻辑
            this.run();
        })
    }

    initMidware() {
        this.midware = new Midware(this.app, this.tableModel);
    }

    afterInit() {
        // 中间件处理，请求的拦截，从这里开始
        // 对于无法匹配的规则，返回默认的内容
        //区分不同的请求返回不同的页面内容
        this.app.all('*', (req, res) => {
            // 其它get请求返回404
            res.status(404).end();
        });
    }

    run() {
        let openBrowser = CONFIG.openBrowser,
            port = CONFIG.port;

        let server = this.app.listen(port, () => {
            global.console.log(`Server Listenig At http://localhost:${port}`);
            openBrowser && opn(`http://127.0.0.1:${port}`);
        });

        server.port = port;

        server.on('error', (e) => {
            if (e.code === 'EADDRINUSE') {
                console.log(`端口[${port}]已被占用，请使用其他端口`);
                setTimeout(() => {
                    server.close();
                }, 1000);
            }
        });

        return server;
    }
}

module.exports = ExpressModel;