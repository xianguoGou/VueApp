<template>
  <div>
  <ul class="nav">
  <router-link 
  class="Bios-list"
  v-for="route in routes"
  :to = "{name:route.name}"
  :key="route.name"
  tag="li"
  >{{route.text}}</router-link>
  </ul>
  <transition>
  <router-view></router-view>
  </transition>
  </div>
</template>

<script>
import routes from '@/router/router';
import {mapState,mapMutations} from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      active: 'tab-container1',
      routes: routes.filter(route => route.path === '/home')[0].children,
    };
  },
  computed:{
      ...mapState(['isActive'])
  },
};
</script>

<style scoped lang = 'scss'>
@import '../libs/sass/vars.scss';

.v-enter-active{
  width: 100%;
  transition: all 0.8s ease;
}     
.v-enter, .v-leave-active{
  opacity: 0 ;
  width: 200%;
}
.nav{
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    .router-link-exact-active,
    .router-link-active{
        border-bottom: 3px solid $theme-color;
        color:$theme-color;
    }
    .Bios-list{
        padding: 0 12px;
    }
}
</style>
