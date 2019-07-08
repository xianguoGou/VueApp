export default {
  total(state) {
    return state.count.reduce((result, item) => {
      const newresult = result + (item.num * item.price);
      return newresult;
    }, 0);
  },
  totalnum(state) {
    return state.count.reduce((result, item) => {
      const newtotalnum = result + item.num;
      return newtotalnum;
    }, 0);
  },
  totalFiler(state) {
    return state.count.filter(item => item.isChecked === true).reduce((result, item) => {
      const newresult = result + (item.num * item.price);
      return newresult;
    }, 0);
  },
  totalnumFiler(state) {
    return state.count.filter(item => item.isChecked === true).reduce((result, item) => {
      const newtotalnum = result + item.num;
      return newtotalnum;
    }, 0);
  },
  isAllchecked(state) {
    return state.count.every(item => item.isChecked === true);
  },
};
