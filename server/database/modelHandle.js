const TableHandle = require('./TableHandle');
const dbModel = require('./dataBaseModel');

function init() {
    return dbModel.init()
        .then(() => {
            return {
                Dependence: new TableHandle(dbModel.tables.Dependence),
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