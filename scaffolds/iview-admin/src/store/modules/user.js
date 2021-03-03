import { login, logout, getInfo } from '@/api/user';
import { resetRouter } from '@/router/index';

const states = {
  token: '',
  name: '',
  avatar: '',
  phone: '',
  role: '',
  email: '',
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password })
        .then((response) => {
          const { data } = response;
          commit('SET_TOKEN', data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit }) {
    return getInfo()
      .then((response) => {
        const { data } = response;

        if (!data) {
          return Promise.reject(new Error('验证失败，请重新登录'));
        }

        const {
          role, name, avatar, phone, email,
        } = data;

        // role must be a non-empty string
        if (!role) {
          return Promise.reject(new Error('获取用户信息：用户必须分配角色'));
        }

        commit('SET_ROLE', role);
        commit('SET_NAME', name);
        commit('SET_AVATAR', avatar);
        commit('SET_PHONE', phone);
        commit('SET_EMAIL', email);
        return data;
      })
      .catch(error => Promise.reject(error));
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLE', '');
          resetRouter();
          resolve();
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  },

};

export default {
  namespaced: true,
  state: states,
  mutations,
  actions,
};
