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

    getDirect(id) {
        this.reset();

        this.cache.curId = id;
        return this.dataBase.Module.query({
            id
        }).then(data => {
            if (data.length > 0) {
                let cfgData = require(data[0].url);
                this.cache.direct = cfgData;
                return cfgData;
            }
            return [];
        })
    }

    writeDirect() {
        let id = this.cache.curId;
        return this.dataBase.Module.query({
            id
        }).then(data => {
            if (data.length > 0) {
                fo.writeJs()
            }
        });
    }

    getModulePage(id) {
        return this.dataBase.ModulePage.query({
            id
        }).then(data => {
            if (data.length > 0) {
                let cfgData = require(data[0].url);
                this.cache.config[id] = cfgData;
                return cfgData;
            }
            return [];
        });
    }

    writeModulePage(cfg) {
        if (!cfg.modulepage_id) {
            let url = `uploads/modules/pages/${cuid()}.js`;
            this.dataBase.ModulePage.create({
                module_id: cfg.module_id,
                name: cfg.name,
                url
            }).then(data => {
                this.writeFile(data[0].url, cfg.formList);
                return {
                    id: data.id
                }
            });
        } else {
            this.data.ModulePage.query({
                id: cfg.modulepage_id
            }).then(data => {
                // 更新文件
                this.writeFile(data[0].url, cfg.formList);
                return {
                    id: cfg.modulepage_id
                };
            });
        }
    }

    // 保存所有的数据
    saveModule() {

    }

    writePageCfgs() {
        // if ()
    }

    // 生成真正的代码
    generate() {

    }
}

module.exports = ModuleHandle;