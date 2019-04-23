const CONFIG = {
    //数据库ip
    host: "localhost",
    //账户名
    username: "root",
    user: "root",
    //公司电脑mysql密码
    // password: "123456",
    //密码
    password: "12345678",
    //数据库名
    database: "reasy-ci",
    //数据库端口
    port: 3306,
    //最大连接个数
    connectionLimit: 1000,
    //连接池超时时间
    connectTimeout: 60 * 60 * 1000,
    //连接超时时间
    timeout: 60 * 60 * 1000,
    //请求超时时间
    aquireTimeout: 60 * 60 * 1000
}

module.exports = CONFIG;