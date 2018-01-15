<template>
  <div>
  	<!-- <div class="navimg"></div> -->
  	<div>
  		<!-- <Button type="ghost" style="margin-right:-5px;vertical-align: top;">部门</Button>
  		<Select v-model="model1" style="width:150px;margin-right:45px;">
	        <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.application }}</Option>
	    </Select> -->
	    <Button type="ghost" style="margin-right:-5px;vertical-align: top;">角色</Button>
  		<Select v-model="model2" style="width:150px;margin-right:45px;">
	        <Option v-for="item in cityList1" :value="item.id" :key="item.id">{{ item.roleDesc }}</Option>
	    </Select>
	    <!-- <Button type="ghost" style="margin-right:-5px;vertical-align: top;">所属管理组</Button>
  		<Select v-model="model3" style="width:150px;margin-right:45px;">
	        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    </Select> -->
	    <Button type="ghost" style="margin-right:-5px;vertical-align: top;">状态</Button>
  		<Select v-model="model4" style="width:150px;margin-right:45px;" >
	        <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    </Select>
  	</div> 
  	<div style="margin-top:50px;">
  		<Button type="ghost" style="margin-right:-5px;vertical-align: top;">用户名</Button>
  		<Input v-model="value1" style="width: 150px;margin-right:45px;"></Input>
  		<Button type="ghost" style="margin-right:-5px;vertical-align: top;">真实姓名</Button>
  		<Input v-model="value2" style="width: 150px;margin-right:45px;"></Input>
  		<Button type="ghost" style="margin-right:-5px;vertical-align: top;">手机号码</Button>
  		<Input v-model="value3" style="width: 150px;margin-right:45px;"></Input>
  	</div>
  	<div class="height50"></div>
  	<el-button type="primary" @click="chaxun">查询</el-button>
    <el-button type="primary" @click="chongzhi">重置</el-button>
    <el-button type="primary" @click="xinzeng">新增</el-button>
    <div class="height50"></div>
    <div class="liebiao">
      <div class="btitle">
        <span style="width:180px">操作</span>
        <span style="width:100px">用户名</span>
        <span style="width:90px">姓名</span>
        <span style="width:180px">手机号码</span>
        <span style="width:240px">身份证号</span>
        <span style="width:100px">角色</span>
        <span style="width:100px">状态</span>
        <span style="width:200px">备注</span>
      </div>
      <div class="tr" v-for="(item,index) in list">
        <el-button type="primary" size="mini" @click="shenyong(item.accountBO)">冻结|解冻</el-button>
        <el-button type="primary" size="mini" @click="chongzhimima(item.accountBO)">重置密码</el-button>
        <span style="width:100px" class="lanse" @click="xiugai(item.accountBO)">{{item.accountBO.loginName}}</span>
        <span style="width:90px">{{item.accountBO.realName}}</span>
        <span style="width:180px">{{item.accountBO.mobile}}</span>
        <span style="width:240px">{{item.accountBO.idCard}}</span>
        <span style="width:100px"> <!-- <Tooltip v-if="item.menuNames.length > 0" :content="item.menuNames" placement="top">
            <Button>查看</Button>
        </Tooltip> -->
        <span v-if="item.menuNames.length === 0">无</span>
    </span>
        <span style="width:100px">{{item.accountBO.status}}</span>
        <span style="width:200px">{{item.accountBO.remark}}</span>
      </div>
    </div>
    <Modal v-model="chongzh" title="重置密码" :mask-closable="false" ok-text="确定" @on-ok="chongi1j3">
          <div>你确定要重置员工"{{list1.loginName}}"的帐号</div>
          <RadioGroup v-model="vertical" vertical>
		        <Radio label="0" >
		            
		            <span>随机密码：{{sjmim}}</span>
		        </Radio>
		        <Radio label="1" >
		            <span>手动输入</span>
		            <Input v-model="value33" style="width: 150px;"></Input>
		        </Radio>
		    </RadioGroup>
    </Modal>
    <Modal v-model="dongjie" :title="this.dongjiejiedong+'员工'" :mask-closable="false" :ok-text="'确定'+this.dongjiejiedong" @on-ok="dongjie1">
          <div>你正在{{this.dongjiejiedong}}员工"{{list1.loginName}}"的账户登录密码?</div>
    </Modal>
    <Modal v-model="xinzenghaoyou" title="新增员工" :mask-closable="false" ok-text="确定新增" @on-ok="ok1" width="570px">
    	  	<div class="tuoshan">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="android-alert" color="#f00"></Icon>&nbsp;&nbsp;请妥善保管好员工的密码</div>
          	<!-- <div><span class="xitong1">部门</span>
      		 <Select v-model="model6" multiple style="width:200px">
			   <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
    		 </Select>
    		</div> -->
    		<div><span class="xitong1">角色</span>
      		 <Select v-model="model8" multiple  style="width:200px">
				<Option v-for="item in cityList1" :value="item.id" :key="item.id">{{ item.roleDesc }}</Option>
    		 </Select>
    		</div>
	    		<!-- <div><span class="xitong1">所属管理组</span>
	      		 <Select v-model="model7" style="width:200px">
					<Option v-for="item in cityList6" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    		 </Select>
	    		</div> -->
            <div><span class="xitong1">用户名</span> <input type="text" class="xitong2" v-model="input1">
            	<span class="xit">&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="alert" color="#f00"></Icon> &nbsp;最长20个字,设置后不许修改</span>
            </div>
            <div><span class="xitong1">真实姓名</span> <input type="text" class="xitong2" v-model="input22"></div>
            <div><span class="xitong1">手机号码</span> <input type="text" class="xitong2" v-model="input2"></div>
            <div><span class="xitong1">身份证号</span> <input type="text" class="xitong2" v-model="input3"></div>
            <div><span class="xitong1">备注</span> <input type="text" class="xitong2" v-model="input33"></div>
            <div><span class="xitong1">设置密码</span> <input type="text" class="xitong2" v-model="input4">
            	<Button type="info" style="margin-top:-8px" @click="mima">随机生成有效密码</Button>
            </div>
    </Modal>
    <Modal v-model="xiugai1" title="修改" :mask-closable="false" ok-text="确定修改" @on-ok="ok2" width="570px">
          	<!-- <div><span class="xitong1">部门</span>
      		 <Select v-model="model6" multiple style="width:200px">
			   <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
    		 </Select>
    		</div> -->
    		<div><span class="xitong1">角色</span>
      		 <Select v-model="model88" multiple  style="width:200px">
				<Option v-for="item in cityList1" :value="item.id" :key="item.id">{{ item.roleDesc }}</Option>
    		 </Select>
    		</div>
	    		<!-- <div><span class="xitong1">所属管理组</span>
	      		 <Select v-model="model7" style="width:200px">
					<Option v-for="item in cityList6" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    		 </Select>
	    		</div> -->
            <div><span class="xitong1">用户名</span> <span class="xitong2">{{this.list1.loginName}}</span>
            	<span class="xit">&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="alert" color="#f00"></Icon> &nbsp;最长20个字,设置后不许修改</span>
            </div>
            <div><span class="xitong1">真实姓名</span> <input type="text"  class="xitong2" v-model="i2"></div>
            <div><span class="xitong1">手机号码</span> <input type="text"  class="xitong2" v-model="i3"><span v-if="this.i7" class="xit">&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="alert" color="#f00"></Icon> &nbsp;请输入11位手机号</span></div>
            <div><span class="xitong1">身份证号</span> <input type="text"  class="xitong2" v-model="i4"></div>
            <div><span class="xitong1">备注</span> <input type="text"  class="xitong2" v-model="i5"></div>
            <!-- <div><span class="xitong1">设置密码</span> <input type="text" class="xitong2" v-model="i6">
            	<Button type="info" style="margin-top:-8px" @click="mima">随机生成有效密码</Button>
            </div> -->
    </Modal>
  </div>
