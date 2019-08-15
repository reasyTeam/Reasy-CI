// 验证文件的正确性，同时修正参数
// 支持的valueType类型
const reg_valuetype = /^(enum|number|function|string|bool|array|regexp|sync|object|code)$/i
const reg_showtype = /^(input|switch|datetime|select|checkbox|radio|slider|upload|table|layout|label)$/i
const fo = require('../util/fileOperation');
const { getType } = require('../util/lib');

const required = {
    modules: ['components', 'generate'],
    components: {
        propertys: ['name', 'title', 'showType', 'showOption'],
        attrs: ['title', 'valueType'],
        showOption: { // 不同的showType对应的showOption的必填项
            input: ['title', 'type', 'value'],
            datetime: ['title', 'value'],
            label: ['title', 'value'],
            switch: ['title', 'value'],
            select: ['title', 'selectArray', 'value'],
            checkbox: ['title', 'selectArray', 'value'],
            radio: ['title', 'selectArray', 'value'],
            slider: ['title', 'value'],
            upload: ['title'],
            table: ['title', 'columns']
        },
        typeDependence: {
            enum: {
                name: 'selectArray',
                valueType: /^Array$/i
            },
            array: {
                name: 'itemType',
                valueType: /^(String|Object)$/i
            },
            sync: {
                name: 'syncKey',
                valueType: /^String$/i
            }
        }
    },
    generate: {
        propertys: ['commonTemplate', 'commonScript']
    }
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
        if (this.loadFile()) {
            // 开始检查文件
            this.check();
        }
        // 检查wanc
        if (this.errors.length > 0) {
            return this.errors;
        }
        // 重新书写文件
        this.format();
        return [];
    }

    loadFile() {
        try {
            this.modules = require(this.filePath);
            return true;
        } catch (e) {
            this.addError('文件有语法错误', e.name + ': ' + e.message);
            return false;
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
            } else if (getType(data[item]) !== 'Object') {
                this.addError('模块格式错误', `模块[${item}]必须为对象`);
            }
        });
    }

    checkComponents() {
        let components = this.modules.components;
        // 组件如果提供remark则使用remark如果没有提供则使用title
        if (!Array.isArray(components.components)) {
            this.addError('模块格式错误', `模块[components]必须为数组`);
        }

        components.components.forEach(cmpt => {
            let propertys = required.components.propertys;
            let _name = cmpt.name || '未知';

            // 组件属性验证 propertys
            propertys.forEach(pro => {
                if (cmpt[pro] === undefined || cmpt[pro] === null) {
                    this.addError('组件配置缺失', `组件[${_name}]的配置项[${pro}]为必填项`);
                }
            });

            let type, option;
            if ((option = cmpt['showOption']) && (type = cmpt['showType'])) {
                if (!reg_showtype.test(type)) {
                    this.addError('组件配置错误', `组件[${_name}]的配置项[showType]只能为[${reg_showtype.source.replace(/[\^\$\(\)]/g, '')}]中的一个`);
                } else {
                    cmpt['showType'] = type.toLowerCase();
                }

                let showOption = required.components.showOption[cmpt['showType']];
                showOption && showOption.forEach(pType => {
                    if (option[pType] === undefined || option[pType] === null) {
                        this.addError('组件配置缺失', `组件[${_name}]的配置项[showOption]中的[${pType}]为必填项`);
                    }
                });

                if (cmpt.isContainer && !option['formList']) {
                    this.addError('组件配置缺失', `组件[${_name}]为容器组件，其配置项[showOption]中的[formList]为必填项`);
                }
            }

            this.checkAttrs(cmpt.attrs, _name);
        });
        this.checkAttrs(components.commonAttrs, 'commonAttrs');
    }

    checkAttrs(attrs, name) {
        let _attrs = required.components.attrs;
        for (let key in attrs) {
            let _propertys = attrs[key];

            if (_propertys['hidden']) {
                // 对于hidden的属性不进行检验
                continue;
            }

            _attrs.forEach(pro => {
                if (_propertys[pro] === undefined || _propertys[pro] === null) {
                    this.addError('组件属性配置缺失', `[${name}]的属性[${key}]配置项[${pro}]为必填项`);
                }
            });

            let _valueType = _propertys['valueType'],
                _deps = required.components.typeDependence,
                _dep;

            if (_valueType === undefined || _valueType === null) {
                this.addError('组件属性配置缺失', `[${name}]的属性[${key}]配置项[valueType]为必填项`);
                continue;
            }

            if (!reg_valuetype.test(_valueType)) {
                this.addError('组件属性配置错误', `[${name}]的属性[${key}]配置项[valueType]只能为[${reg_valuetype.source.replace(/[\^\$\(\)]/g, '')}]中的一个`);
            } else {
                _propertys['valueType'] = (_valueType + '').toLowerCase();
                if (_dep = _deps[_valueType]) {
                    // 属性值依赖验证
                    if (_propertys[_dep.name] === undefined || _propertys[_dep.name] === null) {
                        this.addError('组件属性配置错误', `[${name}]的属性[${key}]配置项[valueType]为[${_valueType}]时，必须同时配置[${_dep.name}]属性`);
                    } else if (!_dep.valueType.test(getType(_propertys[_dep.name]))) {
                        this.addError('组件属性配置错误', `[${name}]的属性[${key}]配置项[_dep.name]配置的值类型必须为[${_dep.valueType}]`);
                    } else if (_valueType === 'array') {
                        if (getType(_propertys[_dep.name]) === 'Object') {
                            this.checkAttrs(_propertys[_dep.name], `${name}.${key}.${_dep.name}`);
                        }
                    }
                }
            }
        }
    }

    checkGenerate() {
        let data = this.modules.generate;
        required.generate.propertys.forEach(item => {
            if (data[item] === undefined || data[item] === null) {
                this.addError('generate配置缺失', `generate配置文件必须提供[${item}]配置`);
            }
        });
    }

    format() {
        this.formatComponents();

        this.writeFile();
    }

    formatComponents() {
        let components = this.modules.components;
        components.components.forEach(item => {
            item.isContainer = !!item.isContainer;
            item.noTitle = !!item.noTitle;
            item.remark = item.remark || item.title;
            this.formatAttrs(item.attrs);
        });

        this.formatAttrs(components.commonAttrs);
    }

    formatAttrs(attrs) {
        if (!attrs) {
            return;
        }
        Object.values(attrs).forEach(attr => {
            // valueType全部转换为小写
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

                //通过表达式获取对应的值
                if (!hasValue && !/^\$\[[\s\S]*\]$/.test(attr.defaultValue)) {
                    attr.defaultValue = attr.selectArray[0]['value'];
                }
            }

            attr.required = !!attr.required;
            // 是否显示配置属性
            attr.hidden = !!attr.hidden;
        });
    }

    addError(type, content) {
        this.errors.push({
            type,
            content
        });
    }

    writeFile() {
        fo.writeJs(this.modules, this.filePath);
    }
}

module.exports = FileCheck;