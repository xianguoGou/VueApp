<template>
<div class="border-top">
    <div class="bios-tabbar">
    <router-link
    class="bios-item"
    v-for="route in routes"
    :key="route.name"
    :to="route.path"
    tag="div"
    >
        <mt-badge 
        v-if="route.path==='/cart' && totalnum > 0" 
        class="cartNum" 
        type="primary"
        size="small">{{totalnum | maxCount}}</mt-badge>
        <i :class = "`icon iconfont icon-${route.name}-${isActive === route.name?'active':'normal'}`"></i>
        <div>{{route.text}}</div>
    </router-link>
    </div>
</div>
</template>

<script>
import {mapGetters,mapState} from 'vuex';
import routes from '@/router/router';
//引用vuex的全局数据方法

export default {
  name: 'tabbar',
  data() {
    return {
      routes: routes.filter(route => route.isTabbar === true),
    };
  },
  computed: {
    ...mapState(['isActive']),
    ...mapGetters(['totalnum']),
  },
  filters:{
    maxCount(n){
      return n>99 ? '99+':n;
    }
  }
};
</script>

<style lang = 'scss' scoped>
    @import './icon.scss';
    @import '../libs/sass/vars.scss';

    .border-top{
      border-top: 1px solid #ccc;
      height: 64px;
    }
    .bios-tabbar{
        height: 64px;
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        text-align: center;
        position: fixed;
        bottom: -1px;       
        background: #ffe;
        .bios-item{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color:#acacac;
            .icon{
            font-size: 30px;
            margin-bottom: 2px;
            }
        .cartNum{
          position:absolute;
          top: 0px;
          right: -12px;
          background: $theme-color;
        }
        }
    }
    .router-link-exact-active,
    .router-link-active{
        .icon{
            color: $theme-color;
        }
    }
</style>
