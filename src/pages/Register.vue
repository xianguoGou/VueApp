<template>
    <div>
        <div class="registerbody">
        <h2>用户注册</h2>
        <form class="registerform">
            <p><label for="#user">账号:</label><input ref="username" id="user" type="text" placeholder="请输入账号"></p>
            <p><label for="#pwd">密码:</label><input ref="password" id="pwd" type="password" placeholder="请输入账号"></p>
            <p><label for="#pwd">再次密码:</label><input ref="repassword" id="pwdtwo" type="password" placeholder="请输入账号"></p>
            <div class="registerbuttons">
              <button 
              class="buttonresgiter"
               type="button"
               @click="toRegister"
               >确认注册</button>
              <button class="buttonreset" type="reset">重置</button>
            </div>
        </form>
        
    </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: 'register',
  beforeRouteEnter(to, from , next){
    next(vm=>{
    vm.changeTabbar(false);
    })
  },
  beforeRouteLeave(to, from , next){
    this.changeTabbar(true);
    next();
  },

  methods:{
    ...mapActions(['login']),
    ...mapMutations(['changeTabbar']),
    toRegister(){
      //console.log(this.$refs.username.value)
       if(this.$refs.username.value === ""|| this.$refs.password.value ===""){
         this.$toast('注册信息不能为空'); 
        return false;
      }
      else{
        if(this.$refs.password.value !== this.$refs.repassword.value){
          this.$toast('两次密码不一致'); 
        }else{
          this.login();
        }
      }
    },
  },
   computed:{
      ...mapState(['islogin']),
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

<style lang="scss" scoped>
 @import '../components/icon2.scss';
  .registerbody{
    width: 100%;
    height: 300px;
    background: #7385a9;
    text-align: center;
    padding-top: 40px;
    
    h2{
      margin-bottom: 40px;
      font-size: 20px;
      color: white;
    }
    p{
      padding-right: 40px;
      display: inline-block;
      margin-bottom: 15px;
      label{
        color: white;
        font-size: 20px;
        margin-right: 15px;
        height: 30px;
        line-height: 30px;
        width: 100px;
        display: block;
        float: left;
        text-align: end;
      }
      input{
        height: 25px;
        border: none;
        padding-left: 5px;
      }
    }
    .registerbuttons{
      height: 35px;
      text-align: center;
      margin-top: 10px;
      margin-left: 105px;
      .buttonresgiter{
        margin-right:10px;
        border: none;
        height: 35px;
        width: 80px;
        float: left;
        text-align: center;
        background: #dd4646;
        color: wheat;
      }
      .buttonreset{
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
