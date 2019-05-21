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

let generate = {
    FormTitleDEFAULT: {
        // template: string/function
        template: function() {
            let css = this.attrs.hasBorder ? 'border' : '';
            return `<h3 class="h-header ${css}">${this.attrs.title}</h3>`;
        },
        script: null
    },
    FormLayoutDEFAULT: {
        template: function() {
            let cols = this.attrs.cols,
                t = Math.floor(24 / cols),
                sum = 24,
                res = [];

            for (let i = 1, l = cols; i <= l; i++) {
                if (i === l) {
                    res.push(sum - t * (l - 1));
                } else {
                    res.push(t);
                }
            }

            let htmlCode = `<div class="el-row">`;
            this.attrs.formList.forEach((item, index) => {
                htmlCode += `<div class="el-col el-col-${res[index]}">{for:formList[${index}]}</div>`;
            });
            htmlCode += '</div>';
            return htmlCode;
        },
        script: null
    }
};

module.exports = {
    components,
    generate
};