import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      username: "未登录",
      role: "notLogin",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      //todo改为从远程请求获职登录信扇
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
