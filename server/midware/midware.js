const store = require('./store');

class Midware {
    constructor(app, tableModel) {
        this.app = app;
        this.tableModel = tableModel;
        this.midwares = {};
        this.generateStore();
    }

    init() {
        let midwares = this.midwares;
        for (let key in midwares) {
            this.app.use(key, zhuru(midwares[key], this.tableModel));
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
        // 初始化store
        for (let key in store) {
            this.add(key, store[key]);
        }
    }
}

function zhuru(midwares, tableModel) {
    return function(req, res, next) {
        let args = [tableModel, ...arguments];

        if (Array.isArray(midwares)) {
            let pros = [];
            midwares.forEach(midware => {
                pros.push(midware.apply(this, args));
            });

            return Promise.all(pros).then(data => {
                res.json(data)
            }).catch(err => {
                console.log(err);
                res.json(-1);
            });
        } else {
            let t = midwares.apply(this, args);
            if (t instanceof Promise) {
                return t.then(data => {
                    res.json(data)
                }).catch(err => {
                    console.log(err);
                    res.json(-1);
                });
            }
            res.json(t);
            return Promise.resolve(t);
        }
    };
}

module.exports = Midware;