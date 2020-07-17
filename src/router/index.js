import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../components/content/Main.vue';
import Users from '../components/content/user/Users.vue';
import GoodsClass from '../components/content/goods/GoodsClass.vue';
import GoodsList from '../components/content/goods/GoodsList.vue';
import OrderList from '../components/content/order/OrderList.vue';
import Finished from '../components/content/order/orderStatus/Finished.vue';
import OrderDelivery from '../components/content/order/orderStatus/OrderDelivery.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },  
  { 
    path: '/home', 
    component: () => import('../views/Home.vue'),
    redirect: '/main',   // 默认访问是 main 
    children: [      // 嵌套子路由
      { path: '/main', component: Main},   
      // 点击用户列表时展示该子路由
      { path: '/users', component: Users},   
      { path: '/goodsList', component: GoodsList},   
      { path: '/goodsClass', component: GoodsClass},   
      { path: '/orderList', component: OrderList},   
      { path: '/finished', component: Finished },
      { path: '/orderDelivery', component: OrderDelivery },
      { path: '/closed', component: () => import('../components/content/order/orderStatus/Closed.vue') },
      { path: '/waitDelivery', component: () => import('../components/content/order/orderStatus/WaitDelivery.vue') },
    ]
  },  
  { path: '/login', component: () => import('../components/common/Login.vue') },  
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 表示要访问的路径
  // from 表示从哪个路径而来
  // next 为函数，表示放行；next() 放行； next('/login') 强制跳转
  if (to.path === '/login') return next();
  // 获取 token
  const token = window.sessionStorage.getItem('token');
  // 不存在 token 跳转
  if (!token) {
    return next('/login');
  }
  // 存在token 放行
  next();
}); 

export default router;