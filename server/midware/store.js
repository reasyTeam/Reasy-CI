const api = {
    'getGroups': function(models) {
        return models.sequelize.query('SELECT `group`.*, `file`.name as file_name, `dependence`.name as depedence_name FROM `group` LEFT JOIN `file` ON `file`.id = `group`.file_id LEFT JOIN `dependence` ON `dependence`.id = `group`.depedence_id', { type: models.sequelize.QueryTypes.SELECT }).then(data => {
            return data;
        });
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