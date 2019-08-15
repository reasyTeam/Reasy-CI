const generate = {
    htmlModels: {
        FormInput: '<input data-key="FormInput" type="{type}">'
    },
    // 好像不需要喔，直接根据内容去选择即可
    jsModels: {},
    // 框架 vue, jquery, react
    // 通过框架来决定最后生成文件的格式
    framework: 'vue',

}

const components = {
    components: [{
        name: 'FormCheckbox',
        isContainer: false,
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
        isContainer: false,
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
        name: 'FormRadioList',
        title: '单选框',
        isContainer: false,
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
        name: 'FormTab',
        title: 'Tab页签',
        isContainer: false,
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
                selectItem: [{
                    text: '线条显示',
                    value: 'line-theme'
                }, { text: '色块显示', value: 'bg-theme' }],
                required: false,
                defaultValue: 'line-theme'
            }
        }
    }, ],
    commonAttrs: {
        // 该项或许不需要提供吧
        dataKey: {
            title: '组件类型',
            valueType: 'string',
            required: true,
            defaultValue: ''
        },
        dataField: {
            title: '数据字段',
            valueType: 'string',
            required: true,
            defaultValue: ''
        },
        renderedCallBack: {
            title: '组件渲染完成后的回调',
            valueType: 'function',
            required: false,
            defaultValue: null
        }
    }
};

module.exports = {
    generate,
    components,
    validate
}