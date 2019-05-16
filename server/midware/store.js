const cuid = require('cuid');

const api = {
    // 组件库操作
    // 获取
    'getGroups': function(models) {
        return models.sequelize.query('SELECT `group`.*, `file`.name as file_name, `file`.url as file_url, `dependence`.name as depedence_name FROM `group` LEFT JOIN `file` ON `file`.id = `group`.file_id LEFT JOIN `dependence` ON `dependence`.id = `group`.dependence_id', { type: models.sequelize.QueryTypes.SELECT }).then(data => {
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
        return models.FileDataBase.getValidates(data.id);
    },

    // 模板列表处理
    // 获取模板
    'getModules': function(models, req) {
        let data = req.body;
        return models.Module.query(data);
    },
    'createModule': function(models, req) {
        let data = req.body;
        data.url = data.url || `uploads/modules/${cuid()}.js`;

        return models.Module.create(data);
    },
    // 更新
    'updateModule': function(models, req) {
        let data = req.body;
        return models.Module.update(data);
    },
    // 删除模板
    'delModule': function(models, req) {
        let data = req.body;
        return models.Module.delete(data);
    },
    // 模板列表处理 end

    // 保存缓存数据
    'saveModule': function(models) {
        return models.ModuleHandle.saveModule();
    },
    // 获取模块数据
    'getDirect': function(models, req) {
        // 通过url获取对应的数据
        let data = req.body;
        return models.ModuleHandle.getDirect(data.id);
    },
    // 编辑模板目录，包括新增，编辑，删除
    'updateDirect': function(models, req) {
        let data = req.body;
        models.ModuleHandle.writeFile(data.url, data.module);
    },
    // 获取模块页面配置数据
    'getPageData': function(models, req) {
        // 通过url获取对应的数据
        let data = req.body;
        return models.ModuleHandle.getModulePage(data.id);
    },
    // 更新单页面配置
    'updatePageData': function(models, req) {
        let data = req.body;
        return models.ModulePage.delete(data);
    }
    // 'updateModulePage': function(models, req) {
    //     let data = req.body;
    //     // 添加文件，并更新id
    //     return models.ModuleHandle.writePageCfg(data.pageCfg);
    // }
};

module.exports = api;