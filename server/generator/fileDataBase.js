const fo = require('../util/fileOperation');

const {
    log,
    LOG_TYPE,
    arrayToObject,
    objectToArray,
    deepClone
} = require('../util/lib');

class FileDataBase {
    constructor(dataBase) {
        this.dataBase = dataBase;
        this.cacheData = null;
    }

    getJsData(id) {
        this.dataBase.tables.File.findAll({
            where: {
                id: id
            }
        }).then(data => {
            if (data.length > 0) {
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

    getData(id) {
        if (this.cacheData) {
            return;
        }
        this.getJsData(id)
            .then(data => {
                if (data === -1) {
                    return -1;
                } else {
                    this.cacheData = data;
                    this.cacheData.component_list = this.formatComponents();
                }
            });
    }

    setData() {
        // 修改数据写入文件
    }

    getComponents() {
        return Promise.resolve(this.cacheData.component_list);
    }

    formatComponents() {
        let outData = [],
            components = this.cacheData.components;
        if (components && components.commonAttrs) {
            outData = components.map(item => {
                item.attrs = Object.assign(deepClone(components.commonAttrs), item.attrs);
                return item;
            });
        }
        return outData;
    }
}


module.exports = FileDataBase;