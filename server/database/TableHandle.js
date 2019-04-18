const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TableHandle {
    constructor(tabelModel, idField) {
        this.tabelModel = tabelModel;
        this.idField = idField || 'id';
    }

    create(data) {

        return this.tabelModel.create(data);
    }

    query() {
        return this.tabelModel.findAll();
    }

    update(data) {
        let id = data[this.idField];
        delete data[this.idField];

        return this.tabelModel.update(data, {
            where: {
                [this.idField]: id
            }
        });
    }

    delete(id) {
        // 当前参数不为数组时，转成数组
        if (!Array.isArray(id)) {
            id = [id];
        }
        return this.tabelModel.destroy({
            where: {
                [this.idField]: {
                    [Op.in]: id
                }
            }
        });
    }
}

function log(table, type, data) {
    console.log(`[${table}] [${type}] [${JSON.stringify(data)}] success`);
}

module.exports = TableHandle;