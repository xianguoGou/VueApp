<template>
    <div class="bios-listMain">
        <ul class="bios-typenav">
        <router-link
        v-for="page in typeList"
        :key="page.id"
        :to = "`/type/${page.id}`"
        tag="li"
        >{{page.title}}</router-link>
        </ul>
        <router-view v-if="typeList.length !== 0"></router-view>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';

export default {
  name: 'type',
  data(){
      return {
          typeList:[],
      }
  },
  beforeRouteEnter(to , from , next){
      next(vm=>{
          vm.changeTitle('分类')
        }
      )
  },
  mounted(){
      this.getTypes();
  },
  computed:{
      ...mapState(['isActive']),
  },
  methods:{
      ...mapMutations(['changeActive','changeTitle']),
      getTypes(){
          this.$ajax.getTypes()
          .then((resp) => {
              this.typeList = resp;
              this.$router.push(`/type/${resp[0].id}`);
          })
      },
  },

};
</script>

<style scoped lang = 'scss'>
@import '../libs/sass/vars.scss';

.bios-listMain{
    position: relative;
    height: 100%;
    box-sizing: border-box;
    .bios-typenav{
        height: 83%;
        position: fixed;
        flex-direction: column;
        justify-content: space-around;
        left: 0;
        display: flex;
        width: 100px;
        li{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #acacaa;    
        }
        .router-link-exact-active,
        .router-link-active{
            color:$theme-color;
            border-bottom: 3px solid $theme-color;
        }   
    }
}

</style>
