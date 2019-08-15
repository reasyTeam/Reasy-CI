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

module.exports = {
    generate
}