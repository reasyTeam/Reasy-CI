const api = {
    'getGroups': function(tableModel) {
        return tableModel.Group.query();
    },
    'delGroups': function(tableModel, req) {
        let data = req.body;
        return tableModel.Group.delete(data);
    },
    'updateGroups': function(tableModel, req) {
        let data = req.body;
        return tableModel.Group.update(data);
    },
    'createGroups': function(tableModel, req) {
        let data = req.body;
        return tableModel.Group.create(data);
    },
    'getDependences': function(tableModel) {
        return tableModel.Dependence.query();
    },
    'delDependences': function(tableModel, req) {
        let data = req.body;
        return tableModel.Dependence.delete(data);
    },
    'updateDependences': function(tableModel, req) {
        let data = req.body;
        return tableModel.Dependence.update(data);
    },
    'createDependences': function(tableModel, req) {
        let data = req.body;
        return tableModel.Dependence.create(data);
    },
    'getModels': function(tableModel) {
        return tableModel.Module.query();
    }
};

module.exports = api;