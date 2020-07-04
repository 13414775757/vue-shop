import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },  
  { path: '/home', component: () => import('../views/Home.vue') },  
  { path: '/login', component: () => import('../components/common/Login.vue') },  
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

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