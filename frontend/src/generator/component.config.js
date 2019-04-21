// 默认的组件库
// 布默认情况下所有的组件都是独占一行的

export default {
    // 容器组件
    container: {
        // 用于配置时显示的名称
        title: '容器',
        // 标识组件可以作为一个容器组件进行使用
        isContainer: true,
        // 可配置的属性, 属性的名称需要与组件使用时的名称保持一致，否则生成的代码会有语法错误或者配置不生效
        attrs: [{
            // 属性名称，用于代码生成
            name: 'title',
            // 属性的描述信息，尽量简短
            title: '容器标题',
            // 通过值类型去显示值配置组件，string就显示文本框，bool就显示开关等，预设的类型[string, array， number，bool, object]
            valueType: 'string', // 可多选
            // 可选值，用于值为枚举的类型时使用
            optionValue: [],
            // 默认值
            defaultValue: '',
            // 需要在html上进行配置的属性
            isHtmlAttr: false,
            // 属性是否必填
            required: true
        }]
    },
    // 一个布局被分为24个等分的列
    layout: {
        // 用于配置时显示的名称
        title: '布局',
        // 标识组件可以作为一个容器组件进行使用
        isContainer: true,
        // 可配置的属性
        attrs: []
    },
    // 部分组件公共都有的属性
    commonAttrs: [{
        // 属性名称，用于代码生成
        name: 'title',
        // 属性的描述信息，尽量简短
        title: '容器标题',
        // 等等
        // 排除在外的组件
        exclude: [],
        // 包含在内的组件
        include: []
    }]
}