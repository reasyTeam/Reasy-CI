const fo = require('../util/fileOperation');
const { getType, deepClone } = require('../util/lib');
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
                return fo.readJs(data[0].url);
            }
            return [];
        })
    }

    updateModuleConfig(id, obj) {
        return this.dataBase.tables.Module.findAll({
            where: {
                id
            }
        }).then(data => {
            if (data.length > 0) {
                fo.writeJs(obj, data[0].url);
            }
            return {}
        })
    }

    // 生成真正的代码
    generate(data) {
        if (data.id !== 'default') {
            this.updateModuleConfig(data.id, deepClone(data.config));
        }
        // 去除默认值属性
        this.formatConfig(data.config.cfgList, data.groupId);
        return this.dataBase.sequelize
            .query('SELECT fileType FROM `dependence` JOIN `group` WHERE `group`.dependence_id = `dependence`.id AND `group`.id = ' + data.groupId, {
                type: this.dataBase.sequelize.QueryTypes.SELECT
            })
            .then(queryData => {
                if (queryData.length > 0) {
                    let fileType = queryData[0]['fileType'];
                    // 数据处理
                    return this.cfgToCode(data.config, fileType);
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

    cfgToCode(config, fileType) {
        let { cfgList, sortArray } = config;
        let basePath = 'uploads/download/',
            fileName = cuid();

        let generateCode = this.createCode(cfgList, sortArray);
        // 根据当前的组件库，确定文件类型
        switch (fileType) {
            case 1: // vue文件
                break;
            case 2: // js和html文件
                // 写入文件
                fo.writeFile(generateCode.htmlCode, `${basePath}${fileName}/page.html`);
                fo.writeFile(generateCode.jsCode, `${basePath}${fileName}/page.js`);
                break;
            case 3: // react js文件
                break;
        }
        let url = `${basePath}${fileName}.zip`;
        return compressing.zip.compressDir(`${basePath}${fileName}`, url)
            .then(() => {
                fo.rmdir(`${basePath}${fileName}`);
                return url;
            }).catch(err => {
                fo.rmdir(`${basePath}${fileName}`);
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
            htmlCode,
            jsCode
        }
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

                    let data = this.getText(express, cfg);
                    if (param) {
                        data = data[param];
                    }

                    switch (command) {
                        case 'for':
                            return this.createHtml(cfgList, data);
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
            template = generate.script;

        if (cfg.isContainer) {
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

    getText(key, data) {
        let res = key;
        if (data[key] !== undefined) {
            res = data[key]
        } else if (data.attrs[key] !== undefined) {
            res = data.attrs[key];
        } else if (data.ignore[key] !== undefined) {
            res = data.ignore[key];
        }

        if (typeof res === 'object') {
            res = JSON.stringify(res, null, 4);
        }
        return res;
    }
}

module.exports = ModuleHandle;