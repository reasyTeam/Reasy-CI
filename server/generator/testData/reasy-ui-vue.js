const generate = {
    htmlModels: {
        'v-Input': '<input data-key="v-Input" type="{type}">'
    },
    // 好像不需要喔，直接根据内容去选择即可
    jsModels: {},
    // 框架 vue, jquery, react
    // 通过框架来决定最后生成文件的格式
    framework: 'vue',

}

// // 默认的属性配置值
// defaultKey: {
//     title: 'xxx', // 描述信息，必须提供
//     valueType: 'string', // 必须提供[string,number,bool,array,object,enum]，根据不同的值类型渲染不同的配置组件
//     required: false, // 保存配置信息时验证必填项是否填写
//     defaultValue: null
// },
const components = {
    components: [{
        name: 'v-Input',
        title: '文本框',
        isContainer: false,
        attrs: {
            placeholder: {
                title: 'type类型',
                valueType: 'enum',
                selectArray: ['text', 'password'],
                required: false,
                defaultValue: 'text'
            },
            placeholder: {
                title: '提示信息',
                valueType: 'string',
                required: false,
                defaultValue: ''
            },
            displayMode: {
                title: '模式',
                valueType: 'enum',
                selectArray: [{
                    text: '只读',
                    value: 'readonly'
                }, {
                    text: '写入',
                    value: 'edit'
                }, {
                    text: '只读/写入切换',
                    value: 'readEdit'
                }],
                required: true,
                defaultValue: 'edit'
            },
            removeSpace: {
                title: '移除首尾空格',
                valueType: 'bool',
                required: false,
                defaultValue: false
            },
            hasEyes: {
                title: '是否有眼睛图标显示',
                valueType: 'bool',
                required: false,
                defaultValue: false
            },
            hasTitleDes: {
                title: '输入框前面的间短的描述性文字',
                valueType: 'string',
                required: false,
                defaultValue: ''
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
            defaultTextClass: {
                title: '默认文本class',
                valueType: 'string',
                required: false,
                defaultValue: 'gray'
            },
            dataPrefix: {
                title: '只读模式显示值前缀',
                valueType: 'string',
                required: false,
                defaultValue: ''
            }
        }
    }, {
        name: 'v-Checkbox',
        title: '复选框',
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
        name: 'v-CheckList',
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
        name: 'v-RadioList',
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
        name: 'v-Percent',
        title: '百分比滑块',
        isContainer: false,
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
        name: 'v-Textarea',
        title: '多行文本框',
        isContainer: false,
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
                valueType: 'num',
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
                title: 'xxxxx',
                valueType: 'function',
                required: false,
                defaultValue: null
            },
            focusCallBack: {
                title: 'xxxxx',
                valueType: 'function',
                required: false,
                defaultValue: null
            }
        }
    }, {
        name: 'v-Upload',
        title: '上传',
        isContainer: false,
        attrs: {
            submitUrl: {
                title: '提交地址',
                valueType: 'string',
                required: true,
                defaultValue: ''
            },
            showFileText: {
                title: '是否显示上传文件名框',
                valueType: 'bool',
                required: false,
                defaultValue: true
            },
            showLoading: {
                title: '是否显示上传中',
                valueType: 'string',
                required: false,
                defaultValue: false
            },
            browseText: {
                title: '文件浏览按钮文本',
                valueType: 'string',
                required: false,
                defaultValue: 'Browse'
            },
            uploadText: {
                title: '上传按钮文本',
                valueType: 'string',
                required: false,
                defaultValue: 'Upload'
            },
            uploaddingText: {
                title: '上传文件过程中的提示语',
                valueType: 'string',
                required: false,
                defaultValue: 'Uploading...'
            },
            emptyFileText: {
                title: '文件为空时的提示语',
                valueType: 'string',
                required: false,
                defaultValue: 'Select an upgrade file'
            },
            uploadBtnType: {
                title: '显示模式',
                valueType: 'enum',
                selectArray: [
                    { text: '显示上传文本', value: 1 },
                    { text: '上传按钮显示图标', value: 2 }
                ],
                required: false,
                defaultValue: 1
            },
            uploadIcon: {
                title: '上传按钮图标',
                valueType: 'string',
                required: false,
                defaultValue: 'icon-add'
            },
            beforeUpload: {
                title: 'xxxxx',
                valueType: 'function',
                required: false,
                defaultValue: null
            },
            success: {
                title: 'xxxxx',
                valueType: 'function',
                required: false,
                defaultValue: null
            }
        }
    }, {
        name: 'v-Table',
        title: '表格',
        isContainer: false,
        ignorCommon: true,
        attrs: {
            requestUrl: {
                title: '请求地址',
                valueType: 'string',
                required: false,
                defaultValue: ''
            },
            requestOpt: {
                title: '请求参数',
                valueType: 'object',
                required: false,
                defaultValue: {}
            },
            requestType: {
                title: '请求类型',
                valueType: 'enum',
                selectArray: ['get', 'post'],
                required: false,
                defaultValue: 'post'
            },
            data: {
                title: '表格数据',
                valueType: 'array',
                arrayItem: 'object',
                required: false,
                defaultValue: []
            },
            dataTarget: {
                title: '数据项的子项',
                valueType: 'string',
                required: false,
                defaultValue: ''
            },
            perArray: {
                title: '每页显示条数数组',
                valueType: 'array',
                itemType: 'number',
                required: false,
                defaultValue: [10, 20, 30, 50]
            },
            perNum: {
                title: '每页显示的数据数',
                valueType: 'number',
                required: false,
                defaultValue: 10
            },
            pageIndex: {
                title: '当前起始页',
                valueType: 'number',
                required: false,
                defaultValue: 0
            },
            showStyle: {
                title: '数据显示类型',
                valueType: 'enum',
                selectArray: [{ text: '分页', value: 1 }, { text: '不分页', value: 2 }],
                required: false,
                defaultValue: 1
            },
            limit: {
                title: '最多显示的数据条数',
                valueType: 'number',
                required: false,
                defaultValue: 0
            },
            filterProperty: {
                title: '过滤字段',
                valueType: 'array',
                itemType: 'string',
                required: false,
                defaultValue: []
            },
            showIndex: {
                title: '显示序号',
                valueType: 'bool',
                required: false,
                defaultValue: false
            },
            key: {
                title: '主键字段',
                valueType: 'string',
                required: true,
                defaultValue: 'ID'
            },
            sortFields: {
                title: '排序字段规则优先级顺序',
                valueType: 'array',
                itemType: 'string',
                required: false,
                defaultValue: []
            },
            sortOpt: {
                title: '排序字段对应的排序规则',
                valueType: 'object',
                required: false,
                defaultValue: {}
            },
            sortFunction: {
                title: '自定义排序函数',
                valueType: 'function',
                required: false,
                defaultValue: null
            },
            showCheckbox: {
                title: '显示checkbox',
                valueType: 'bool',
                required: false,
                defaultValue: false
            },
            maxIndex: {
                title: '分页栏最多显示按钮数',
                valueType: 'number',
                required: false,
                defaultValue: 7
            },
            updateCallback: {
                title: '数据更新回调',
                valueType: 'function',
                required: false,
                defaultValue: null
            },
            changePageNumCallBack: {
                title: '改变每页显示条数回调',
                valueType: 'function',
                required: false,
                defaultValue: null
            },
            beforeUpdate: {
                title: '数据更新前操作',
                valueType: 'function',
                required: false,
                defaultValue: null
            }, // 列如何配置
            columns: {
                title: '列配置',
                valueType: 'array',
                arrayItem: {
                    field: {
                        title: '单元格对应的字段',
                        valueType: 'string',
                        required: true,
                        defaultValue: ''
                    },
                    title: {
                        title: '列显示标题',
                        valueType: 'string',
                        required: false,
                        defaultValue: ''
                    },
                    width: {
                        title: '列宽',
                        valueType: 'string',
                        required: false,
                        defaultValue: ''
                    },
                    sortable: {
                        title: '设置字段是否可以排序',
                        valueType: 'bool',
                        required: false,
                        defaultValue: false
                    },
                    sortCallBack: {
                        title: '自定义排序逻辑函数',
                        valueType: 'function',
                        required: false,
                        defaultValue: null
                    },
                    format: {
                        title: '格式化单元格数据，必须有返回值',
                        valueType: 'function',
                        required: false,
                        defaultValue: null
                    },
                    rendered: {
                        title: '渲染完成后的回调',
                        valueType: 'function',
                        required: false,
                        defaultValue: null
                    }
                },
                required: true,
                defaultValue: []
            }
        }
    }],
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
        dataTitle: {
            title: '标题，不填则无标题显示',
            valueType: 'string',
            required: false,
            defaultValue: ''
        },
        editable: {
            title: '是否可编辑',
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
        required: {
            title: '是否必填',
            valueType: 'bool',
            required: false,
            defaultValue: true
        },
        description: {
            title: '描述信息',
            valueType: 'string',
            required: false,
            defaultValue: ''
        }
    }
};

module.exports = {
    generate,
    components
}