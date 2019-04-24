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

// // 默认的属性配置值
// defaultKey: {
//     title: 'xxx', // 描述信息，必须提供
//     valueType: 'string', // 必须提供[string,number,bool,array,object,enum]，根据不同的值类型渲染不同的配置组件
//     required: false, // 保存配置信息时验证必填项是否填写
//     defaultValue: null
// },
const components = {
    components: [{
        name: 'FormInput',
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
            },
            regExp: {
                title: '允许输入项的正则',
                valueType: 'regexp',
                required: false,
                defaultValue: null
            },
            maxLength: {
                title: '最大输入字符数',
                valueType: 'number',
                required: false,
                defaultValue: null
            },
            maxCallBack: {
                title: '值大于max回调',
                valueType: 'function',
                required: false,
                defaultValue: null
            },
            switchCallBack: {
                title: '切换模式回调',
                valueType: 'function',
                required: false,
                defaultValue: null
            },
            focusCallBack: {
                title: '聚焦回调',
                valueType: 'function',
                required: false,
                defaultValue: null
            },
            blurCallBack: {
                title: '失焦回调',
                valueType: 'function',
                required: false,
                defaultValue: null
            }
        }
    }, {
        name: 'FormCalendar',
        title: '日期',
        isContainer: false,
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
        name: 'FormDropDownList',
        title: '下拉框',
        isContainer: false,
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
                title: 'xxxxx',
                valueType: 'function',
                required: false,
                defaultValue: ''
            },
            clickCallBack: {
                title: 'xxxxx',
                valueType: 'function',
                required: false,
                defaultValue: ''
            },
            hideCallBack: {
                title: 'xxxxx',
                valueType: 'function',
                required: false,
                defaultValue: ''
            },
            blurCallBack: {
                title: 'xxxxx',
                valueType: 'function',
                required: false,
                defaultValue: ''
            },
            focusCallBack: {
                title: 'xxxxx',
                valueType: 'function',
                required: false,
                defaultValue: ''
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
        name: 'FormMultiInput',
        title: '多文本输入框',
        isContainer: false,
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
                defaultValue: null
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
                defaultValue: 0
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
    }, {
        name: 'FormTextarea',
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
        name: 'FormUpload',
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
        name: 'FormTable',
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
        ignore: {
            title: '是否忽略组件',
            valueType: 'enum',
            selectArray: [true, false, undefined],
            required: false,
            defaultValue: undefined
        },
        sync: {
            title: '是否同步',
            valueType: 'string',
            required: false,
            defaultValue: ''
        },
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
        required: {
            title: '是否必填',
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
        defaultValue: {
            title: '默认值',
            valueType: 'sync',
            syncKey: 'dataValueType',
            required: false,
            defaultValue: ''
        },
        dataValueType: {
            title: '值类型',
            valueType: 'enum', // bool, num, float, string
            selectArray: ['bool', 'num', 'float', 'string'],
            required: false,
            defaultValue: 'string'
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
            title: '组件值改变回调函数',
            valueType: 'function',
            required: false,
            defaultValue: null
        },
        validateCallBack: {
            title: '数据校验回调函数',
            valueType: 'function',
            required: false,
            defaultValue: null
        },
        afterChangeCallBack: {
            title: '组值改变后回调',
            valueType: 'function',
            required: false,
            defaultValue: null
        },
        renderedCallBack: {
            title: '组件渲染完成后的回调',
            valueType: 'function',
            required: false,
            defaultValue: null
        }
    }
};

