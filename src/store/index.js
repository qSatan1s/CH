import Vue from "vue";
import Vuex from "vuex";

import calculator from "./modules/calculator.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    calculator,
  },
});

export default store;
