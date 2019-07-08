<template>
    <div class="search-wrap">
        <div class="bios-search-nav" v-if="!hasResulet">
          <div class="history" v-if="hasHistory">
            <h1>历史搜索</h1>
            <ul class="search-list">
              <li 
              v-for="(item,index) in searchHistory" 
              :key="index"
              @click="getSearchList(item.title)"              
              >{{item.title}}</li>
            </ul>
          </div>
          <div class="hot">
            <h1>热门搜索</h1>
            <ul class="search-list">
              <li 
              v-for="item in hotSearch" 
              :key="item.id"
              @click="getSearchList(item.title)"
              >{{item.title}}</li>
            </ul>
          </div>
          <div class="recommendations">
            <h1>相关推荐</h1>
            <ul class="search-list">
              <li 
              v-for="item in recommendations" 
              :key="item.id"
              @click="getSearchList(item.title)"
              >{{item.title}}</li>
            </ul>
          </div>
        </div>
        <div v-else>
          <div class="bios-main">
            <router-link 
                    v-for="item in searchResult"
                    :key="item.id"
                    :to = "{name:'detail',params:{id:item.id}}"
                    tag="div">
            <div class="bios-item">
                <div class="bios-title">{{item.title}}</div>
                <div class="bios-introduce">{{item.description}}</div>
                <div class="item-img"><img :src="item.img" :alt="item.title"></div>
            </div>
            </router-link>
        </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapMutations,mapState} from 'vuex';

export default {
  name: 'search',
  data(){
    return {
      searchHistory:JSON.parse(window.localStorage.getItem('searchHistory')) || [],
      hotSearch:[],
      recommendations:[],
      keyWords:'',
    }
  },
  beforeRouteEnter(to, from , next){
    next(vm=>{
    vm.changeTitle('搜索');
    vm.changeTabbar(false);
    })
  },
  beforeRouteLeave(to, from , next){
    this.changeTabbar(true);
    next();
  },
  computed:{
    ...mapGetters(['totalnum']),
    ...mapState(['handleTabbar','searchResult']),
    hasResulet(){
      return this.searchResult.length !== 0;
    },
    hasHistory(){
      return this.searchHistory.length !== 0;
    },
  },
  mounted(){
    this.getHot();
    this.getRecommendations();
  },
  methods:{
    ...mapMutations(['changeTabbar','changeTitle','changeSearch']),
    getHot(){
      this.$ajax.getSearch()
      .then((resp)=>{
        this.hotSearch = resp;       
      })
    },
    getRecommendations(){
      this.$ajax.getSearch()
      .then((resp)=>{
        this.recommendations = resp;       
      })
    },
    getSearchList(keys){
      this.$ajax.getDetailList(keys)
          .then((resp)=> {
            this.changeSearch(resp)              
      });
    },
  },
}
</script>

<style scoped lang = 'scss'>
.search-wrap{
  height: 100%;
  .bios-search-nav{
    padding: 20px 20px;
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    h1{
        font-size: 16px;
        font-weight: bold;
      }
    .search-list{
      display: flex;
      justify-content: safe;
      flex-wrap: wrap;
      li{
        padding: 5px 15px;
        margin: 10px 12px;
        background: #ececec;
      }
    }
  }
}
.bios-item{
    margin-top: 20px;
    background: #fff;
    position: relative;
    height: 120px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 10px 10px 120px;
    .item-img{
        position: absolute;
        width: 100px;
        height: 100px;
        background: #acacac;
        top:10px;
        left:10px;
    }
    .bios-title{
        font-size: 18px;
        font-weight: bold;
        color: black;
    }
    .bios-introduce{
        color: #a0a0a0;
        font-size: 15px;
        margin-top: 12px;
        line-height: 24px;
        padding: 18px 0;
        padding-right: 15px;
    }
}
</style>
