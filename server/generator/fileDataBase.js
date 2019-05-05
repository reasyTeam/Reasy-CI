const fo = require('../util/fileOperation');

const {
    log,
    LOG_TYPE,
    deepClone
} = require('../util/lib');

const DEFAULT_CONFIG = {}

class FileDataBase {
    constructor(dataBase) {
        this.dataBase = dataBase;
        this.cacheData = {};
        this._id = -100;
        // 记录文件地址信息
        this._filePaht = {};
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

        if (components && components.commonAttrs) {
            outData = components.components.map(item => {

                if (!item.ignorCommon) {
                    item.attrs = Object.assign(deepClone(components.commonAttrs), item.attrs);
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
        return outData;
    }

    updateData(id) {
        this.cacheData[id] = null;
    }
}

module.exports = FileDataBase;