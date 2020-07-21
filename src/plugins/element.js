import Vue from 'vue';
import {Button, Form, FormItem, Input, Message, Container, Header, Main, Aside, Dropdown, DropdownMenu, DropdownItem, Menu, MenuItem, Submenu, MenuItemGroup, MessageBox, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Pagination, Dialog, Select, Option, Tabs, TabPane, InfiniteScroll, Switch, Radio, RadioGroup, DatePicker, Step, Steps, Divider, Alert, Image, Tooltip, Loading, Timeline, TimelineItem, Popover} from 'element-ui';


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
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Switch);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(DatePicker);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Divider);
Vue.use(Alert);
Vue.use(Image);
Vue.use(Tooltip);
Vue.use(Loading.directive);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Popover);
// 对于 js 中使用的组件需要全局挂载.
Vue.prototype.$message = Message;
Vue.prototype.$messageBox = MessageBox;
Vue.prototype.$InfiniteScroll = InfiniteScroll;
Vue.prototype.$loading = Loading.service;