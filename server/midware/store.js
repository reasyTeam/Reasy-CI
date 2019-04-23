const api = {
    // 组件库操作
    // 获取
    'getGroups': function(models) {
        return models.sequelize.query('SELECT `group`.*, `file`.name as file_name, `dependence`.name as depedence_name FROM `group` LEFT JOIN `file` ON `file`.id = `group`.file_id LEFT JOIN `dependence` ON `dependence`.id = `group`.dependence_id', { type: models.sequelize.QueryTypes.SELECT }).then(data => {
            return data;
        });
    },
    // 修改
    'delGroups': function(models, req) {
        let data = req.body;
        return models.Group.delete(data);
    },
    // 更新
    'updateGroups': function(models, req) {
        let data = req.body;
        return models.Group.update(data);
    },
    // 添加
    'createGroups': function(models, req) {
        let data = req.body;

        return models.Group.create(data);
    },

    // 依赖框架操作
    // 获取
    'getDependences': function(models) {
        return models.sequelize.query('SELECT `dependence`.*, count(`group`.dependence_id) as used FROM `dependence` LEFT JOIN `group` ON `dependence`.id = `group`.dependence_id GROUP BY `dependence`.id ', { type: models.sequelize.QueryTypes.SELECT }).then(data => {
            return data;
        });
    },
    // 删除
    'delDependences': function(models, req) {
        let data = req.body;
        return models.Dependence.delete(data);
    },
    // 更新
    'updateDependences': function(models, req) {
        let data = req.body;
        return models.Dependence.update(data);
    },
    // 创建
    'createDependences': function(models, req) {
        let data = req.body;
        return models.Dependence.create(data);
    },

    // 组件库库对应的组件操作 
    // 获取
    'getComponents': function(models, req) {
        let data = req.body;
        return models.FileDataBase.getComponents(data.id);
    },
    // 删除
    'delComponents': function(models, req) {
        let data = req.body;
        return models.Dependence.delete(data);
    },
    // 更新
    'updateComponents': function(models, req) {
        let data = req.body;
        return models.Dependence.update(data);
    },
    // 创建 - 不提供该功能
    'createComponents': function(models, req) {
        let data = req.body;
        return models.Dependence.create(data);
    },
    // 获取组件属性列表
    'getValidates': function(models) {
        return models.Dependence.query();
    },

    // 获取模板
    'getModels': function(models) {
        return models.Module.query();
    }
};

module.exports = api;