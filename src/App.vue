<template>
  <div class = 'allWrap'>
    <Headload></Headload>
    <div class="main">
    <transition>
    <router-view></router-view>
    </transition>
    </div>
    <tabbar v-if='handleTabbar'></tabbar>
  </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex';
import Tabbar from '@/components/Tabbar';
import Headload from '@/components/Headload';

export default {
  name: 'App',
  components: {
    Tabbar,
    Headload,
  },
  computed:{
    ...mapState(['handleTabbar']),
  },
};
</script>

<style lang = 'scss'>
@import './libs/sass/reset.scss';

  html,
  body,
  .allWrap{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .main{
        flex: 1;
        overflow-x: hidden;
        background: #fbfbfb;
    }
  }
  .v-enter-active{
    transition: all 0.5s ease;
  }     
  .v-enter, .v-leave-active{
    opacity: 0 ;
  }
</style>
