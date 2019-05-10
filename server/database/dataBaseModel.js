const TableHandle = require('./TableHandle');
const DataBase = require('./dataBase');
const Sequelize = require('sequelize');
const FileDataBase = require('../generator/fileDataBase');
const ModuleHandle = require('../generator/moduleHandle');
const Op = Sequelize.Op;
const util = require('../util/lib');
const fo = require('../util/fileOperation');

function init() {
    let dataBase = new DataBase();

    return dataBase.init()
        .then(() => {
            return {
                dataBase,
                Dependence: new TableHandle(dataBase.tables.Dependence),
                File: new TableHandle(dataBase.tables.File),
                Group: new TableHandle(dataBase.tables.Group, {
                    beforeDelete(ids) {
                        // 查找所有需要的数据，逐条删除对应的文件
                        dataBase.tables.File.findAll({
                            where: {
                                id: {
                                    [Op.in]: ids
                                }
                            }
                        }).then(data => {
                            // 删除对应的文件
                            fo.unlink(data[0]['url']);
                        })
                    }
                }),
                ModulePage: new TableHandle(dataBase.tables.ModulePage),
                // Parameter: new TableHandle(dataBase.tables.Parameter),
                // ParameterToValidate: new TableHandle(dataBase.tables.ParameterToValidate),
                Module: new TableHandle(dataBase.tables.Module),
                sequelize: dataBase.sequelize,
                FileDataBase: new FileDataBase(dataBase),
                ModuleHandle: new ModuleHandle(dataBase)
            };
        }).catch((error) => {
            util.log('数据库初始化出错！' + error, util.LOG_TYPE.ERROR);
        });
}

module.exports = init;