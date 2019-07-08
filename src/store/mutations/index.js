import types from '../state/types';

export default {
  [types.ADD](state, id) {
    state.count.map((item) => {
      const newitem = item;
      if (item.id === id) {
        newitem.num += 1;
      }
      return newitem;
    });
    window.localStorage.setItem('myCart', JSON.stringify(state.count));
  },
  [types.REDUCE](state, id) {
    state.count.map((item) => {
      const newitem = item;
      if (item.id === id) {
        if (item.num > 1) {
          newitem.num -= 1;
        }
      }
      return newitem;
    });
    window.localStorage.setItem('myCart', JSON.stringify(state.count));
  },
  [types.CHANGESEARCH](state, seaResult) {
    state.searchResult = seaResult || [];
  },
  [types.ADDTOCART](state, keyItem) {
    event.stopPropagation();
    const count = state.count.some ( item => item.id === keyItem.id);
    if (!count) {
      state.count.push({
        ...keyItem,
        num: 1,
        isChecked: true,
      });
    }
    else {
      state.count.map((item) => {
        const Newitem = item;
        if (item.id === keyItem.id) {
          Newitem.num += 1;
        }
        return Newitem;
      });
    }
    window.localStorage.setItem('myCart', JSON.stringify(state.count));
  },
  [types.SELECTALL](state) {
    state.count = state.count.map((item) => {
      const newItem = item;
      // 将其他的的box的选择模式和全选一样
      newItem.isChecked = event.target.checked;
      return newItem;
    });
  },
  // 改变checkbox的状态
  [types.CHANGECHECKED](state, itemId) {
    state.count = state.count.map((item) =>{
      const newItem = item;
      if (newItem.id === itemId) {
        newItem.isChecked = !newItem.isChecked;
      }
      return newItem;
    });
  },
  [types.CHANGEACTIVE](state, name) {
    state.isActive = name;
  },
  [types.CHANGETITLE](state, title) {
    state.title = title;
  },
  [types.CHANGELOGIN](state, type) {
    state.islogin = type;
  },
  [types.CHANGETABBAR](state, flag) {
    state.handleTabbar = flag;
  },
  [types.DELETEITEM](state, id) {
    state.count = state.count.filter(item => item.id !== id);
    window.localStorage.setItem('myCart', JSON.stringify(state.count));
  },
};
