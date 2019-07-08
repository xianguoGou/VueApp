<template>
    <div class="header">
        <mt-header :title="title">
            <mt-button icon="back" 
                        slot="left" 
                        v-if="!handleTabbar"
                        @click.native="goBack()"
                        >返回</mt-button>
        </mt-header>
          <input
          v-model="keyWords"
          @focus="jumpTosearch()" 
          class="bios-search" 
          >
          <div 
          class="search-icon"
          @click="searchItem"
          ><img src="../assets/img/search.jpg" alt="搜索"></div>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';

export default {
  name: 'headload',
  data(){
      return {
          keyWords:'',
          searchHistory: JSON.parse(window.localStorage.getItem('searchHistory')) || [],
      }
  },
  computed:{
      ...mapState(['title','handleTabbar','searchResult']),
  },
  methods:{
      ...mapMutations(['changeSearch','changeSearch']),
      jumpTosearch(){
          this.changeSearch();
          this.$router.push('/search');
      },
      goBack(){
          this.$router.back();
      },
      searchItem(){
          this.searchHistory.unshift({
              'title':this.keyWords
          });
          window.localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory));
          this.$ajax.getDetailList(this.keyWords)
          .then((resp)=> {
            this.changeSearch(resp)              
          });
          this.keyWords = '';
      },
  },
};
</script>

<style lang = 'scss' scoped>
@import '../libs/sass/vars.scss';

.header{
    position: relative;
    .bios-search{
        position: absolute;
        top: 14px;
        right: 10px;
        width: 80px;
        height: 20px;
        border: none;
        outline: none;
        border-radius: 12px;
        padding: 0 10px;
    }
    .search-icon{
        width: 18px;
        height: 18px;
        background: #acacac;
        position: absolute;
        top: 15px;
        right: 18px;
        border-radius: 50%;
        img{
            width: 100%;
        }
    }
}
.mint-header{
    height: 50px;
    font-size: 16px;
    background: $theme-color;
}
</style>
