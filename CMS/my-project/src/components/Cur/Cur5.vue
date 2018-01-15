<template>
  <div class="asidea">
    <div class="tag-b">
      你当前位置 ：个人中心
    </div>
    <div class="height100"></div>
    <div class="hhhh">
      <div class="hl">
    	<div><span class="xitong1">用户编号</span> <div type="text" class="xitong2" v-model="input1">{{list.id}}</div></div>
    	<div><span class="xitong1">用户名</span> <div type="text" class="xitong2" v-model="input2">{{list.loginName}}</div></div>
    	<div><span class="xitong1">手机号码</span> <div type="text" class="xitong2" v-model="input3">{{list.mobile}}</div></div>
    	<div><span class="xitong1">职位</span> <div type="text" class="xitong2" v-model="input4">{{list.loginName}}</div></div>
    	<div><span class="xitong1">状态</span> <div type="text" class="xitong2" v-model="input7">{{list.status}}</div></div>
    	<div><span class="xitong1">添加时间</span> <div type="text" class="xitong2">{{list.createDate}}</div></div>
    	<div><span class="xitong1">添加人</span> <div type="text" class="xitong2" v-model="input8">{{list.realName}}</div></div>
    	<div><span class="xitong1">登录密码</span> <div type="text" class="xitong2" v-model="input9">{{list.password}}</div></div>
    	
      </div>
      <div class="hr">
    	权限地图
    	<div class="ditu">
    		<el-tree
		  :data="data4"
		  :props="defaultProps"
		  node-key="id"		  
		  :default-expand-all="true"
		  :expand-on-click-node="false"
		  ref="tree1"
		  :render-content="renderContent"
		  >
			</el-tree>
    	</div>
    	
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apidomain from '../../router/luyou.js'
export default {
  name: 'Cur-5',
  data () {
    return {
      input1:'',
      input2:'',
      input3:'',
      input4:'',
      input5:'',
      input6:'',
      input7:'',
      input8:'',
      input9:'',
      input10:'',
      true:[],
      list:[],
      data4: [],
      username:'',
      token:'',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
    }
  },mounted(){
  	var that = this;
  	that.username=localStorage.getItem("token")
    that.token=localStorage.getItem("tokens")
    axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/user/'+ that.username),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
	    .then(function(res){
	      
	      that.list = res.data.data
	      that.true = res.data.data.menus
	    })
	axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/menu/getAll'),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
    .then(function(res){
      
      that.data4 = res.data.data
    })
    
  },methods:{
  	th1(data){
  		var that = this;
  		for(var i=0;i<that.true.length;i++){
  			if(that.true[i] == data){
  				return that.true[i]
  			}
  			
  		}
  	},
  	renderContent(h, { node, data, store }) {
        return (
          	<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>&nbsp;&nbsp;&nbsp;{data.label} <span v-show={data.id == this.th1(data.id)&&data.id != null}>&nbsp;&nbsp;<i class="el-icon-check"></i></span></span>
            </span>
            <span>
            </span>
          </span>)
    }
  }
}
</script>
<style>
.hl{
	display: inline-block;
}
.hr{
	display: inline-block;
	vertical-align: top;
	width: 300px;
	margin-right: 200px;
}
.hhhh{
	display:flex;
	justify-content: space-between;
}
.ditu{
	padding: 20px;
	border: 1px dashed #ccc;
}
.el-icon-check{
	font-size:18px;
	font-weight: 900;
}
</style>
