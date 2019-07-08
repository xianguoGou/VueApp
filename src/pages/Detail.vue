<template>
        <div class="detailMain">
            <div class="detaiImg">
              <img :src=detailItem.img alt="">
            </div>
            <div class="datailIntr">
              <h1>{{detailItem.title}}</h1>
              <p>{{detailItem.description}}</p>
              <span>{{detailItem.introduction}}</span>
            </div>
            <div class="detailPrice">
              <p>￥</p><p>{{detailItem.price}}</p><p>.00</p>
            </div>
            
            <div class="detailButtons">
              <div 
              class="detailCart"
              @click="toCart"
              >
                <mt-badge 
                  class="detailCartNum" 
                  type="primary" 
                  size="small">{{totalnum | maxCount}}
                </mt-badge>
                购物车
              </div>
              <div 
              class="addDetailCart"
              @click="addToCart(detailItem)"
              >加入购物车</div>
            </div>  
        </div> 
</template>

<script>
import {mapGetters,mapMutations,mapState} from 'vuex';


export default {
  name: 'detail',
  data(){
    return{
    detailItem:{},
    }
  },
  mounted(){
        //console.log(this.$route.params.id);
        this.getDetail();
    },
  beforeRouteEnter(to, from , next){
    next(vm=>{
    vm.changeTabbar(false);
    vm.changeTitle('详情');
    })
  },
  beforeRouteLeave(to, from , next){
    this.changeTabbar(true);
    next();
  },
  
  computed:{
    ...mapGetters(['totalnum']),
    ...mapState(['handleTabbar']),
  },
  methods:{
    ...mapMutations(['changeTabbar','addToCart','changeTitle']),  
    getDetail(){
      this.$ajax.getDetail(this.$route.params.id)
                      .then((item)=>{
                        this.detailItem={...item,id:this.$route.params.id};
                        console.log(this.detailItem);
                      })
    },
    toCart(){
      this.$router.push('/cart');
    }
  },
  filters:{
    maxCount(n){
      return n>99 ? '99+':n;
    }
  },
};
</script>

<style lang = 'scss' scoped >
   .detailMain{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    .detaiImg{
    width: 100%;
    height: 52%;
    background: red;
    margin-bottom: 15px;
    img{
       width: 100%;
       height: 100%;
    }
  }
  .datailIntr{
      height:25%;
      padding-left: 15px;
      padding-bottom: 10px;
      border-bottom:2px solid #efefef;

      h1{
        line-height: 40px;
        height: 40px;
        font-size: 20px;
        padding-bottom: 20px;
      }
      p{
        font-size: 16px;
        height: 15px;
        line-height: 15px;
        color: #adadad;
        margin-bottom: 20px;
        color: #ff5511;
      }
      span{
        font-size: 13px;
        height: 15px;
        line-height: 22px;
        color: #adadad;
      }
    }
  .detailPrice{
     padding-left: 15px;
     height: 10%;
     line-height: 60px;
     border-bottom: 1px solid #c5c6c8;
     p{
       font-size: 16px;
       color: #a20b14;
       float: left;
     }
  }  
  .detailButtons{
    position: fixed;
    bottom: 0;
    padding-left: 15px;
    width: 100%;
     height: 50px;
     width: 100%;
     display: flex;
     background: #f4f8fb;
     justify-content: space-between;
     flex: 1;
     .detailCart{
       position: relative;
       width: 60px;
       font: 12px;
       color:#a9a9a9;
       height: 100%;
       text-align: end;
       line-height: 50px;
        .detailCartNum{
        position: absolute;
        right: -7px;
        top: 2px;
        background-color: #900;
        line-height: 14px;
        font-size: 14px;
        border-radius: 50%;
          }
     }
     .addDetailCart{
       width: 130px;
       text-align: center;
       height: 50px;
       line-height: 50px;
       background: #a5111f;
       color:#fffeff;
     }
  }
  }
</style>
