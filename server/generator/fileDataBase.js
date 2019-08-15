const fo = require('../util/fileOperation');
const defaultComs = require('./defaultComponents');
const {
    log,
    LOG_TYPE,
    deepClone
} = require('../util/lib');

class FileDataBase {
    constructor(dataBase) {
        this.dataBase = dataBase;
        global.cacheData = this.cacheData = {};
        this._id = -100;
        // 记录文件地址信息
        this._filePaht = {};
        this.getDefaultComponents();
    }

    getJsData(id) {
        return this.dataBase.sequelize
            .query('SELECT url FROM `file` JOIN `group` WHERE `group`.file_id = `file`.id AND `group`.id = ' + id, {
                type: this.dataBase.sequelize.QueryTypes.SELECT
            })
            .then(data => {
                if (data.length > 0) {
                    this._filePaht[id] = data[0].url;
                    // 数据处理
                    return fo.readJs(data[0].url);
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

    getData() {
        let id = this._id;
        if (this.cacheData[id]) {
            return Promise.resolve();
        }
        return this.getJsData(id)
            .then(data => {
                if (data === -1) {
                    return -1;
                } else {
                    this.cacheData[id] = data;
                    this.cacheData[id].components_list = this.formatComponents(data.components);
                    let nameIndex = this.cacheData[id].nameIndex = {};
                    this.cacheData[id].components_list.forEach((item, index) => {
                        nameIndex[item.name] = index;
                    });
                    // 格式化generate
                    this.formatGenerate(data);
                }
            });
    }

    setData() {
        // 修改数据写入文件
    }

    getComponents(id) {
        this._id = id;
        return this.getData()
            .then((data) => {
                if (data === -1) {
                    return {
                        error: -1
                    };
                }
                return this.cacheData[id].components_list;
            });
    }

    getValidates(id) {
        this._id = id;
        return this.getData()
            .then((data) => {
                if (data === -1) {
                    return {
                        error: -1
                    };
                }
                return this.cacheData[id].validate;
            });
    }

    formatComponents(components) {
        let outData = [];

        if (components && components.components) {
            outData = components.components.map(item => {
                let funs = {};
                for (let key in item.attrs) {
                    if (item.attrs[key].valueType === 'function') {
                        funs[key] = item.attrs[key];
                        delete item.attrs[key];
                    }
                }

                let cloneAttr = deepClone(components.commonAttrs);
                for (let key in cloneAttr) {
                    if (cloneAttr[key].valueType === 'function') {
                        funs[key] = cloneAttr[key];
                        delete cloneAttr[key];
                    }
                }

                if (!item.ignorCommon) {
                    item.attrs = Object.assign({}, cloneAttr, item.attrs);
                }

                for (let key in funs) {
                    item.attrs[key] = funs[key];
                }

                // 解析表达式等值
                Object.values(item.attrs).forEach(attr => {
                    // 同步表达式
                    if (attr.valueType === 'sync') {
                        let syncAttr = item[attr.syncKey];
                        if (!syncAttr) {
                            syncAttr = item.attrs[attr.syncKey];
                        }
                        if (syncAttr) {
                            if (typeof syncAttr === 'object') {
                                attr.valueType = syncAttr.valueType || 'string';
                            } else {
                                if (/\d\|/.test(syncAttr)) {
                                    attr.valueType = 'enum';
                                    attr.selectArray = syncAttr.split('|')[1];
                                    attr.multiple = syncAttr.split('|')[0] == 2; // 是否可多选
                                } else {
                                    attr.valueType = syncAttr;
                                }
                            }
                        }
                    }
                    // 解析属性defaultValue表达式
                    let dValue = attr.defaultValue;
                    if (dValue && typeof dValue === 'string') {
                        let match;
                        if (match = dValue.match(/^\$\[([\s\S]*)\]$/)) {
                            match = match[1].split('.');
                            let val = null;
                            for (let i = 0, l = match.length - 1; i <= l; i++) {
                                val = item[match[i]];
                                if (typeof val !== 'object' && i < l) {
                                    val = null;
                                    break;
                                }
                            }
                            if (val !== null) {
                                attr.defaultValue = val;
                            }
                        }

                    }
                });

                return item;
            });
        }

        outData = this.defaultComs.concat(outData);
        return outData;
    }

    formatGenerate(data) {
        let components = data.components.components,
            generate = data.generate;
        let defaultCfg = {
            template: generate.commonTemplate,
            script: generate.commonScript,
            single: false
        }

        components.forEach(component => {
            let name = component.name;
            generate[name] = Object.assign({}, defaultCfg, generate[name]);
        });

        data.generate = Object.assign({}, generate, this.defaultGens);
    }

    updateData(id) {
        this.cacheData[id] = null;
    }

    getDefaultComponents() {
        this.defaultComs = defaultComs.components.map(item => {
            item.isDefault = true;
            return item;
        });
        this.defaultGens = defaultComs.generate;
    }
}

module.exports = FileDataBase;