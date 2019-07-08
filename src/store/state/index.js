export default {
  count: JSON.parse(window.localStorage.getItem('myCart')) || [],
  islogin: Boolean(window.localStorage.getItem('username')),
  isActive: 'home',
  title: '首页',
  handleTabbar: true,
  searchResult: [],
};
