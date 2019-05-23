/* eslint-disable */
import Vue from 'vue';
const axios = require('axios');
// const API = 'http://localhost:8888/api/';
const API = 'api/';

let $http = {};

$http.getData = function(url, data, method, responseType) {
    return request(url, data, method, responseType);
};

$http.setData = function(url, data, method, responseType) {
    return request(url, data, method, responseType)
};

$http.setJson = function(url, data, method, responseType) {
    data = JSON.stringify(data);
    return request(url, data, method, responseType)
};

$http.download = function(data, url = 'download') {
    return axios({
        url: `${API}${url}`,
        params: data,
        method: 'get',
        responseType: 'blob'
    }).then(res => {
        if (!res.data) {
            return;
        }
        if (res.data.type === "application/json") {
            Vue.myMess({
                type: "error",
                message: "文件下载失败"
            });
        } else {
            let blob = new Blob([res.data]);
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, data.fileName);
            } else {
                let link = document.createElement("a");
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", false, false);
                link.href = URL.createObjectURL(blob);
                link.download = data.fileName;
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(link.href);
            }
        }
    })
}

// 跨域请求
// CORS跨域content-type只能为text/plain, multipart/form-data, application/x-www-form-urlencoded中的一个，否则就是非简单请求
$http.getDataCros = function() {

};

function request(url, data = '', method = 'post', responseType = 'json') {
    let option = {
        method,
        url: `${API}${url.replace(/^\/+/, '')}`,
        responseType
    };

    if (method.toLocaleLowerCase() === 'get') {
        option.params = data;
    } else {
        option.data = data;
    }

    return axios(option)
        .then(response => {
            let data = response.data;

            if (response.config.responseType === 'blob') {
                let blob = new Blob([data]);
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, data.fileName);
                } else {
                    let link = document.createElement("a");
                    let evt = document.createEvent("HTMLEvents");
                    evt.initEvent("click", false, false);
                    link.href = URL.createObjectURL(blob);
                    link.download = data.fileName;
                    if (!data.fileName) {
                        let match = response.headers['content-disposition'].match(/filename=([\w\W]*)/);
                        link.download = match ? match[1] : 'page.zip';
                    }

                    link.style.display = "none";
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(link.href);
                }
                return;
            }

            if (data === -1 || data.error === -1) {
                Vue.myMess({
                    message: '服务器错误，请稍后再试',
                    type: "error"
                });
                return -1;
            }
            return data;
        }).catch(error => {
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log('error code ', error.response.status);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }

            Vue.myMess({
                message: '服务器错误，请稍后再试',
                type: "error"
            });
            return -1;
        });
}

/**
 * 验证账户信息是否超时
 * 如果通过其他方式验证，可以修改该方法
 */
function _handleResult(data) {
    if (typeof data !== 'string') {
        return;
    }

    if (data.indexOf("login.js") > 0) {
        return GO_TO.login;
    }
    if (data.indexOf("quickset.js") > 0) {
        return GO_TO.quickset;
    }
}

Vue.prototype.$http = $http;

export default $http;