const Sequelize = require('sequelize');
const config = require('../config/mysql');
const Op = Sequelize.Op;
const util = require('../util/lib');
const fo = require('../util/fileOperation');

class Database {
    constructor() {
        this.tables = {};
        this.sequelize = '';
        // force为true代表清空数据库
        this.force = false;
        this.checkConnection = this.checkConnection.bind(this);
        this.initTable = this.initTable.bind(this);
        this.createTable = this.createTable.bind(this);
    }

    init() {
        return this.connectDatabase()
            .then(this.checkConnection)
            .then(this.initTable)
            .then(this.createTable)
            .then(() => {
                util.log("数据库初始化完毕!");
            })
            .catch(err => {
                util.log(err, util.LOG_TYPE.ERROR);
            });

    }

    connectDatabase() {
        return new Promise((resolve, reject) => {
            util.log('数据库连接...')
            this.sequelize = new Sequelize({
                database: config.database,
                username: config.username,
                password: config.password,
                host: config.host, //数据库主机IP
                dialect: "mysql", //数据库类型
                pool: { //连接池配置
                    max: 5, //最大连接数
                    min: 0, //最小连接数
                    acquire: config.aquireTimeout, //请求超时时间
                    idle: 10000 //断开连接后，连接实例在连接池保持的时间
                },
                logging: false
            });
            resolve();
        })
    }

    checkConnection() {
        return new Promise((resolve, reject) => {
            this.sequelize
                .authenticate()
                .then(() => {
                    util.log('数据库连接成功！');
                    resolve();
                })
                .catch(err => {
                    util.log('数据库连接失败！', util.LOG_TYPE.ERROR);
                    reject(err);
                });
        });
    }

    initTable() {
        /**
         * 文件地址表，用来存储所有的附件
         * @id 唯一标识
         * @name 组建库名称
         * @url 当前文件地址
         */
        this.tables.File = this.sequelize.define('file', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            name: { type: Sequelize.STRING, allowNull: true },
            url: { type: Sequelize.STRING, allowNull: false }
        }, {
            freezeTableName: true
            // todo by xc 更新列表时，更新getcomponents
        });

        /**
         * 组件库表
         * @id 唯一标识
         * @dependence_id 依赖的框架
         * @name 组建库名称
         * @description 描述信息
         * @file_id 当前组建的配置文件地址
         */
        this.tables.Group = this.sequelize.define('group', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            dependence_id: { type: Sequelize.INTEGER, allowNull: false },
            name: { type: Sequelize.STRING, allowNull: false },
            file_id: { type: Sequelize.INTEGER, allowNull: false },
            description: { type: Sequelize.STRING, allowNull: true }
        }, {
            freezeTableName: true,
            hooks: {
                beforeBulkDestroy: (group, option) => {
                    let ids = group.where.id;

                    this.tables.File.findAll({
                        where: {
                            id: ids
                        }
                    }).then(data => {
                        if (data.length > 0) {
                            let ids = data.map(item => item.id);
                            this.tables.File.destroy({
                                where: {
                                    id: {
                                        [Op.in]: ids
                                    }
                                }
                            })
                        }
                    })
                }
            }
        });

        /**
         * 依赖表
         * @id 唯一标识
         * @name 框架名称
         * @version 版本号
         */
        this.tables.Dependence = this.sequelize.define('dependence', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            name: { type: Sequelize.STRING },
            fileType: { type: Sequelize.INTEGER, allowNull: true },
            version: { type: Sequelize.STRING }
        }, {
            freezeTableName: true
        });

        /**
         * 模版表
         * @id 唯一标识
         * @name 模板名称
         * @description 模板描述信息
         * @url 模板文件存储地址
         */
        this.tables.Module = this.sequelize.define('module', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            group_id: { type: Sequelize.INTEGER, allowNull: false },
            // 模板名称
            name: { type: Sequelize.STRING, allowNull: false },
            // 模板描述
            description: { type: Sequelize.STRING },
            // 模板文件地址，包括[目录结构]
            url: { type: Sequelize.STRING },
            zip_url: { type: Sequelize.STRING }
        }, {
            freezeTableName: true,
            hooks: {
                beforeBulkDestroy: (group, option) => {
                    let id = group.where.id;
                    // 删除数据前同时删除页面相关配置数据
                    this.tables.Module.findAll({
                        where: {
                            id: id
                        }
                    }).then(data => {
                        if (data.length > 0) {
                            let url = data.map(item => item.url);

                            // 删除对应的配置文件
                            url.forEach(item => fo.unlink(item));

                        };
                    }).catch(err => {
                        util.log('Module配置文件删除失败', util.LOG_TYPE.ERROR);
                        util.log(err, util.LOG_TYPE.ERROR);
                    });

                    // // 删除对应的modulePage
                    // this.tables.ModulePage.destroy({
                    //     where: {
                    //         module_id: id
                    //     }
                    // })
                }
            }
        });

        /**
         * 模版表对应的页面配置
         * @id 唯一标识
         * @name 页面名称
         * @description 模板描述信息
         * @url 模板文件存储地址
         */
        this.tables.ModulePage = this.sequelize.define('modulepage', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
            // 模板名称
            module_id: { type: Sequelize.INTEGER, allowNull: false },
            // 页面文件名称
            name: { type: Sequelize.STRING, allowNull: false },
            // 模板文件地址，包括[组件配置项]
            url: { type: Sequelize.STRING }
        }, {
            freezeTableName: true,
            hooks: {
                beforeBulkDestroy: (group, option) => {
                    let ids = group.where.id;

                    this.tables.File.findAll({
                        where: {
                            id: ids
                        }
                    }).then(data => {
                        if (data.length > 0) {
                            let url = data.map(item => item.url);

                            // 删除对应的配置文件
                            url.forEach(item => fo.unlink(item));
                        }
                    }).catch(err => {
                        util.log('ModulePage配置文件删除失败', util.LOG_TYPE.ERROR);
                        util.log(err, util.LOG_TYPE.ERROR);
                    });

                }
            }
        });

        return Promise.resolve();
    }

    createTable() {
        //关系定义
        this.tables.Dependence.hasOne(this.tables.Group, {
            foreignKey: 'id',
            as: 'dependence_id'
        });

        this.tables.File.hasOne(this.tables.Group, {
            foreignKey: 'id',
            as: 'file_id'
        });

        // this.tables.Group.hasOne(this.tables.Module, {
        //     foreignKey: 'id',
        //     as: 'group_id'
        // });

        this.tables.Module.hasOne(this.tables.ModulePage, {
            foreignKey: 'id',
            as: 'module_id'
        })

        return new Promise((resolve, reject) => {
            //同步实例与DB
            const force = this.force;
            Promise.all([
                    this.tables.Dependence.sync({ force }),
                    this.tables.File.sync({ force })
                ])
                .then(() => {
                    return Promise.all([
                        this.tables.Group.sync({ force })
                    ]);
                })
                .then(() => {
                    return Promise.all([
                        this.tables.Module.sync({ force })
                    ]);
                })
                .then(() => {
                    return Promise.all([
                        this.tables.ModulePage.sync({ force })
                    ]);
                })
                .then(resolve)
                .catch(err => {
                    reject(err);
                });
        });
    }
}

// const dataBase = new Database();

module.exports = Database;