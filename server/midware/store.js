const api = {
    '/getGroups': function(tableModel) {
        return tableModel.Group.query();
    },
    '/delGroups': function(tableModel, req) {
        let data = req.body;
        return tableModel.Group.delete(data);
    },
    '/updateGroups': function(tableModel, req) {
        return tableModel.Group.update();
    },
    '/createGroups': function(tableModel, req) {
        return tableModel.Group.create();
    },
    '/getDependences': function(tableModel) {
        return tableModel.Dependence.query();
    },
    '/getModels': function(tableModel) {
        return tableModel.Module.query();
    }
};