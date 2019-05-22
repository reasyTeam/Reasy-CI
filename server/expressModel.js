const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const Midware = require('./midware/midware');
const dbModel = require('./database/dataBaseModel');
const CONFIG = require('./config/server');
const opn = require('opn');
const multiparty = require('multiparty');
const FileCheck = require('./generator/fileCheck');
const util = require('./util/lib');
const fo = require('./util/fileOperation');

let api = CONFIG.api || '/';
let uploadDir = path.join(fo.cwd, CONFIG.writePath);

class ExpressModel {
    constructor() {
        this.app = express();
        this.tableModel = {};
        this.fileCheck = new FileCheck();
        this.midware = '';
        this.init();
    }

    preInit() {
        // for parsing application/json
        this.app.use(bodyParser.json());
        // for parsing application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // 启用静态文件的访问 todo by xc 完善地址信息
        this.app.use(express.static(path.join(fo.cwd, CONFIG.context)));
        // if (!fs.existsSync(uploadDir)) {
        //     fs.mkdirSync(uploadDir);
        // }
        if (!fo.existsSync(uploadDir)) {
            fo.mkdirSync(uploadDir);
        }
        this.app.use(express.static(path.join(fo.cwd, CONFIG.writePath)));

        /**
         * 处理所有的请求，中间件
         */
        this.app.all('*', function(req, res, next) {
            // 允许跨域
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,CONFIG");

            let reqData = req.body;
            util.log(`请求：${req.path}, 内容：${JSON.stringify(reqData, 2)}`);
            next();
        });

        //请求地址为空，默认重定向到index.html文件
        this.app.get('/', (req, res) => {
            res.redirect(301, 'index.html');
        });

        //上传中间件
        this.initUploadMidware();
    }

    init() {
        this.preInit();
        // 添加中间件等接口处理

        dbModel().then((data) => {
            this.tableModel = data;
            this.initMidware();
            this.initDownloadMidware();
        }).then(() => {
            this.afterInit();
            // 处理接下来的逻辑
            this.run();
        });
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
            res.writeHead(404, { 'content-type': 'text/plain' });
            res.end('404');
        });
    }

    initUploadMidware() {

        this.app.use(`${api}upload`, (req, res) => {
            let form = new multiparty.Form({ uploadDir });

            form.parse(req, (err, fields, files) => {
                if (err) {
                    res.writeHead(400, { 'content-type': 'text/plain' });
                    res.end("invalid request: " + err.message);
                    return;
                }

                try {
                    if (!files.file || files.file.length === 0) {
                        res.writeHead(200, { 'content-type': 'application/json' });
                        res.end(JSON.stringify({ error: 'need a file' }));
                        return;
                    }

                    let inputFile = files.file[0],
                        ids = fields.file_id,
                        name = inputFile.originalFilename,
                        url = inputFile.path;

                    let errors = this.fileCheck.startCheck(url);
                    if (errors.length > 0) {
                        res.writeHead(200, { 'content-type': 'application/json' });
                        res.end(JSON.stringify({
                            errors
                        }));
                        // 删除原有的文件
                        fo.unlink(url);
                        return;
                    }

                    if (ids && ids.length > 0) {
                        if (ids[0] === '') {
                            createFileData.call(this);
                        } else {
                            this.tableModel.File.query({ id: +ids[0] }).then(data => {
                                if (data.length > 0) {
                                    this.tableModel.File.update({
                                        id: +data[0]['id'],
                                        name,
                                        url: path.relative(fo.cwd, url)
                                    });
                                    // 删除原有的文件
                                    fo.unlink(data[0]['url']);
                                    // 清空数据缓存
                                    this.tableModel.FileDataBase.updateData(+data[0]['id']);
                                    res.writeHead(200, { 'content-type': 'application/json' });
                                    res.end(JSON.stringify({
                                        filePath: +ids[0],
                                        fileName: name
                                    }));
                                } else {
                                    // 添加资源
                                    createFileData.call(this);
                                }
                            });
                        }
                    }

                    function createFileData() {
                        this.tableModel.File.create({
                            name,
                            url: path.relative(fo.cwd, url)
                        }).then(data => {
                            res.writeHead(200, { 'content-type': 'application/json' });
                            res.end(JSON.stringify({
                                filePath: data.id,
                                fileName: data.name
                            }));
                        });
                    }
                } catch (err) {
                    util.log(err, util.LOG_TYPE.ERROR);
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify({
                        error: '服务器错误，请稍后再试'
                    }));
                    return;
                }

            });
        });
    }

    initDownloadMidware() {
        this.app.use(`${api}download`, (req, res) => {
            let id = req.query.id,
                fileName = req.query.fileName,
                promiseNext = null;

            switch (req.query.type) {
                case 'module':
                    promiseNext = this.tableModel.File.query({
                        id: id
                    })
                    break;
                default:
                    promiseNext = this.tableModel.File.query({
                        id: id
                    }).then(data => {
                        if (data.length > 0) {
                            return data[0]['url'];
                        } else {
                            res.status(404).end();
                        }
                    })
                    break;
            }

            promiseNext.then(data => {
                // fo.downloadFile(fileName, path.join(fo.cwd, data), res);
                fo.downloadFile(fileName, data, res);
            }).catch(err => {
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end();
            });
        })
    }

    initGenerateMidware() {
        this.app.use(`${api}generate`, (req, res) => {
            let requestBody = req.body;
            this.tableModel.ModuleHandle.generate(data)
                .then(url => {
                    fo.downloadFile(requestBody.fileName, url, res, function(url) {
                        if (requestBody.id === 'default') {
                            fo.unlink(url);
                        } else {
                            this.tableModel.Module.findAll({
                                where: {
                                    id: requestBody.id
                                }
                            }).then(data => {
                                fo.renameSync(data[0].zip_url, url);
                            })
                        }
                    });
                }).catch(err => {
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end();
                })
        });
    }

    run() {
        let openBrowser = CONFIG.openBrowser,
            port = CONFIG.port;

        let server = this.app.listen(port, () => {
            console.log(`Server Listenig At http://localhost:${port}`);
            openBrowser && opn(`http://127.0.0.1:${port}`);
        });

        server.port = port;

        server.on('error', (e) => {
            if (e.code === 'EADDRINUSE') {
                util.log(`端口[${port}]已被占用，请使用其他端口`, util.LOG_TYPE.WARNING);
                setTimeout(() => {
                    server.close();
                }, 1000);
            }
        });

        return server;
    }
}

module.exports = ExpressModel;