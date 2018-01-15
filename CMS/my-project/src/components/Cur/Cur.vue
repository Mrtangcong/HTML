<template>
  <div>
    <div class="asidee"></div>
  	<div class="aside">
  		<div class="title">
        {{titile}} 
      </div>
      <div>
        <router-link v-for="(item,index) in list" :to="item.menuUrl" :key="item.label" active-class="asied-ccc" class="asied-C asied-Cc">{{item.label}}</router-link>
        

      </div>
  	</div>
    <router-view/>
  </div>
</template>

<script>
import apidomain from '../../router/luyou.js'
import axios from 'axios'
export default {
  name: 'Cur',
  data () {
    return {
      list:[],
      titile:'',
    }
  },mounted(){
        var that = this;
    var username=localStorage.getItem("token")
    var token=localStorage.getItem("tokens")
    var id=localStorage.getItem("id")
    axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/user/'+username+'/menu'),
        headers:{"sso_token":token,"sso_loginname":username},
        data:{
          "id":11
        }
    })
    .then(function(res){
      
      that.titile = res.data.data[0].label
      that.list = res.data.data[0].children

    })
  
  }
}
</script>
<style>

</style>