const validate = {
    len: {
        title: '字符长度',
        args: [{
            title: '最小值',
            required: false,
            valueType: 'number'
        }, {
            title: '最大值',
            required: false,
            valueType: 'number'
        }]
    },
    byteLen: {
        title: '字节长度',
        args: [{
            title: '最小值',
            required: false,
            valueType: 'number'
        }, {
            title: '最大值',
            required: false,
            valueType: 'number'
        }]
    },
    num: {
        title: '数值大小',
        args: [{
            title: '最小值',
            required: false,
            valueType: 'number'
        }, {
            title: '最大值',
            required: false,
            valueType: 'number'
        }]
    },
    ap: {
        title: 'AP名称'
    },
    apPwd: {
        title: 'AP密码'
    },
    float: {
        title: '浮点数大小',
        args: [{
            title: '最小值',
            required: false,
            valueType: 'number'
        }, {
            title: '最大值',
            required: false,
            valueType: 'number'
        }]
    },
    url: {
        title: 'URL'
    },
    normalDomain: {
        title: '通用域名'
    },
    authUrl: {
        title: '认证URL'
    },
    phoneNumber: {
        title: '电话号码',
        args: [{
            title: '号码长度',
            required: false,
            valueType: 'number'
        }]
    },
    messageUrl: {
        title: 'SMS-URL'
    },
    specailText: {
        title: '特殊字符串',
        args: [{
            title: '被包含的字符串',
            required: false,
            valueType: 'string'
        }, {
            title: '错误提示信息',
            required: true,
            valueType: 'string'
        }]
    },
    domain_special: {
        title: 'dns定向转发域名'
    },
    domainName: {
        title: 'dns劫持域名'
    },
    'mac.all': {
        title: 'Mac地址'
    },
    'ip.all': { title: 'All IP' },
    'ip.ipnet': { title: 'IPNET' },
    'ip.specific': { title: 'Specific IP' },
    privateIP: {
        title: 'privateIP'
    },
    'ipSegment.all': {
        title: "ipSegment"
    },
    //判断输入IP地址与lanIP是否在同一个网段
    'netSegmentCheck.all': {
        title: 'IP地址与lanIP是否在同一个网段'
    },
    mask: {
        title: 'Mask'
    },
    // 可以输入全255.255.255.255
    allMask: {
        title: 'all Mask'
    },
    email: {
        title: '邮箱'
    },
    smtpAccount: {
        title: 'smtpAccount'
    },
    time: {
        title: '时间验证'
    },
    hex: {
        title: 'hex'
    },
    /**
     * 检测是否包含全角字符
     * @param  {[type]} str [待检测字符串]
     * @return {[type]}     [true：包含全角字符 false:不包含]
     */
    chkHalf: {
        title: '是否包含全角字符'
    },
    ascii: {
        title: 'ascii',
        args: [{
            title: '最小字节长度',
            required: false,
            valueType: 'number'
        }, {
            title: '最大字节长度',
            required: false,
            valueType: 'number'
        }]
    },
    pwd: {
        title: '密码',
        args: [{
            title: '最小长度',
            required: false,
            valueType: 'number'
        }, {
            title: '最大长度',
            required: false,
            valueType: 'number'
        }]
    },
    username: {
        title: '用户名',
        args: [{
            title: '最小字节长度',
            required: false,
            valueType: 'number'
        }, {
            title: '最大字节长度',
            required: false,
            valueType: 'number'
        }]
    },
    ssidPasword: {
        title: 'SSID密码',
        args: [{
            title: '最小长度',
            required: false,
            valueType: 'number'
        }, {
            title: '最大长度',
            required: false,
            valueType: 'number'
        }]
    },
    specialChar: {
        title: '特殊字符',
        args: [{
            title: '不允许输入字符集合',
            required: false,
            valueType: 'string'
        }]
    },
    remarkTxt: {
        title: '备注',
        args: [{
            title: '最小字节长度',
            required: false,
            valueType: 'number'
        }, {
            title: '最大字节长度',
            required: false,
            valueType: 'number'
        }]
    },
    noBlank: {
        title: '不允许包含空格'
    },
    charTxt: {
        title: '只允许包含数字和字母'
    },
    startEndNoBlank: {
        title: '首尾不允许包含空格'
    },
    hostName: {
        title: '主机名称'
    },
    serverName: {
        title: '服务器名称',
        args: [{
            title: '最小长度',
            required: false,
            valueType: 'number'
        }, {
            title: '最大长度',
            required: false,
            valueType: 'number'
        }]
    },
    lanMask: {
        title: 'lan Mask'
    },
    nospace: {
        title: '不允许包含空格'
    },
};

module.exports = {
    generate,
    components,
    validate
}