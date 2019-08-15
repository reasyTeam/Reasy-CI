const generate = {
    commonTemplate: '<div id="{elementId}" data-key="{name}">',
    commonScript: `let {elementId} = $('#{elementId}').Rcomponent({attrs});`,
    FormCalendar: {
        template: '<input id="{elementId}" type="text" data-key="FormCalendar"/>'
    },
    FormTextarea: {
        template: '<textarea id="{elementId}" data-key="FormTextarea"/>'
    }
}

const components = {
    components: [{
        name: 'FormCalendar',
        title: '日期',
        showType: 'datetime',
        showOption: {
            title: 'dataTitle',
            value: 'defaultValue'
        },
        valueType: 'datetime',
        attrs: {
            hasWeekday: {
                title: '是否显示星期',
                valueType: 'bool',
                required: false,
                defaultValue: false
            },
            startYear: {
                title: '开始年份',
                valueType: 'number',
                required: true,
                defaultValue: 1970
            },
            endYear: {
                title: '结束年份',
                valueType: 'number',
                required: true,
                defaultValue: 2037
            },
            scanAble: {
                title: '是否可进行输入',
                valueType: 'bool',
                required: false,
                defaultValue: true
            }
        }
    }, {
        name: 'FormCheckbox',
        title: '开关',
        showType: 'switch',
        showOption: {
            title: 'dataTitle',
            value: 'defaultValue'
        },
        valueType: 'bool',
        attrs: {
            text: {
                title: '描述信息',
                valueType: 'string',
                required: false,
                defaultValue: ''
            }
        }
    }, {
        name: 'FormCheckList',
        title: '多选框',
        showType: 'checkbox',
        showOption: {
            title: 'dataTitle',
            value: 'defaultValue',
            selectArray: 'selectArray'
        },
        valueType: '2|selectArray',
        attrs: {
            selectArray: {
                title: '选项列表',
                valueType: 'array',
                itemType: 'object',
                required: false,
                defaultValue: []
            },
            valueType: {
                title: '选中数据的值类型',
                valueType: 'enum',
                selectArray: [{
                    text: '字符串',
                    value: 1
                }, {
                    text: '数组',
                    value: 2
                }, {
                    text: '布尔类型',
                    value: 3
                }],
                required: false,
                defaultValue: 1
            },
            joiner: {
                title: '数据为字符串时，选项之间的连接符',
                valueType: 'string',
                required: false,
                defaultValue: ';'
            },
            singleChange: {
                title: '单个CheckBox的change事件，与整个组件的change不同，在整个组件的change之后执行',
                valueType: 'function',
                required: false,
                defaultValue: null
            }
        }
    }, {
        name: 'FormDropDownList',
        title: '下拉框',
        showType: 'select',
        showOption: {
            title: 'dataTitle',
            value: 'defaultValue',
            selectArray: 'selectArray'
        },
        valueType: '1|selectArray',
        attrs: {
            selectArray: {
                title: '选项列表',
                valueType: 'array',
                itemType: 'object',
                required: false,
                defaultValue: []
            },
            customText: {
                title: '自定义值，不为空则表明可手动输入',
                valueType: 'string',
                required: false,
                defaultValue: ''
            },
            customTextSync: {
                title: '自定义选项的文本与自定义的值保持一致',
                valueType: 'bool',
                required: false,
                defaultValue: false
            },
            dataOptions: {
                title: '数据校验项',
                valueType: 'array',
                itemType: 'validate',
                required: false,
                defaultValue: ''
            },
            maxLength: {
                title: '最大输入字符个数',
                valueType: 'number',
                required: false,
                defaultValue: null
            },
            switchCallBack: {
                title: '显示状态切换hook',
                valueType: 'function',
                required: false,
                defaultValue: ''
            },
            clickCallBack: {
                title: '点击hook',
                valueType: 'function',
                required: false,
                defaultValue: ''
            },
            hideCallBack: {
                title: '下拉项收起hook',
                valueType: 'function',
                required: false,
                defaultValue: ''
            },
            blurCallBack: {
                title: '输入框失去焦点hook',
                valueType: 'function',
                required: false,
                defaultValue: ''
            },
            focusCallBack: {
                title: '输入框聚焦hook',
                valueType: 'function',
                required: false,
                defaultValue: ''
            }
        }
    }, {
        name: 'FormRadioList',
        title: '单选框',
        showType: 'radio',
        showOption: {
            title: 'dataTitle',
            value: 'defaultValue',
            selectArray: 'selectArray'
        },
        valueType: '1|selectArray',
        attrs: {
            selectArray: {
                title: '选项列表',
                valueType: 'array',
                itemType: 'object',
                required: false,
                defaultValue: []
            },
            radioIndex: {
                title: '用来区分多个相同的name的radio',
                valueType: 'string',
                required: false,
                defaultValue: ''
            }
        }
    }, {
        name: 'FormMultiInput',
        title: '多文本输入框',
        showType: 'input',
        showOption: {
            title: 'dataTitle',
            value: 'defaultValue',
            multiple: true,
            text: 'text',
            type: 'type',
            inputCount: 'inputCount',
            joiner: 'joiner'
        },
        valueType: 'string',
        attrs: {
            text: {
                title: '文本框前面显示的文本',
                valueType: 'string',
                required: false,
                defaultValue: ''
            },
            maxLength: {
                title: '最大输入字符数',
                valueType: 'number',
                required: false,
                defaultValue: 20
            },
            regExp: {
                title: '输入校验正则',
                valueType: 'regexp',
                required: false,
                defaultValue: null
            },
            valueType: {
                title: '值类型',
                valueType: 'enum',
                selectArray: [{ text: '字符串', value: 1 }, { text: '数组', value: 2 }],
                required: false,
                defaultValue: 1
            },
            dataOptions: {
                title: '数据校验项',
                valueType: 'array',
                itemType: 'validate',
                required: false,
                defaultValue: ''
            },
            inputCfg: {
                title: '文本输入框的的配置信息',
                valueType: 'array',
                itemType: 'object',
                required: false,
                defaultValue: ''
            },
            inputCount: {
                title: '文本框个数',
                valueType: 'number',
                required: false,
                defaultValue: 4
            },
            joiner: {
                title: '数据连接符',
                valueType: 'string',
                required: false,
                defaultValue: '.'
            }
        }
    }, {
        name: 'FormPercent',
        title: '百分比滑块',
        showType: 'slider',
        showOption: {
            title: 'dataTitle',
            value: 'defaultValue',
            showInput: 'showInput'
        },
        valueType: 'number',
        attrs: {
            start: {
                title: '最小值',
                valueType: 'number',
                required: false,
                defaultValue: 0
            },
            end: {
                title: '最大值',
                valueType: 'number',
                required: false,
                defaultValue: 100
            },
            showInput: {
                title: '显示输入框',
                valueType: 'bool',
                required: false,
                defaultValue: true
            },
            fixed: {
                title: '保留小数点后几位',
                valueType: 'number',
                required: false,
                defaultValue: 0
            }
        }
    }, {
        name: 'FormTab',
        title: 'Tab页签',
        showType: 'radio',
        showOption: {
            title: 'dataTitle',
            value: 'defaultValue',
            isButton: true,
            selectArray: 'selectArray'
        },
        valueType: '1|selectArray',
        attrs: {
            selectArray: {
                title: '选项列表',
                valueType: 'array',
                itemType: 'object',
                required: false,
                defaultValue: []
            },
            theme: {
                title: '显示主题',
                valueType: 'enum',
                selectArray: [{
                    text: '线条显示',
                    value: 'line-theme'
                }, { text: '色块显示', value: 'bg-theme' }],
                required: false,
                defaultValue: 'line-theme'
            }
        }
    }, {
        name: 'FormTextarea',
        title: '多行文本框',
        showType: 'input',
        showOption: {
            title: 'dataTitle',
            value: 'defaultValue',
            type: 'textarea',
            rows: 3
        },
        valueType: 'string',
        attrs: {
            placeholder: {
                title: '提示信息',
                valueType: 'string',
                required: false,
                defaultValue: ''
            },
            removeSpace: {
                title: '移除首尾空格',
                valueType: 'bool',
                required: false,
                defaultValue: false
            },
            dataOptions: { // 重点考虑项如何配置
                title: '数据校验项',
                valueType: 'array',
                itemType: 'validate',
                required: false,
                defaultValue: []
            },
            defaultText: {
                title: '值为空时显示的默认文本',
                valueType: 'string',
                required: false,
                defaultValue: ''
            },
            maxLength: {
                title: '最大输入字符数',
                valueType: 'number',
                required: false,
                defaultValue: null
            },
            rows: {
                title: '显示行数',
                valueType: 'number',
                required: false,
                defaultValue: 5
            },
            keyupCallBack: {
                title: 'keyup hook',
                valueType: 'function',
                required: false,
                defaultValue: null
            },
            focusCallBack: {
                title: '输入框聚焦hook',
                valueType: 'function',
                required: false,
                defaultValue: null
            }
        }
    }],
    commonAttrs: {
        elementId: {
            title: '容器id',
            valueType: 'string',
            required: true,
            ignore: true, // 生成代码时不使用该属性
            defaultValue: ''
        },
        // 该项或许不需要提供吧
        dataKey: {
            title: '组件类型',
            valueType: 'string',
            required: true,
            hidden: true, //不进行显示配置
            defaultValue: '$[name]'
        },
        dataField: {
            title: '数据字段',
            valueType: 'string',
            required: true,
            defaultValue: ''
        },
        dataTitle: {
            title: '标题，不填则无标题显示',
            valueType: 'string',
            required: false,
            defaultValue: '$[title]'
        },
        editable: {
            title: '是否可编辑',
            valueType: 'bool',
            required: false,
            defaultValue: true
        },
        required: {
            title: '是否必填',
            valueType: 'bool',
            required: false,
            defaultValue: true
        },
        visible: {
            title: '是否可见',
            valueType: 'bool',
            required: false,
            defaultValue: true
        },
        ignore: {
            title: '是否忽略组件',
            valueType: 'enum',
            selectArray: [{
                text: 'true',
                value: true
            }, {
                text: 'false',
                value: false
            }, {
                text: 'undefined',
                value: undefined
            }],
            required: false,
            defaultValue: undefined
        },
        defaultValue: {
            title: '默认值',
            valueType: 'sync',
            syncKey: 'valueType',
            required: false,
            defaultValue: ''
        },
        // sync: {
        //     title: '是否同步',
        //     valueType: 'bool',
        //     required: false,
        //     hidden: true, //不进行显示配置
        //     defaultValue: true
        // },
        css: {
            title: '自定义样式类',
            valueType: 'string',
            required: false,
            defaultValue: ''
        },
        needWrap: {
            title: '组件最外层是否需要容器包裹',
            valueType: 'bool',
            required: false,
            defaultValue: true
        },
        autoValidate: {
            title: '是否自动进行数据校验',
            valueType: 'bool',
            required: false,
            defaultValue: true
        },
        autoChange: {
            title: 'setValue是否自动执行change事件',
            valueType: 'bool',
            required: false,
            defaultValue: true
        },
        description: {
            title: '描述信息',
            valueType: 'string',
            required: false,
            defaultValue: ''
        },
        desClass: {
            title: '描述信息css类',
            valueType: 'string',
            required: false,
            defaultValue: ''
        },
        validateCustom: {
            title: '自定义错误信息提示方式',
            valueType: 'function',
            required: false,
            defaultValue: null
        },
        changeCallBack: {
            title: '组件值改变hook',
            valueType: 'function',
            required: false,
            defaultValue: null
        },
        validateCallBack: {
            title: '数据校验hook',
            valueType: 'function',
            required: false,
            defaultValue: null
        },
        afterChangeCallBack: {
            title: '组值改变后hook',
            valueType: 'function',
            required: false,
            defaultValue: null
        },
        renderedCallBack: {
            title: '组件渲染完成后的hook',
            valueType: 'function',
            required: false,
            defaultValue: null
        }
    }
};

module.exports = {
    generate,
    components
}