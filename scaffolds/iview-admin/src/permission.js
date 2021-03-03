import { LoadingBar } from 'view-design';
import router from '@/router/index';
import store from '@/store/index';

// main.js
const WHITE_LIST = ['/login'];
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  if (WHITE_LIST.indexOf(to.path) !== -1) {
    // 白名单页面不需要登录
    next();
  } else if (!store.getters.role) {
    // 无用户信息
    store.dispatch('user/getInfo').then(async (data) => { // 获取用户信息
      const { role } = data;
      // 生成可访问的路由表
      const accessRoutes = await store.dispatch('permission/generateRoutes', role);
      // 动态添加可访问路由表
      router.addRoutes(accessRoutes);
      next({ ...to, replace: true });
    }).catch(() => {
      next('/login');
      LoadingBar.finish();
    });
  } else {
    // 当已经登录过，说明已经通过角色生成了可访问的路由表，若无权限会跳转到404页面
    next();
  }
});
router.afterEach(() => {
  LoadingBar.finish();
});
