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
1. 读取配置
2. 

## 数据表

### 组件库表 Groups 用于储存现有的组建相关信息
ID int not-null pk auto-increment  唯一标示
DependenceID int not-null fk  依赖的框架
Name string  组建库名称
Description string 描述信息
Url string not-null 当前组建的配置文件地址 

### 依赖表 Dependence (可选值：Vue，Jquery, React)
ID int not-null pk auto-increment  唯一标识
Name string not-null 框架名称
Version string 版本
Url string 地址，可删除该字段

### 数据校验表 Validate  
ID int not-null pk auto-increment  
Name string not-null

### 参数表 Parameter  
ID int not-null pk auto-increment  
Name string not-null
Description string 
ValueType string (Number, String, Boolean, Array, Object) 用于最后生成的代码传入的值区分

### ParameterToValidate 
ID int not-null pk auto-increment  
ValidateID int not-null fk
ParameterID int not-null fk

### 模版表 Module
ID int not-null pk auto-increment
Name string  
Url string
