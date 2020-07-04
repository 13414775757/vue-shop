import Vue from 'vue';
import {Button, Form, FormItem, Input, Message} from 'element-ui';


Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
// 对于 js 中使用的组件需要全局挂载.
Vue.prototype.$message = Message;