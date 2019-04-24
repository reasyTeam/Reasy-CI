// 验证文件的正确性，同时修正参数
// 支持的valueType类型
const reg_valuetype = /^(enum|number|function|string|bool|array|regexp|sync)$/i

const { getType } = require('../util/lib');

const required = {
    modules: ['components', 'generate'],
    components: {
        propertys: ['name', 'title'],
        attrs: ['title'],
        typeDependence: {
            enum: {
                name: 'selectArray',
                valueType: 'Array'
            },
            array: {
                name: 'itemType',
                valueType: 'String'
            },
            sync: {
                name: 'syncKey',
                valueType: 'String'
            }
        }
    },
    generate: {}
};

class FileCheck {
    constructor() {
        this.errors = [];
        this.filePath = '';
        this.modules = null;
    }

    reset() {
        this.errors = [];
        this.filePath = '';
        this.modules = null;
    }

    startCheck(src) {
        this.reset();
        this.filePath = src;
        this.loadFile();
        // 开始检查文件
        this.check();
        // 检查wanc
        if (this.errors.length > 0) {
            return this.errors;
        }
        // 重新书写文件
        return [];
    }

    loadFile() {
        try {
            this.modules = require(this.filePath);
        } catch (e) {
            this.addError('语法错误', e.message + '\n' + e.stack);
        }
    }

    check() {
        // 检查模块
        this.checkModules();
        // 检查组件配置
        this.checkComponents();
        // 检查生成器配置
        this.checkGenerate();
    }

    checkModules() {
        let data = this.modules;

        required.modules.forEach(item => {
            if (data[item] === undefined || data[item] === null) {
                this.addError('模块缺失', `配置文件必须提供[${item}]模块`);
            } else if (typeof data[item] !== 'object') {
                this.addError('模块格式错误', `模块[${item}]必须为对象`);
            }
        });
    }

    checkComponents() {
        let components = this.modules.components;
        // 组件如果提供remark则使用remark如果没有提供则使用title
        if (!Array.isArray(components)) {
            this.addError('模块格式错误', `模块[components]必须为数组`);
        }

        components.components.forEach(cmpt => {
            let propertys = required.components.propertys;
            let _name = cmpt.name || '未知';

            // 组件属性验证 propertys
            propertys.forEach(pro => {
                if (cmpt[pro] === undefined || cmpt[pro] === null) {
                    this.addError('组件配置缺失', `组件[${_name}]配置[${pro}]为必填项`);
                }
            });

            this.checkAttrs(cmpt.attrs, _name);
        });
        this.checkAttrs(components.commonAttrs, 'commonAttrs');
    }

    checkAttrs(attrs, name) {
        let _attrs = required.components.attrs;
        for (let key in attrs) {
            let _propertys = attrs[key];

            _attrs.forEach(pro => {
                if (_propertys[pro] === undefined || _propertys[pro] === null) {
                    this.addError('组件属性配置缺失', `[${name}]属性配置项[${pro}]为必填项`);
                }
            });

            let _valueType = _propertys['valueType'],
                _deps = required.components.typeDependence,
                _dep;

            if (_valueType === undefined || _valueType === null) {
                this.addError('组件属性配置缺失', `[${name}]属性配置项[valueType]为必填项`);
                continue;
            }

            if (!reg_valuetype.test(_valueType)) {
                this.addError('组件属性配置错误', `[${name}]属性配置项[valueType]只能为[enum|number|function|string|bool|array|regexp|sync]中的一个`);
            } else if (_dep = _deps[_valueType]) {
                // 属性值依赖验证
                if (_propertys[_dep.name] === undefined || _propertys[_dep.name] === null) {
                    this.addError('组件属性配置错误', `[${name}]属性[valueType]为[${_valueType}]时，必须同时配置[${_dep.name}]属性`);
                } else if (getType(_propertys[_dep.name]) !== _dep.valueType) {
                    this.addError('组件属性配置错误', `[${name}]属性[_dep.name]配置的值类型必须为[${_dep.valueType}]`);
                }
            }
        }
    }

    checkGenerate(data) {
        let generate = this.modules.generate;
    }

    formatComponents() {
        let components = this.modules.components;
        components.components.forEach(item => {
            item.isContainer = !!item.isContainer;
            item.remark = item.remark || item.title;
            this.formatAttrs(item.attrs);
        });

        this.formatAttrs(components.commonAttrs);
    }

    formatAttrs(attrs) {
        Object.values(attrs).forEach(attr => {
            if (attr.selectArray && getType(attr.selectArray) === 'Array' && attr.selectArray.length > 0) {
                let value = attr.defaultValue,
                    hasValue = false;

                attr.selectArray = attr.selectArray.map(item => {
                    if (typeof item === 'object') {
                        hasValue = hasValue || value === item.value;
                        return item;
                    } else {
                        hasValue = hasValue || value === item;
                        return {
                            text: item,
                            value: item
                        }
                    }
                });

                if (!hasValue) {
                    attr.defaultValue = attr.selectArray[0]['value'];
                }
            }

            attr.required = !!attr.required;
        });
    }

    addError(type, content) {
        this.errors.push({
            type,
            content
        });
    }
}

module.exports = FileCheck;