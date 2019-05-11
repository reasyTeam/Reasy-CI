# Reasy-CI

## 功能记录

1. 无需登录
2. 切换组件
3. 读取组件的相关配置
4. 组件数据一键入库，同时可以一键更新组件的数据配置
5. 记录已生成的页面模板，供下次使用，点击保存可将模板入库，没有入库的模板默认保存在浏览器本地
6. **记录的配置数据与组件无关，通过提供的组件使用模板生成代码**
7. 支持样式类的生成
8. 使用element-UI配置界面
9. 提供组件录入管理，已配置项目管理，新项目配置页面
10. 提供数据校验方法的名称和参数录入洁面

## 设计思路
1. 上传组件配置，写入特定的文件夹，数据库组建表只记录，组建与写入地址的信息，不记录配置信息。
2. 组件代码生成逻辑，怎么生成，通过配置怎么去生成对应的代码
3. 存储的配置，也存储配置文件，数据库记录配置名称和配置文件的地址

## 代码生成思路
1. 读取页面配置信息
2. 根据页面的生命周期生成对应的代码
3. 如何做到同一份配置根据不同组件库生成不同的代码（目前应该是做不到的，不同的库拥有的组件不一样配置也不一样，无法做到，除非找到对应的映射关系，才能共用一套配置）

## todo
1. 每天定时跑一遍程序删除没有使用的的配置文件，对应的file表中的数据也进行清空
2. 验证上传的属性配置文件的正确性（必填属性是否填写，枚举值是否存在） -ok
3. 验证上传的代码生成文件的正确性 
4. 不同的valueType对应不同的显示 -ok
5. 根据设定的valueType的值，修正defaultvalue，转成符合格式对应的值 -ok
6. 属性列表按优先级进行排序，把不是特别需要的配置项放在最下面 -ok 通过配置文件去指定顺序
7. 添加配置文件验证项，没有验证的配置项都进行验证 -ok
8. 修改valueType为array对应的配置 -ok
9. 完善不同组件对应的显示demo -ok
10. 切换组件库重置配置项，同时重置组件列表项 -ok
11. 验证组件库配置文件更新，对应的文件是否同时更新的问题 -ok
12. 添加容器组件的配置(添加几组默认的容器组件)
13. 生成的代码与脚手架进行耦合，依赖于脚手架
14. 提供系统默认的组件，默认组件需要自行引入对应的样式文件

## 功能设计
1. 进入页面如果没有提供模板id，则直接提示是否创建模板，若创建则，显示创建入口，否则显示非模板配置界面
2. 点击目录的删除按钮，后台即刻删除相关的配置项，点击新增和修改，则修改对应的模板信息，切换页面选项，则自动进行页面配置的保存，同时给出保存反馈，前提是有对页面进行修改的情况
3. 保存页面配置时，顺便保存目录结构，写入文件


## vuex对于object类型数据的处理

## 配置
```js
/**
 * 必要的属性及说明
 * 
 * 1. generate 代码生成配置，必填
 * 2. components 组件配置，必填
 */

const components = {
    components: [{
        name: '组件的key，对应的代码的名称，唯一标识，必填',
        title: '组件的中文描述名称，必填',
        showType: '组件的显示类型，用于配置界面shishi，必填',
        showOption: { // 显示配置，不同的showType对应的必填项如下所示，其他项为选填项目
            input: ['title', 'type', 'value'],
            datepicker: ['title', 'value'],
            switch: ['title', 'value'],
            select: ['title', 'selectArray', 'value'],
            checkbox: ['title', 'selectArray', 'value'],
            radio: ['title', 'selectArray', 'value'],
            slider: ['title', 'value'],
            upload: ['title'],
            table: ['title', 'columns'],
            // 以下为选填项
            xuantian: {
                input: {
                    multiple: '多文本输入',
                    text: '文本框前描述字段',
                    inputCount: '文本框个数',
                    joiner: "连接符",
                    rows: 'type为textarea时，显示的行数'
                },
                radio: {
                    isButton: '显示为按钮',

                },
                slider: {
                    showInput: '显示文本框'
                },
                upload: { 'showFileList': '显示文件列表', browseText: "浏览文件按钮文字描述", uploadText: '上传按钮文字描述' }
            }
        },
        isContainer: true,
        valueType: '', //默认值类型，对于有默认值的组件需要提供，可以为enum|number|function|string|bool|array|regexp|sync|object或者[1|attrKey]类型，attrKey为valueType是数组类型的属性名称
        attrs: {
            '属性名称': {
                title: 'type类型', // 必填
                valueType: 'enum', //enum|number|function|string|bool|array|regexp|sync|object 必填
                required: false, // 选填
                hidden: false, //选填
                defaultValue: 'text' // 必填，也可以是表达式-$[name]-获取对应的主属性的值
            }
        }
    }],
    // 组件的公共属性，选填
    commonAttrs: {}
}

// valueType对应的必填项
var t = {
    enum: ['selectArray'], //数组类型
    array: ['itemType'],
    sync: ['syncKey']
}
```