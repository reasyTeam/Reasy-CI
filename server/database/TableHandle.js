const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TableHandle {
    constructor(tabelModel, option = {}) {
        this.tabelModel = tabelModel;
        this.idField = option.idField || 'id';
        this.beforeDelete = option.beforeDelete;
    }

    create(data) {

        return this.tabelModel.create(data);
    }

    query(data) {
        // data must be an object
        if (data) {
            return this.tabelModel.findAll({ where: data });
        } else {
            return this.tabelModel.findAll();
        }
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
        id = (id && typeof id === 'object') ? id.id : [];
        // 当前参数不为数组时，转成数组
        if (!Array.isArray(id)) {
            id = [id];
        }

        this.beforeDelete && this.beforeDelete(id);

        return this.tabelModel.destroy({
            where: {
                [this.idField]: {
                    [Op.in]: id
                }
            }
        });
    }
}

module.exports = TableHandle;