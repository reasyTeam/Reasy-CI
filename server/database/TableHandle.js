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

    update(id, data) {
        return this.tabelModel.update(data, {
            where: {
                [this.idField]: id
            }
        });
    }

    delete(id) {
        return this.tabelModel.destroy({
            where: {
                [this.idField]: id
            }
        });
    }
}

function log(table, type, data) {
    console.log(`[${table}] [${type}] [${JSON.stringify(data)}] success`);
}

module.exports = TableHandle;