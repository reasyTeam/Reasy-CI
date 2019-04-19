const TableHandle = require('./TableHandle');
const dbModel = require('./dataBaseModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');
const path = require('path');
const cwd = process.cwd();

function init() {
    return dbModel.init()
        .then(() => {
            return {
                Dependence: new TableHandle(dbModel.tables.Dependence),
                File: new TableHandle(dbModel.tables.File, {
                    beforeDelete(ids) {
                        // 查找所有需要的数据，逐条删除对应的文件
                        this.query({
                            id: {
                                [Op.in]: ids
                            }
                        }).then(data => {
                            // 删除对应的文件
                            fs.unlink(path.join(cwd, data[0]['url']), (err) => {
                                if (err) throw err;
                            });
                        })
                    }
                }),
                Group: new TableHandle(dbModel.tables.Group),
                Validate: new TableHandle(dbModel.tables.Validate),
                Parameter: new TableHandle(dbModel.tables.Parameter),
                ParameterToValidate: new TableHandle(dbModel.tables.ParameterToValidate),
                Module: new TableHandle(dbModel.tables.Module)
            };
        }).catch(() => {
            console.log('数据库初始化出错！');
        });
}

module.exports = init;