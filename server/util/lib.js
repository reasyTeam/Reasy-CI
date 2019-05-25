const chalk = require('chalk');

const LOG_TYPE = {
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    NORMAL: 'LOG',
    MESSAGE: 'MESSAGE'
};

const log = function(mess, type = LOG_TYPE.NORMAL) {
    if (type === LOG_TYPE.ERROR && mess.message) {
        mess = mess.message + '\n' + mess.stack;
    }

    mess = `[${type}]-[${mess}]`;

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

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function formatCode(template, obj) {
    if (!template) {
        return res;
    }

    return template.replace(/\{\{([^\}]+)\}\}/ig, function($1, $2) {
        let key = $2.split('|');
        return obj[key[0]] || $1;
    })
}

module.exports = {
    log,
    LOG_TYPE,
    arrayToObject,
    objectToArray,
    deepClone,
    getType,
    formatCode
}