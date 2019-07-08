<template>
    <div>
    <div class="loginbody">
        <h2>用户登录</h2>
        <p><label for="#user">账号:</label><input ref="username" id="user" type="text" placeholder="请输入账号"></p>
        <p><label for="#pwd">密码:</label><input ref="password" id="pwd" type="text" placeholder="请输入账号"></p>
        <div class="logobuttons">
          <button 
          class="buttonlogin"
          @click="tologin"
          >登录</button>
          <button 
          class="buttonresgiter"
          @click="toRegister"
          >注册</button>
        </div>
    </div>
    </div>
</template>

<script>
import {mapActions , mapState, mapMutations} from 'vuex';

export default {
  name: 'login',
  beforeRouteEnter(to, from , next){
    next(vm=>{
    vm.changeTabbar(false);
    })
  },
  beforeRouteLeave(to, from , next){
    this.changeTabbar(true);
    next();
  },
  computed:{
      ...mapState(['islogin']),
  },
  methods:{
      ...mapActions(['login']),
      ...mapMutations(['changeTabbar']),
      toRegister:function(){
        this.$router.push(`/register`);
      },
      tologin(){
        if(this.$refs.username.value === "" || this.$refs.password.value === ""){
          this.$toast('登录信息不能为空'); 
          return false;
        }
        else{
          // 去login
          this.login();
        }
      }
  },
  watch: {
    islogin(n) { 
         console.log(this.$route);
      if (n === true) {
        const path = this.$route.params.to ? this.$route.params.to.path : '/';
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped lang="scss">
 @import '../components/icon2.scss';
  .loginbody{
    width: 100%;
    height: 260px;
    background: #7385a9;
    text-align: center;
    padding-top: 40px;
    h2{
      margin-bottom: 40px;
      font-size: 20px;
      color: white;
    }
    p{
      margin-bottom: 15px;
      label{
        margin-top: 5px;
        color: white;
        font-size: 20px;
        margin-right: 15px;
        height: 30px;
        line-height: 30px;
      }
      input{
        height: 25px;
        border: none;
        padding-left: 5px;
      }
    }
    .logobuttons{
      height: 35px;
      text-align: center;
      margin-top: 30px;
      margin-left: 105px;
      .buttonlogin{
        border: none;
        height: 35px;
        width: 80px;
        float: left;
        text-align: center;
        background: #dd4646;
        color: wheat;
        margin-right: 10px;
      }
      .buttonresgiter{
        border: none;
        height: 35px;
        width: 80px;
        float: left;
        text-align: center;
        background: #dd4646;
        color: wheat;
      }
    }

  }
</style>
