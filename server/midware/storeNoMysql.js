const api = {
    'getGroups': function(tableModel) {
        return [
            { id: 1, name: 'reasy-ui', depedence_id: 2, description: '基于jquery的组建' },
            { id: 2, name: 'reasy-ui-vue', depedence_id: 1, description: '基于Vue的组建' }
        ];
    },
    'delGroups': function(tableModel, req) {
        let data = req.body;
        return { ok: 1 };
    },
    'updateGroups': function(tableModel, req) {
        return { ok: 1 };
    },
    'createGroups': function(tableModel, req) {
        return { ok: 1 };
    },
    'getDependences': function(tableModel) {
        return [
            { id: 1, name: 'Vue', version: 'V2.5.6' },
            { id: 2, name: 'jQuery', version: 'V1.13.14' }
        ];
    },
    'getModels': function(tableModel) {
        return { ok: 1 };
    }
};

module.exports = api;