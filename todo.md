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
10. 确定代码的生成算法


## 数据表

### 组件库表 Groups
ID int not-null pk auto-increment  
DependenceID int not-null fk
Name string 
Description string 

### 依赖表 Dependence (可选值：Vue，Jquery, React)
ID int not-null pk auto-increment  
Name string not-null 
Version string 
Url string

### 组件表 Components
ID int not-null pk auto-increment  
GroupID int not-null fk
Name string not-null

### 属性表 Attributes
ID int not-null pk auto-increment  
Name string not-null
Description string 
Value string
ValueType string (Number, String, Boolean, Array, Object)

### 组件属性关系表
ID int not-null pk auto-increment  
ComponentID int not-null fk
AttributeID int not-null fk
Value 任意类型
DefaultValue string

### 数据校验表
ID int not-null pk auto-increment 
Name string not-null

```js
V-input组件
属性{
    title: '标题', 
    defaultValue: 'Hello World', 
    dataValueType: 'String', 
    changeCallBack: function(){}, 
    Validate:[{
        type: 'byteLen',
        args: [1, 63]
    }], 
    selectArray: [{
            tt: _('Host Name')
        },
        {
            2: _('MAC Address')
        }
    ],
    columns: [{
        field: 'authUserID',
        width: '18%',
        title: _('User Name')
    },
    {
        field: 'authUserOn',
        width: '11%',
        title: _('Client Status'),
        format: (data) => `<span class="${data ? 'active-text' : ''}">${data ? _('Online') : _('Offline')}</span>`,
        rendered: function() {
            xxxx
        }
    }]
}
```