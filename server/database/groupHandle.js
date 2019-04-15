const dbModel = require('./dataBaseModel');

/**
 * 框架操作CRUD
 */
function createDepends(data) {
    return dbModel.tables.create(data);
}

function retrieveDepends() {
    return dbModel.tables.Dependence.findAll();
}

function updateDepends(id, data) {
    return dbModel.tables.Dependence.findAll({
        id: id
    }).then(data => {
        console.log(data);
    })
}

function deleteDepends() {

}

/**
 * 组件库操作CRUD
 */
function createGroups(data) {
    return dbModel.tables.Group.create(data);
}

function retrieveGroups() {
    return dbModel.tables.Group.findAll();
}

function updateGroups() {

}

function deleteGroups() {

}

module.exports = {
    Dependence: {
        create: createDepends,
        retrieve: retrieveDepends,
        update: updateDepends,
        delete: deleteDepends
    },
    Group: {
        create: createGroups,
        retrieve: retrieveGroups,
        update: updateGroups,
        delete: deleteGroups
    }
}