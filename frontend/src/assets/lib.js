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


export {
    deepClone
}