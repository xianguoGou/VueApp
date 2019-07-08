<template>
  <div>
      <div 
      v-if="count == false"
      class="noCart">
        <h1>购物车空空如也，快去添加喜欢的商品吧</h1>
      </div>

      <div 
      v-if="count"
      class="cart">
      <div class="itembody">
        <div 
          v-for="item of count" 
          class="part"
          :key="item.id"
          @touchstart="deletestartsync(item.id)"
          @touchend="deleteendsync"
          >
          <input type="checkbox" :checked ="item.isChecked" @change="changeChecked(item.id)">
          <div class="part-img"><img :src="item.img" :alt="item.title"></div>
          <div class="part-indr">
            <h3> {{item.title}}</h3>
            <p>{{item.description}}</p>
            <span>￥{{item.price}}</span>
          </div>

          <div class="part-changenum">
            <div class="changenum">
               <button @click="reduce(item.id)">-</button>
               <span>{{item.num}}</span>
               <button @click="add(item.id)">+</button>  
            </div>
            <div 
            @click="deleteitem(item.id)"
            class="part-deleteButton">删除
           </div>
          </div>
          
        </div>
     </div>

     <div class="footer">
        <div class="footer-indr">
            <label class="bios-isAllChecked"><input type="checkbox" @change="selectAll()" :checked="isAllchecked">全选</label>
            <div>共<span>{{totalnumFiler}}</span>件商品  </div>
            <div>合计: ￥<span>{{totalFiler}}</span>元</div>
        </div>

        <div class="footer-buttons">
          <button 
          class="footer-buttons-gocart"
          @click="goList"
          >继续购物</button>
          <button 
          class="footer-buttons-gopay"
          @click="toPay"
          >点击支付</button>
        </div>

    </div>

  </div>
  </div>
  
</template>

<script>

import { mapState, mapMutations, mapGetters,mapActions } from 'vuex';

export default {
  name: 'cart',
  computed: {
    ...mapState(['count','isActive','islogin']),
    ...mapGetters(['total', 'totalnum','isAllchecked','totalFiler','totalnumFiler']),
  },
  methods: {
    ...mapMutations(['add', 'reduce','changeActive','changeTitle','deleteitem','selectAll','changeChecked']),
    ...mapActions(['addAsync','login']),
    deletestartsync:function(id){this.timer=setTimeout(()=>{
        //用了mint-ui 所有的方法都可在原型上建立
        this.$messagebox({
          title: '是否删除',
          message: `确定要删除物品${id}吗?`,
          showCancelButton: true,
        }).then((item)=>{if(item==='confirm'){
          //调用删除函数
          this.deleteitem(id);
          this.$toast('删除成功')
        }})
    },1000)},
    deleteendsync:function(){
      clearInterval(this.timer)
    },
    goList(){
      
      this.$router.push(`/type`);
    },
    toPay(){
      //console.log(Boolean(window.localStorage.username))
      if(Boolean(window.localStorage.username)){
        this.$toast('支付成功');
      }else{
        this.$toast('还没登录，请先登录');
        setTimeout(()=>{
           this.$router.push('/login')
        },3000)
      }
    }
  },
  beforeRouteEnter(to , from , next){
      next(vm=>{
          vm.changeActive(vm.$route.name) 
          vm.changeTitle('购物车')
        }
      )
  },
};
</script>

<style lang="scss" scoped>
  .noCart{
    h1{
      font-size: 20px;
      color:#dd4646;
      font-weight: normal;
      height: 30px;
      line-height: 30px;
      margin-top:150px;
    }
  }
  .itembody{
    display: flex;
    flex-direction: column;
    flex:1;
    padding-bottom: 80px;
  }
  .part{
    display: flex;
    border-bottom: 1px solid #efefef;
    height: 80px;
    padding-left: 30px;
    align-items: center;
    position: relative;
    input{
    position: absolute;
    left: 5px;
    }
    &-img{
      width: 20%;
      height: 70px;
      background: #acacac;
      margin-right: 5px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    &-indr{
      width: 55%;
      height: 60px;
      h3{
        font-size: 12px;
        line-height: 15px;
        margin-bottom: 3px;
      }
      p{
        word-break:break-word;
        color: #686c6e;
        font-size: 12px;
        line-height: 15px;
        padding-bottom: 10px;
      }
      span{
        color:#c7c7c7;
        font-size: 12px;
        line-height: 15px;
      }
    }
    &-changenum{
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      .changenum{
        width: 100%;
        text-align: end;
        padding-right:5px;
        margin-bottom:10px;
      }
      button{
        background:#fbfbfb;
        border: none;
      }
      span{
        padding: 0 5px;
      }
      .part-deleteButton{
         width: 70%;
         height:30%;
         background: red;
         text-align: center;
         padding: 0 5px;
         border-radius: 5px;
         color:white;
         line-height: 24px;
      }
    }
  }
  .footer{
    position: fixed;
    bottom:73px;
    height: 60px;
    width: 100%;
    background: #fff;
    &-indr{
      padding-right: 15px;
      height: 30px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      border-bottom: #efefef;
       .bios-isAllChecked{
        position: absolute;
        left: 15px;
        font-size: 15px;
      }
      span{
         color:#dd4646;
      }
    }
    &-buttons{
      height: 40px;
      width: 100%;
      display: flex;
      border: none;
      &-gocart{
        width: 35%;
        height: 40px;
        line-height: 30px;
        background: #dd4646;
        color: white;
         border: none;
      }
       &-gopay{
         border: none;
        width: 65%;
        height: 40px;
        line-height: 30px;
        background: #efefef;
        color: #dd4646;
      }
    }
  }

</style>
