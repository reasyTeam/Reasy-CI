const cuid = require('cuid');

const api = {
    // 组件库操作
    // 获取
    'getGroups': function(models) {
        return models.sequelize.query('SELECT `group`.*, `file`.name as file_name, `file`.url as file_url, `dependence`.name as depedence_name, `dependence`.fileType as fileType FROM `group` LEFT JOIN `file` ON `file`.id = `group`.file_id LEFT JOIN `dependence` ON `dependence`.id = `group`.dependence_id', { type: models.sequelize.QueryTypes.SELECT }).then(data => {
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
        let data = req.body;
        return models.FileDataBase.getValidates(+data.id);
    },

    // 模板列表处理
    // 获取模板
    'getModules': function(models, req) {
        let data = req.body;
        return models.Module.query(data);
    },
    // 获取模板配置
    'getModuleConfig': function(models, req) {
        let data = req.body;
        return models.ModuleHandle.getModuleConfig(+data.id);
    },
    'createModule': function(models, req) {
        let data = req.body;
        data.url = data.url || `uploads/modules/${cuid()}.js`;
        // data.zip_url = data.zip_url || `uploads/download/${cuid()}.zip`;
        // todo by xc 将数据写入文件
        models.ModuleHandle.writeFile(data.url, data.config || {});

        return models.Group.query({
            id: data.group_id
        }).then(gdata => {
            data.template = gdata[0].template;
            return models.Module.create(data);
        }).catch(err => {
            data.template = '// error';
            return models.Module.create(data);
        });
    },
    // 更新
    'updateModule': function(models, req) {
        let data = req.body;
        return models.Module.update(data);
    },
    // 更新配置
    'updateModuleConfig': function(models, req) {
        let data = req.body;
        return models.ModuleHandle.updateModuleConfig(+data.id, data);
    },
    // 删除模板
    'delModule': function(models, req) {
        let data = req.body;
        return models.Module.delete(data);
    }
    // 'generate': function(models, req) {
    //     let data = req.body;
    //     return models.ModuleHandle.generate(data);
    // }
};

module.exports = api;