import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store'
import './plugins/element.js';
// 树形表格第三方插件
import TreeTable from '../node_modules/vue-table-with-tree-grid';
//导入全局样式表
import './assets/css/global.css';
//导入 axios 库
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8090/api';
//将 axios 添加到原型链上
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
// 定义价格过滤器
Vue.filter('priceFormat', function(price) {
  return '￥' + price;
});
Vue.component('tree-table', TreeTable);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

