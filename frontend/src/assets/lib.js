function deepClone(obj) {
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

function getAttrs(template) {
    let res = {};
    if (!template) {
        return res;
    }

    let match = template.match(/\{\{([^}]+)\}\}/ig);
    if (match) {
        match.map(item => {
            item = item.slice(2, -2);
            if (!/^js$|^html$/i.test(item)) {
                item = item.split('|');
                res[item[0]] = {
                    title: item[0],
                    valueType: item[1] || 'input',
                    defaultValue: ''
                }
            }
        });
    }
    return res;
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

export {
    deepClone,
    getAttrs,
    formatCode
}