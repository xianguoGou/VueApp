import { postLogin } from '@/services';
import types from '../state/types';

export default {
  addAsync(store, id) {
    setTimeout(() => {
      // 调用store中的定义的方法；
      store.commit(types.ADD, id);
    }, 2000);
  },
  login(store) {
    console.log(1);
    postLogin()
      .then((item) => {
        window.localStorage.setItem('username', item.user);  
        store.commit(types.CHANGELOGIN, true);
      });
  },
}