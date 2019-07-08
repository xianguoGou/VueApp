const Home = () => import('@/pages/Home');
const Cart = () => import('@/pages/Cart');
const Detail = () => import('@/pages/Detail');
const Login = () => import('@/pages/Login');
const Mine = () => import('@/pages/Mine');
const Type = () => import('@/pages/Type');
const Register = () => import('@/pages/Register');
const Homeone = () => import('@/pages/Homeone');
const Hometwo = () => import('@/pages/Hometwo');
const Homethree = () => import('@/pages/Homethree');
const Homefour = () => import('@/pages/Homefour');
const detailList = () => import('@/pages/detailList');
const Search = () => import('@/pages/Search');


export default [{
  path: '/',
  redirect: '/home',
}, {
  path: '/home',
  name: 'home',
  component: Home,
  text: '首页',
  isTabbar: true,
  redirect: '/home/one',
  children: [{
    path: 'one',
    name: 'one',
    text: '拉萨净土',
    component: Homeone,
  }, {
    path: 'two',
    name: 'two',
    text: '风土人情',
    component: Hometwo,
  }, {
    path: 'three',
    name: 'three',
    text: '自然风光',
    component: Homethree,
  }, {
    path: 'four',
    name: 'four',
    text: '特色产品',
    component: Homefour,
  },
  ],
}, {
  path: '/type',
  name: 'type',
  component: Type,
  text: '分类',
  isTabbar: true,
  redirect: '/type/1001',
  children: [
    {
      path: ':id',
      component: detailList,
    },
  ],
}, {
  path: '/cart',
  name: 'cart',
  component: Cart,
  text: '购物车',
  isTabbar: true,
  meta: {
    authRequired: false,
  },
}, {
  path: '/mine',
  name: 'my',
  component: Mine,
  text: '我的',
  isTabbar: true,
}, {
  path: '/login',
  name: 'login',
  component: Login,
  text: '登录',
}, {
  path: '/register',
  name: 'register',
  component: Register,
  text: '注册',
}, {
  path: '/detail/:id',
  name: 'detail',
  component: Detail,
  text: '商品详情',
}, {
  path: '/search',
  name: 'search',
  component: Search,
  text: '搜索',
},
];
