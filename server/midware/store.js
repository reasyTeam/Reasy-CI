const Sequelize = require('sequelize');
const api = {
    'getGroups': function(models) {
        return models.Group.query();
    },
    'delGroups': function(models, req) {
        let data = req.body;
        return models.Group.delete(data);
    },
    'updateGroups': function(models, req) {
        let data = req.body;
        return models.Group.update(data);
    },
    'createGroups': function(models, req) {
        let data = req.body;

        // models.File.update({
        //     id: data.file_id,
        //     name: data.name
        // });

        return models.Group.create(data);
    },
    'getDependences': function(models) {
        // 关联查询
        // Sequelize.query("SELECT * from `` join `` on ")
        return models.Dependence.query();
    },
    'delDependences': function(models, req) {
        let data = req.body;
        return models.Dependence.delete(data);
    },
    'updateDependences': function(models, req) {
        let data = req.body;
        return models.Dependence.update(data);
    },
    'createDependences': function(models, req) {
        let data = req.body;
        return models.Dependence.create(data);
    },
    'getModels': function(models) {
        return models.Module.query();
    }
};

module.exports = api;