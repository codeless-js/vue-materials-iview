import { asyncRoutes, constantRoutes } from '@/router/index';

/**
 * 通过角色判断某个路由是否有权限
 * @param {string} role
 * @param {object} route
 */
function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role);
  }
  return true;
}

/**
 * 通过角色递归过滤路由
 * @param {array} routes 被过滤的路由
 * @param {string} role
 */
export function filterAsyncRoutes(routes, role) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role);
      }
      res.push(tmp);
    }
  });

  return res;
}

const states = {
  routes: [],
  accessedRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.accessedRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions = {
  /**
   * 根据用户角色生成可访问的路由
   * @param {object} param0
   * @param {string} role 用户角色
   */
  generateRoutes({ commit }, role) {
    return new Promise((resolve) => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, role);

      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true,
  state: states,
  mutations,
  actions,
};
