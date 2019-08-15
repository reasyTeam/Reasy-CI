const fo = require('../util/fileOperation');
const { formatCode, deepClone, log, LOG_TYPE, getType } = require('../util/lib');
const cuid = require('cuid');
const compressing = require('compressing');

class ModuleHandle {
    constructor(dataBase) {
        this.dataBase = dataBase;
        this.cache = {
            curId: -1,
            // 目录结构信息
            direct: {},
            // 页面配置信息，id: config
            config: {}
        }
        this.components = null;
    }

    writeFile(filePath, data = {}) {
        fo.writeJs(data, filePath);
    }

    unlinkFile(filePath) {
        fo.unlink(filePath);
    }

    // 根据id删除文件
    unlink() {

    }

    reset() {
        this.cache = {
            curId: -1,
            direct: {},
            config: {}
        }
    }

    getModuleConfig(id) {
        return this.dataBase.tables.Module.findAll({
            where: {
                id
            }
        }).then(data => {
            if (data.length > 0) {
                let res = fo.readJs(data[0].url);
                res.groupId = data[0].group_id;
                res.template = data[0].template;
                return res;
            }
            return {};
        }).catch(err => {
            return {};
        })
    }

    updateModuleConfig(data) {
        return this.dataBase.tables.Module.findAll({
            where: {
                id: data.id
            }
        }).then(qdata => {
            if (qdata.length > 0) {
                fo.writeJs(data.config, qdata[0].url);
                data.template && this.dataBase.tables.Module.update({ template: data.template }, {
                    where: {
                        id: data.id
                    }
                });
            }
            return {}
        })
    }

    // 生成真正的代码，生成代码不做保存模板的操作
    generate(data) {
        let queryCmd = '';

        if (data.id !== 'default') {
            let cloneData = deepClone(data);
            delete cloneData.template;
            this.updateModuleConfig(cloneData);
            queryCmd = 'SELECT fileType, `module`.name as moduleName FROM `group` JOIN `dependence`, `module` WHERE `group`.dependence_id = `dependence`.id AND `group`.id = ' + data.groupId + ' AND `group`.id = `module`.group_id AND `module`.id = ' + data.id;
        } else {
            queryCmd = 'SELECT fileType FROM `dependence` JOIN `group` WHERE `group`.dependence_id = `dependence`.id AND `group`.id = ' + data.groupId;
        }
        // 去除默认值属性
        this.formatConfig(data.config.cfgList, data.groupId);
        return this.dataBase.sequelize
            .query(queryCmd, {
                type: this.dataBase.sequelize.QueryTypes.SELECT
            })
            .then(queryData => {
                if (queryData.length > 0) {
                    // 数据处理
                    // return this.cfgToCode(data.config, queryData[0]['fileType'], data.template, queryData[0]['moduleName']);
                    return this.cfgToCode(data, queryData[0]);
                } else {
                    log(`file_id[${id}]找不到对应的文件数据`, LOG_TYPE.WARNING);
                    return -1;
                }
            }).catch(e => {
                // 错误处理
                log(`获取File表数据出错，${LOG_TYPE}`, LOG_TYPE.ERROR);
                return -1;
            });
    }

    formatConfig(config, groupId) {
        this.components = global.cacheData[groupId];
        if (!this.components) {
            // todo by xc 添加读取数据
        }
        let nameIndex = this.components.nameIndex,
            cptCfg = this.components.components_list;
        for (let key in config) {
            let itemCfg = config[key];
            let cptAttr = cptCfg[nameIndex[itemCfg.name]].attrs;
            itemCfg['ignore'] = {};
            this.formatObj(itemCfg, cptAttr);
        }
    }

    formatObj(cfg, defaultCfg) {
        let cfgAttrs = cfg.attrs;
        for (let key in cfgAttrs) {
            if (defaultCfg[key].ignore === true) {
                cfg.ignore[key] = cfgAttrs[key];
                delete cfgAttrs[key];
                continue;
            }
            if (defaultCfg[key]['defaultValue'] === cfgAttrs[key]) {
                delete cfgAttrs[key];
            } else if (JSON.stringify(cfgAttrs[key]) === JSON.stringify(defaultCfg[key]['defaultValue'])) {
                delete cfgAttrs[key];
            }
        }
    }

