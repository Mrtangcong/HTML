<template>
    <div>
      <div class="wqejiokqe">
        <router-link :to={name:item.appAddr,params:{name:item.id}} active-class="lv" key="item.appAddr" class="lv12" v-for="item in list">{{item.application}}</router-link>
      </div>
       
    </div>
</template>

<script>
import axios from 'axios'
import apidomain from '../router/luyou.js'
export default {
  name: 'hello',
  data(){
    return{
      list:[],
    }
  },updated(){

  },mounted(){
    var that = this;
    
    var username=localStorage.getItem("token")
    var token=localStorage.getItem("tokens")
    console.log(token)
    axios({
        method:'POST',
        baseURL:apidomain.apidomain + 'oss/user/'+ username +'/app',
        headers:{"sso_token":token,"sso_loginname":username},
        
    })
    .then(function(res){
      console.log(res)
      that.list = res.data.data
      localStorage.setItem("id",res.data.data.id)
    })
  
  }
}
</script>

<style>
.wqejiokqe{
  padding: 10%;
}
.lv12{
  border: 1px solid #ccc;
  display: inline-block;
  padding: 100px;
}
</style>
