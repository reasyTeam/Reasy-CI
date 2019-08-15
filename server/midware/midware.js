const store = require('./store');
const CONFIG = require('../config/server');
const util = require('../util/lib');

let api = CONFIG.api || '/';

class Midware {
    constructor(app, tableModel) {
        this.app = app;
        this.tableModel = tableModel;
        this.midwares = {};
        this.generateStore();
        this.init();
    }

    init() {
        let midwares = this.midwares;
        for (let key in midwares) {
            let apikey = api + key.replace(/^\/+/, '');
            this.app.use(apikey, zhuru(midwares[key], this.tableModel));
        }
    }

    // 所有的callback的结果为promise类型
    add(key, callback) {
        if (this.midwares[key]) {
            if (!Array.isArray(this.midwares[key])) {
                this.midwares[key] = [this.midwares[key]];
            }
            this.midwares[key].push(callback);
        }
        this.midwares[key] = callback;
    }

    generateStore() {
        let storeApi = store;
        // 初始化store
        for (let key in storeApi) {
            this.add(key, storeApi[key]);
        }
    }
}

function zhuru(midwares, tableModel) {
    return function(req, res, next) {
        let args = [tableModel, ...arguments];
        try {
            if (Array.isArray(midwares)) {
                let pros = [];
                midwares.forEach(midware => {
                    pros.push(midware.apply(this, args));
                });

                return Promise.all(pros).then(data => {
                    res.json(data)
                }).catch(err => {
                    util.log(err, util.LOG_TYPE.ERROR);
                    res.json(-1);
                });
            } else {
                let t = midwares.apply(this, args);
                if (t && typeof t === 'object' && t.then) {
                    return t.then((data, t) => {
                        res.json(data)
                    }).catch(err => {
                        util.log(err, util.LOG_TYPE.ERROR);
                        res.json(-1);
                    });
                }
                res.json(t);
                return Promise.resolve(t);
            }
        } catch (err) {
            util.log(err, util.LOG_TYPE.ERROR);
            res.json({ error: 1 })
        }
    };
}

module.exports = Midware;