    cfgToCode(data, queryData) {
        let { cfgList, sortArray } = data.config,
            template = data.template,
            fileType = queryData.fileType,
            name = queryData.name || `page${data.id}`,
            basePath = `uploads/download/${data.groupId}`;

        let generateCode = this.createCode(cfgList, sortArray);
        let outCode = formatCode(template, generateCode);
        // 根据当前的组件库，确定文件类型
        switch (fileType) {
            case 1: // vue文件
                fo.writeFile(outCode, `${basePath}/${name}.vue`);
                break;
            case 2: // js和html文件
                // 写入文件
                fo.writeFile(generateCode.html, `${basePath}${name}/${name}.html`);
                fo.writeFile(outCode, `${basePath}${name}/${name}.js`);
                break;
            case 3: // react js文件
                fo.writeFile(outCode, `${basePath}${name}/${name}.js`);
                break;
        }
        let url = `${basePath}${name}.zip`;
        return compressing.zip.compressDir(`${basePath}${name}`, url)
            .then(() => {
                fo.rmdir(`${basePath}${name}`);
                return url;
            }).catch(err => {
                fo.rmdir(`${basePath}${name}`);
            });
    }

    createCode(cfgList, sortArray) {
        let htmlCode = '',
            jsCode = '',
            generate = this.components.generate;

        sortArray.forEach(id => {
            let cfg = cfgList[id],
                name = cfg.name,
                template = generate[name].template;

            if (typeof template === 'function') {
                template = template.call(cfg);
            } else {
                template += '';
            }

            htmlCode += this.createHtml(cfg, template, cfgList);
            jsCode += this.createJs(cfg, cfgList);
        });

        return {
            html: htmlCode,
            js: jsCode
        }
    }

    createComHtml(cfg, cfgList) {
        let generate = this.components.generate,
            template = generate[cfg.name].template;

        if (typeof template === 'function') {
            template = template.call(cfg);
        } else {
            template += '';
        }

        if (cfg) {
            return this.createHtml(cfg, template, cfgList);
        }
        return '';
    }

    createHtml(cfg, template, cfgList) {
        if (cfg.isContainer) {
            return template.replace(/\{([^\}]*)\}/g, (str, key) => {
                let match = key.match(/([a-z]+)\:(\S+)/i);
                if (match) {
                    let command = match[1],
                        express = match[2],
                        param = '';

                    if (/\[\w+\]/.test(express)) {
                        let matchE = express.match(/([a-z]+)\[(\w+)\]/i);
                        express = matchE[1];
                        param = matchE[2];
                    }

                    let data = this.getText(express, cfg, true);
                    if (param) {
                        data = data[param];
                    }

                    switch (command) {
                        case 'for':
                            let outHtml = '';
                            if (getType(data) === 'Array') {
                                data.map(i => {
                                    outHtml += this.createComHtml(cfgList[i], cfgList);
                                });
                            }
                            return outHtml;
                            break;
                        default:
                            // 未完待续
                            return this.createHtml(cfgList, [data.id]);
                            break;
                    }
                }
                return key;
            });
        } else {
            return template.replace(/\{([^\}]*)\}/g, (str, key) => {
                return this.getText(key, cfg);
            });
        }
    }

    createJs(cfg, cfgList) {
        let generate = this.components.generate[cfg.name],
            template = generate.script || '';

        // todo by xc 修改
        if (cfg.isContainer) {
            return '';
        }

        if (cfg.isContainer && generate.script) {
            let key = cfg.showOption.formList,
                data = cfg.attrs[key],
                obj = null;

            let match = generate.formListData.split(':');
            switch (match(0)) {
                case 'object':
                    obj = {};

                    function concat(list) {
                        list.forEach(id => {
                            let item = cfgList[id];
                            if (item.isContainer) {
                                concat(item.attrs[key]);
                            } else {
                                obj[item[match[1]]] = item[match[2]];
                            }
                        });
                    }
                    concat(data);
                    break;
                case 'array':
                    obj = [];
                    break;
                case 'string':
                    obj = '';
                    break;
            }

            cfg.attrs[key] = obj;
        }
        return template.replace(/\{([^\}]*)\}/g, (str, key) => {
            return this.getText(key, cfg);
        });
    }

    getText(key, data, isObj = false) {
        let res = key;
        if (data[key] !== undefined) {
            res = data[key]
        } else if (data.attrs[key] !== undefined) {
            res = data.attrs[key];
        } else if (data.ignore[key] !== undefined) {
            res = data.ignore[key];
        }

        if (!isObj && typeof res === 'object') {
            res = JSON.stringify(res, null, 4);
        }
        return res;
    }
}

module.exports = ModuleHandle;