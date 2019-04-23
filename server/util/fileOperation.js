const fs = require('fs');
const path = require('path');
const { log, LOG_TYPE } = require('./lib');

// 文件操作
class FileOperation {
    constructor() {
        this.cwd = process.cwd();
    }

    /**
     * 文件删除
     */
    unlink(src, fn) {
        fs.unlink(src, (err) => {
            if (err) throw err;
            fn && fn();
        });

    }

    /**
     * 创建文件夹
     */
    mkdirSync(src) {
        if (!src) return;

        src = this.correctUrl(src + '');
        let temp = [];
        while (src && !fs.existsSync(src)) {
            temp.push(path.basename);
            src = path.dirname(src);
        }

        for (let i = temp.length - 1; i >= 0; i--) {
            src = path.join(src, temp[i]);
            fs.mkdirSync(src);
        }
    }

    /**
     * 修正URL  
     */
    correctUrl(url) {
        return url.replace(/\\/g, '/');
    }

    /**
     * 读取文件
     */
    readJs(src) {
        src = this.correctUrl(src);
        // 处理相对路径
        if (!path.isAbsolute(src)) {
            src = path.join(this.cwd, src);
        }

        try {
            return require(src);
        } catch (e) {
            log(e, LOG_TYPE.ERROR);
            return {};
        }
    }
}

let fo = new FileOperation();

module.exports = fo;