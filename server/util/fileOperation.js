const fs = require('fs');
const path = require('path');
const { log, LOG_TYPE } = require('./lib');

// 文件操作
const fo = {
    cwd: process.cwd(),
    existsSync(src) {
        return fs.existsSync(src);
    },
    /**
     * 文件删除
     */
    unlink(src, fn) {
        this.correctUrl(src);
        fs.unlink(src, (err) => {
            if (err) {
                log(err, LOG_TYPE.ERROR);
            }
            fn && fn();
        });

    },

    /**
     * 创建文件夹
     */
    mkdirSync(src) {
        try {
            if (!src) return;

            src = this.correctUrl(src + '');
            let temp = [];
            while (src && !fs.existsSync(src)) {
                temp.push(path.basename(src));
                src = path.dirname(src);
            }

            for (let i = temp.length - 1; i >= 0; i--) {
                src = path.join(src, temp[i]);
                fs.mkdirSync(src);
            }
        } catch (e) {
            log(e, LOG_TYPE.ERROR);
        }
    },

    /**
     * 修正URL  
     */
    correctUrl(url) {
        url = url.replace(/\\/g, '/');
        // 处理相对路径
        if (!path.isAbsolute(url)) {
            url = path.join(this.cwd, url);
        }
        return url;
    },

    /**
     * 读取文件
     */
    readJs(src) {
        src = this.correctUrl(src);

        try {
            // 更新缓存
            delete require.cache[src];

            return require(src);
        } catch (e) {
            log(e, LOG_TYPE.ERROR);
            return {};
        }
    },

    /**
     * 写入JS文件
     */
    writeJs(data, src, needModule = true) {
        src = this.correctUrl(src);

        let folder = path.dirname(src);
        this.mkdirSync(folder);

        let outStream = JSON.stringify(data, null, 4);

        if (needModule) {
            outStream = `module.exports = ${outStream}`;
        }
        try {
            fs.writeFileSync(src, outStream);
        } catch (e) {
            log(e, LOG_TYPE.ERROR);
        }
    }
}

module.exports = fo;