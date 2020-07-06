import Vue from 'vue';
import {Button, Form, FormItem, Input, Message, Container, Header, Main, Aside, Dropdown, DropdownMenu, DropdownItem, Menu, MenuItem, Submenu, MenuItemGroup, MessageBox, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Pagination, Dialog, Select, Option} from 'element-ui';


Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
// 对于 js 中使用的组件需要全局挂载.
Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;