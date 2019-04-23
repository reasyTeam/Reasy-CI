const chalk = require('chalk');

const LOG_TYPE = {
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    NORMAL: '',
    MESSAGE: 'MESSAGE'
};

const log = function(mess, type = LOG_TYPE.NORMAL) {
    mess = `[${LOG_TYPE[type]}]-[${mess}]`;

    switch (type) {
        case LOG_TYPE.ERROR:
            console.log(chalk.red(mess));
            break;
        case LOG_TYPE.WARNING:
            console.log(chalk.yellow(mess));
            break;
        case LOG_TYPE.MESSAGE:
            console.log(chalk.cyan(mess));
            break;
        default:
            console.log(chalk.white(mess));
            break;
    }
}

function arrayToObject(arr, fn) {
    let res = {};
    arr.forEach(item => {
        fn(item, res);
    });

    return res;
}

function objectToArray(obj, fn) {
    let res = [];
    for (let key in obj) {
        res.push(fn(key, obj[key]));
    }

    return res;
}

function deepClone(obj, res) {
    if (obj === null) {
        return null;
    }

    if (typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj);
    }

    let data = new obj.constructor();
    for (let key in obj) {
        data[key] = deepClone(obj[key]);
    }
    return data;
}

module.exports = {
    log,
    LOG_TYPE,
    arrayToObject,
    objectToArray,
    deepClone
}