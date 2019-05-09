let components = [{
    name: 'FormTitleDEFAULT',
    title: '标题组件',
    showType: 'title',
    showOption: {
        title: 'title',
        hasBorder: 'hasBorder'
    },
    noTitle: true,
    valueType: 'string',
    attrs: {
        title: {
            title: '标题内容',
            valueType: 'string',
            defaultValue: '标题'
        },
        hasBorder: {
            title: '是否需要下划线',
            valueType: 'bool',
            defaultValue: true
        }
    }
}, {
    name: 'FormLayoutDEFAULT',
    title: '布局组件',
    showType: 'layout',
    showOption: {
        cols: 'cols',
        title: '布局容器',
        formList: 'formList'
    },
    isContainer: true,
    noTitle: true,
    attrs: {
        cols: {
            title: '列数',
            valueType: 'number',
            required: false,
            min: 1,
            max: 8,
            defaultValue: 2
        },
        formList: {
            valueType: 'array',
            hidden: true,
            defaultValue: []
        }
    }
}];

module.exports = components;