<template>
    <div class="right-detaillist">
        <router-link
        v-for="item in detailList"
        :key="item.id"
        :to="{name:'detail',params:{id:item.id}}"
        tag="div"
        class="bios-list-item"
        >
        <div class="bios-list-img"><img :src="item.img" :alt="item.title"></div>
        <div class="bios-list-title">{{item.title}}</div>
        <div class="bios-list-description">{{item.description}}</div>
        <div class="bios-list-price">￥{{item.price}}.00</div>
        <span 
        class="addtoCart"
        @click="addToCart(item)"
        >+</span>
        </router-link>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
    name: 'detailList',
    data(){
        return{
            currentid: 1001,
            detailList: [],
        }
    },
    mounted(){
        this.getDetailList(this.$route.params.id);
    },
    beforeRouteUpdate(to, from , next){
        this.getDetailList(to.params.id);
        next();
    },
    methods:{
        ...mapMutations(['changeActive','addToCart']),
        getDetailList(id){
          this.$ajax.getDetailList(id)
          .then((resp) => {
              this.currentid = id;
              this.detailList = resp;
          })
      },
    },
    beforeRouteEnter(to , from , next){
      next(vm=>{
          vm.changeActive('type');
        }
      )
  },
}
</script>

<style scoped lang = 'scss'>
@import '../libs/sass/vars.scss';

.right-detaillist{
    padding-left: 100px;
    .bios-list-item{
        height: 142px;
        padding: 20px;
        padding-right: 5px;
        box-sizing: border-box;
        position: relative;
    .bios-list-img{
        float: left;
        width: 100px;
        height: 100px;
    }
    .bios-list-title{
        margin-top: 5px;
        padding-left: 110px;
        color: #000;
        font-weight: bold;
        font-size: 16px;
    }
    .bios-list-description{
        font-size: 12px;
        color: #acacac;
        margin: 10px 0;
        padding-left: 110px;
        line-height: 20px;
    }
    .bios-list-price{
        padding-left: 110px;
        font-size: 18px;
        font-weight: bold;
        color: $theme-color;
    }
    .addtoCart{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: $theme-color;
        position: absolute;
        line-height: 17px;
        right: 15px;
        top: 100px;
        color: #fff;
        font-size: 18px;
        text-align: center;
    }
    }
}
</style>
