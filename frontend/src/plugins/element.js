import Vue from 'vue'
import {
    Row,
    Col,
    Input,
    Container,
    Button,
    Header,
    Aside,
    Main,
    Footer,
    Menu,
    Message,
    Table,
    TableColumn,
    Dropdown,
    // DropdownItem,
    // DropdownMenu,
    Select,
    Option,
    MenuItem,
    Collapse,
    CollapseItem,
    Form,
    FormItem,
    Dialog,
    Upload,
    Tag,
    Loading,
    MessageBox,
    DatePicker,
    Checkbox,
    CheckboxGroup,
    Switch,
    Slider,
    Radio,
    RadioButton,
    RadioGroup,
    Tabs,
    TabPane,
    InputNumber,
    Tree
} from 'element-ui'

Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Container)
Vue.use(Button)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dropdown)
// Vue.use(DropdownItem)
// Vue.use(DropdownMenu)
Vue.use(Select)
Vue.use(Option)
Vue.use(MenuItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Tag)
Vue.use(DatePicker)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Slider)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(InputNumber)
Vue.use(Tree)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.myMess = Message;
Vue.prototype.$loading = Loading.service;