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
            return data;
        }).catch(error => {
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
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