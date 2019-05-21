const fo = require('../util/fileOperation');
const { getType } = require('../util/lib');
const cuid = require('cuid');

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
        if (data.id !== undefined) {
            this.updateModuleConfig(data.id, data.config);
        }

        // xxx 
        this.formatConfig(data.config.cfgList);
        // xxx 
        this.cfgToCode(data.config);
    }

    formatConfig(config) {
        let cptCfg = global.components.components_list;
        for (let key in config) {
            let itemCfg = config[key];
            let cptAttr = cptCfg[itemCfg.name].attrs;
            itemCfg['ignore'] = {};
            this.formatConfig(itemCfg, cptAttr);
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

    cfgToCode(config) {
        let { cfgList, sortArray } = config;
        let generateCode = createCode(cfgList, sortArray);
        // 根据当前的组件库，确定文件类型
    }

    createCode(cfgList, sortArray) {
        let htmlCode = '',
            jsCode = '',
            generate = global.components.generate;

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
        if (cfg.isContainer) {
            let key = cfg.showOption.formList,
                generate = global.components.generate[cfg.name],
                template = generate.script,
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