</template>	

<script>
import axios from 'axios'
import apidomain from '../../router/luyou.js'
export default {
  name: 'Cur-7',
  data () {
    return {
      model1:'',
      model2:'',
      model3:'',
      model4:'',
      value1:'',
      value2:'',
      value3:'',
      model6:[],
      model7:'',
      model8:[],
      input1:'',
      input2:'',
      input22:'',
      input33:'',
      input3:'',
      input4:'',
      dongjiejiedong:'',
      vertical:'0',
      chongzh:false,
      dongjie:false,
      jiedong:false,
      xiugai1:false,
      xinzenghaoyou:false,
      zhuxiaoyuangong:false,
      cityList:[],
      cityList1:[],
      cityList2:[],
      cityList3:[
      	{
          value: '0',
          label: '正常'
        },{
          value: '1',
          label: '冻结'
        },
        {
          value: '2',
          label: '注销'
        },
      ],
      cityList4:[],
      cityList5:[],
      cityList6:[],
      list:[],
      list1:{},
      model88:[],
      i2:'',
      i3:'',
      i4:'',
      i5:'',
      i6:'',
      i7:false,
      sjmim:'',
      value33:'',
      username:'',
      token:'',
    }
  },mounted(){
  	var that = this;
  	that.username=localStorage.getItem("token")
    that.token=localStorage.getItem("tokens")
    axios({
        method:'POST',
        baseURL:(apidomain.apidomain + '/oss/user/getAll'),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
    .then(function(res){
      that.list = res.data.data
    })
    axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/role/getAll'),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
    .then(function(res){
      that.cityList1 = res.data.data
    })
  },methods:{
  	chongzhimima(index){
  		var a = index.loginName
  		var that = this
  		that.list1 = index
	      axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/user/createRandomPwd' ),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		    })
		    .then(function(res){
		      that.sjmim = res.data.data
	      that.chongzh = true;
	    })
  		
  	},
  	chongi1j3(){
  		var that  = this
  		var a = that.vertical
  		var b = that.sjmim
  		var c = that.list1.loginName
  		var d = that.list1.password
  		var e = that.value33
  		if(a == '0'){
  			axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain +  'oss/user/'+c+'/pwd'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		        data:{
		        	"password":d,
		        	"newPassword":b
		        }
		    })
		    .then(function(res){
		    	if(res.data.message =="成功"){
		      	that.$Message.success('重置密码成功');
		      }else{
		      	that.$Message.error('重置密码失败');
		      }
		    })
  		}else if(a == '1'){
  			axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/user/'+c+'/pwd'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		        data:{
		        	"password":d,
		        	"newPassword":e
		        }
		    })
		    .then(function(res){
		      that.value33 = ''
		      if(res.data.message =="成功"){
		      	that.$Message.success('重置密码成功');
		      }else{
		      	that.$Message.error('重置密码失败');
		      }
		      
		    })
  		}
  	},
  	dongjie1(){
  		var that = this;
  		var a = that.list1

  		var b
  		if(a.status == 0){
  			b = 1;

  		}else if(a.status ==1){
  			b = 0
  		}
  		axios({
	        method:'POST',
	        baseURL:(apidomain.apidomain + 'oss/user/' + a.loginName  +'/status'),
	        headers:{"sso_token":that.token,"sso_loginname":that.username},
	        data:{
	        	"status":b
	        }
	    })
	    .then(function(res){
	    	that.$Message.success(that.dongjiejiedong+'成功');
		      axios({
			        method:'POST',
			        baseURL:(apidomain.apidomain + '/oss/user/getAll'),
			        headers:{"sso_token":that.token,"sso_loginname":that.username},
			   })
		      .then(function(res){
		      		that.list = res.data.data
		      })
	    	
	    })
  	},
  	shenyong(index){
  		var that = this
  		this.list1 = index
  		if(index.status == 0){
  			that.dongjiejiedong = '冻结'
  			that.dongjie = true
  		}else if(index.status == 1){
  			that.dongjiejiedong = '解冻'
  			that.dongjie = true
  		}
  		
  	},
  	xiugai(index){
  		var that = this;
  		var a = index.loginName 
  		axios({
	        method:'POST',
	        baseURL:(apidomain.apidomain + 'oss/user/' + a ),
	        headers:{"sso_token":that.token,"sso_loginname":that.username},
	    })
	    .then(function(res){
	      that.list1 = res.data.data
	      that.model88 = res.data.data.roleIds
	      that.i2 = that.list1.realName
	      that.i3 = that.list1.mobile
	      that.i4 = that.list1.idCard
	      that.i5 = that.list1.remark
	      that.xiugai1 = true;
	    })
  		
  	},
  	ok2(){
  		var that = this;
  		var a = that.list1.loginName
  		var b = that.i3
  		if(b.length == 11){
  			axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/user/' + a +'/update'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		        data:{
		        	"roleIds":that.model88,
		        	"idCard":that.i4,
		        	"mobile":that.i3,
		        	"realName":that.i2,
		        	"remark":that.i5,
		        	"createUser":"HY",
		        	"id":that.list1.id
		        }
		    })
		    .then(function(res){
		      that.xiugai1 = false

		      	axios({
			        method:'POST',
			        baseURL:(apidomain.apidomain + '/oss/user/getAll'),
			        headers:{"sso_token":that.token,"sso_loginname":that.username},
			    })
			    .then(function(res){

			      that.list = res.data.data
			    })
		    })
  		}else{
  			

  		}
  		
  	},
  	ok1(){
  		var that = this
  		var a = that.model8
  		var b = that.input1
  		var c = that.input2
  		var d = that.input3
  		var e = that.input4
  		var bb = that.input22
  		var cc = that.input33
  		
  		axios({
	        method:'POST',
	        baseURL:(apidomain.apidomain + 'oss/user/addRoleAcct'),
	        headers:{"sso_token":that.token,"sso_loginname":that.username},
	        data:{
	        	"roleIds":a,
	        	"idCard":d,
	        	"loginName":b,
	        	"mobile":c,
	        	"password":e,
	        	"realName":bb,
	        	"remark":cc,
	        	"createUser":"HY"
	        }
	    })
	    .then(function(res){
	      that.input4 = ''
	      that.input3 = ''
	      that.input2 = ''
	      that.input22 = ''
	      that.input1 = ''
	      that.model8 = []
	      axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain +  '/oss/user/getAll'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		    })
		    .then(function(res){
		      that.list = res.data.data
		      for(var i=0;i<that.list.length;i++){
		      	var a = that.list[i].menuNames
		      	that.list.menuNames[i] = a.join(",")
		      }
		    })
	    })
  	},
  	chaxun(){
  		var that = this;
  		var  a = that.model2;
  		var  b = that.model4;
  		var c = that.value1;
  		var d = that.value2;
  		var e = that.value3;
  		axios({
	        method:'POST',
	        baseURL:(apidomain.apidomain + 'oss/user/queryUser'),
	        headers:{"sso_token":that.token,"sso_loginname":that.username},
	        data:{
	        	"loginName":c,
	        	"mobile":e,
	        	"realName":d,
	        	"roleId":a,
	        	"status":b
	        }
	    })
	    .then(function(res){
	     that.list = res.data.data
	    })
  	},

  	chongzhi(){
  	  this.model1='';
      this.model2='';
      this.model3='';
      this.model4='';
      this.value1='';
      this.value2='';
      this.value3='';
      var that = this;
      axios({
	        method:'POST',
	        baseURL:(apidomain.apidomain + '/oss/user/getAll'),
	        headers:{"sso_token":that.token,"sso_loginname":that.username},
	    })
		    .then(function(res){
		      that.list = res.data.data
		      // for(var i=0;i<that.list.length;i++){
		      // 	var a = that.list[i].menuNames
		      // 	that.list.menuNames[i] = a.join(",")
		      // }
		    })
  	},
  	xinzeng(){
  		this.xinzenghaoyou = true;
  	},
  	mima(){
  		var that = this;
  		axios({
	        method:'POST',
	        baseURL:(apidomain.apidomain +  'oss/user/createRandomPwd'),
	        headers:{"sso_token":that.token,"sso_loginname":that.username},
	    })
  		.then(res=>{
  			if(res.data.success === true){
  				that.input4 =res.data.data
  			}
  		})
  	},
  	zhuxiao(index){
  		this.list1 = index
  		this.zhuxiaoyuangong = true;
  	},
  }
}
</script>
<style>
.navimg{
	background:url(../../../static/buzhou.png) no-repeat;
	height:70px;
	background-size: 100%;

}
.tuoshan{
	text-indent: 5px;
	margin: 5px 0 10px 10px;
	color: #ccc;
}
.xitong2{
	color: #000;
}
 .top,.bottom{
        text-align: center;
    }
    .center{
        width: 300px;
        margin: 10px auto;
        overflow: hidden;
    }
    .liebiao span.lanse{
    	color: #0000ff;
    	cursor:pointer ;
    }
</style>
