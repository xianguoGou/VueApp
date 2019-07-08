import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const isDev = process.env.NODE_ENV === 'development';

export default new Vuex.Store(
  {
    strict: isDev,
    state,
    mutations,
    getters,
    actions,
  },
);
