<template>
    <div>
       <div class="me">
        <div class="me-img">
            <img src="../assets/img/bgc4-1.jpg" alt="">
        </div>
        <div class="me-indr">
            <h3>{{username}}</h3>
            <p>vip1</p>
        </div>
       </div>
       <div class="memenu">
           <div class="memenu-item"><i class="icon iconfont icon-daifukuan-normal"></i><p>待付款</p></div>
           <div class="memenu-item"><i class="icon iconfont icon-daifahuo-normal"></i><p>待发货</p></div>
           <div class="memenu-item"><i class="icon iconfont icon-daishouhuo-normal"></i><p>待收货</p></div>
           <div class="memenu-item"><i class="icon iconfont icon-yiwancheng-normal"></i><p>已完成</p></div>
       </div>
       <div class="exitbutton"
        @click="webutton"
       >{{tishi}}</div>
    </div>
</template>

<script>
import {mapState,mapMutations, mapActions} from 'vuex';
console.log(window.localStorage)
export default {
  data(){
      return{
           username:window.localStorage.username ? window.localStorage.username : '未登录' ,
           tishi:window.localStorage.username ? '点击退出' : '点击登陆'
      }
     
      //username:window.localStorage;
  },
  name: 'my',
  beforeRouteEnter(to , from , next){
      next(vm=>{
          vm.changeActive(vm.$route.name)
          vm.changeTitle('我的') 
        }
      )
  },
  computed:{
      ...mapState(['isActive','islogin'])
  },
  methods:{
      ...mapActions(['logout',]),
      ...mapMutations(['changeActive','changeTitle','changelogin']),
      webutton(){
          if(window.localStorage.username){
             window.localStorage.removeItem('username');
             //回到以前的权限
            this.changelogin(false)
             this.$router.push('/home');
          }
          else{
              this.$router.push('/login');
          }
          
      }
  },
};
</script>

<style lang="scss" scoped>

    @import '../components/icon2.scss';

    .me{
        height: 180px;
        width: 100%;
        background:#7385a9;
        overflow: hidden;
        &-img{
            width: 65px;
            height: 65px;
            margin: 60px 0 0 15px;
            float: left;
            border-radius: 50%;
            overflow: hidden;
        }
        &-indr{
            height: 65px;
            width: 200px;
            margin: 50px 0 0 100px;
            padding-top: 20px;
            h3{
                font-size: 20px;
                margin-bottom: 5px;
            }
        }
    }
    .memenu{
        height: 60px;
        align-items: center;
        display: flex;
        justify-content: space-around;
        &-item{
            text-align: center;
            p{
                margin-top: 10px;
            }
        }
    }
    .exitbutton{
        width: 100%;
        height: 50px;
        color: azure;
        background: #dd4646;
        text-align: center;
        line-height: 50px;
    }

</style>
