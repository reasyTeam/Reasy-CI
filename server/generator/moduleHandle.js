const fo = require('../util/fileOperation');
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
    generate() {

    }
}

module.exports = ModuleHandle;