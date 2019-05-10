const fo = require('../util/fileOperation');
const cuid = require('cuid');

class ModuleHandle {
    constructor(dataBase) {
        this.dataBase = dataBase;
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

    getModuleData(id) {
        return this.dataBase.Module.query({
            id
        }).then(data => {
            if (data.length > 0) {
                let cfgData = require(data[0].url);
                return cfgData;
            }
            return [];
        })
        // .catch(err => {
        //     // 输出错误信息
        // });
    }

    getModulePage(id) {
        return this.dataBase.ModulePage.query({
            id
        }).then(data => {
            if (data.length > 0) {
                let cfgData = require(data[0].url);
                return cfgData;
            }
            return [];
        })
    }

    writePageCfg(cfg) {
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

    writePageCfgs() {
        // if ()
    }

    // 生成真正的代码
    generate() {

    }
}

module.exports = ModuleHandle;