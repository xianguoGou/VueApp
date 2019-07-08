// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import MintUI from 'mint-ui';
import Vue from 'vue';
import 'mint-ui/lib/style.css';
import App from './App';
import router from './router';
import store from './store';
import * as ajax from './services';

Vue.prototype.$ajax = ajax;

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    if (!store.state.islogin) {
      next({
        name: 'login',
        params: { to },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

Vue.config.productionTip = false;
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
