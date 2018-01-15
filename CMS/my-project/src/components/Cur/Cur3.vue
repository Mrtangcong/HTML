<template>
  <div class="asidea">
    <div class="tag-b">
      你当前位置 ：角色管理
    </div>
    <div class="height100"></div>
    <el-button type="primary">所属系统</el-button>
    <el-select v-model="value1" placeholder="请选择">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.application"
        :value="item.id">
      </el-option>
    </el-select>
    <el-button type="primary">角色</el-button>
    <el-select v-model="value2" placeholder="请选择">
      <el-option
        v-for="(item,index) in options1"
        :key="index"
        :label="item.roleDesc"
        :value="item.id">
      </el-option>
    </el-select>
   <div class="height100"></div>
    <el-button type="primary" @click="chaxun">查询</el-button>
    <el-button type="primary" @click="chongzhi">重置</el-button>
    <el-button type="primary" @click="xinzeng">新增</el-button>
    <div class="liebiao">
          <div class="btitle" style="width:auto">
            <span style="width:130px;border-right:1px dashed #ccc">操作</span>
            <span style="width:140px;border-right:1px dashed #ccc">所属系统</span>
            <span style="width:140px;border-right:1px dashed #ccc">角色</span>
            <span style="width:140px">人数(人)</span>
          </div>
          <div class="tr" v-for="(item,index) in list" style="width:auto">
          	<el-button type="primary" size="mini" @click="shanchu(index)">删除</el-button>
            <el-button type="primary" size="mini" @click="bianji(item)">编辑</el-button>
            
            <span style="width:140px">{{item.appName}}</span>
            <span style="width:140px">{{item.roleDesc}}</span>
            <span style="width:140px">{{item.userCount}}</span>
          </div>
    </div>
    <Modal v-model="modal1" title="删除菜单" :mask-closable="false">
          <div>你确定要删除菜单"{{list1.roleDesc}}"?</div>
          <div>一旦删除信息无法恢复，请谨慎操作！</div>
          <div slot="footer">
            <Button type="error" size="large"  @click="guanbi2">取消</Button>
            <Button type="info" size="large"  @click="shanchu1(list.id)">确定删除</Button>
          </div>
    </Modal>
    <Modal v-model="modal2" title="编辑角色" :mask-closable="false" @on-ok="queding">
         	<div>
         		<span class="xitong1">所属系统</span>
         		<el-select v-model="model3" placeholder="请选择">
			      <el-option
			        v-for="(item,index) in options"
			        :key="item.role"
			        :label="item.role"
			        :value="item.id">
			      </el-option>
			    </el-select>
         	</div>
          	<div>
         		<span class="xitong1">角色</span>
         		<input type="text" class="xitong2" v-model="model4"><span class="xit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="alert" color="#f00"></Icon> &nbsp;最长20个字</span>
         	</div>
         	<div class="height100"></div>
         	<div>菜单权限地图</div>
         	<div class="shuu">
         		<el-tree
				  :data="data3"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  :props="defaultProps"
				  ref="tree1"
				  >
				</el-tree>
         	</div>
    </Modal>
    <Modal v-model="modal5" title="新增角色" :mask-closable="false" @on-ok="xinzengqueding">
         	<div>
         		<span class="xitong1">所属系统</span>
         		<el-select v-model="model3" placeholder="请选择">
			      <el-option
			        v-for="(item,index) in options"
			        :key="item.application"
			        :label="item.application"
			        :value="item.id">
			      </el-option>
			    </el-select>
         	</div>
          	<div>
         		<span class="xitong1">角色</span>
         		<input type="text" class="xitong2" v-model="inpu1" style="color:#555;width:220px;height:36px;line-height:36px"><span class="xit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="alert" color="#f0f"></Icon> &nbsp;&nbsp;最长20个字</span>
         	</div>
         	<div class="height100"></div>
         	<div>菜单权限地图</div>
         	<div>
         		<el-tree
				  :data="data2"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree3"
				  :props="defaultProps">
				</el-tree>
         	</div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import apidomain from '../../router/luyou.js'
export default {
  name: 'Cur-3',
  data () {
    return {
      modal1:false,
      modal2:false,
      model3:'',
      model4:'',
      modal5:false,
      model6:'',
      list1:{},
      list:[],
      options:[],
      options1:[],
      cityList:[],
      value1:'',
      value2:'',
      inpu1:'',
      data2: [],
      data3:[],
      list123:[],
      header:{},
      username:'',
      token:'',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
  },mounted(){

  	var that = this;
  	that.username=localStorage.getItem("token")
    that.token=localStorage.getItem("tokens")
    axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/project/getAll'),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
    .then(function(res){
     
      that.options = res.data.data
    })
    var that = this;
    axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/role/getAll'),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
    .then(function(res){
     
      that.options1 = res.data.data
    })
    axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/role/getGroupRole'),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
    .then(function(res){
      
      that.list = res.data.data
     
    })
    axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/menu/getAllEnable'),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
    .then(function(res){
     
      that.data2 = res.data.data
      that.data3 = res.data.data
    })
  },
  methods:{
  	shanchu(index){
  		this.modal1 = true;

  		this.list1 = this.list[index]
  		
  		

  	},
  	shanchu1(){
  		var that = this;
  		var a =this.list1.id
  		axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/role/'+ a + '/delete'),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
	    .then(function(res){
	    
	      if(res.data.success == false){
	      	that.modal1 = false;
	      	axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/role/getGroupRole'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		    })
		    .then(function(res){
		     
		      that.list = res.data.data
		    })
	      	that.$Message.success('删除成功');
	      }else{
	      	that.$Message.error('删除失败');
	      }
	    
	    })	
  	},
  	bianji(index){
  		var that = this
		axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/role/'+index.id),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		    })
	    .then(function(res){
	     console.log(res)
	      that.list1 = res.data.data
	      that.list123 = res.data.data.menuIds 
	      that.modal2 = true;
	      that.model4 = res.data.data.roleDesc
	      that.model3 = res.data.data.application
	      that.$refs.tree1.setCheckedKeys(that.list123);
	      
	    })
  		
  		
  	},
  	guanbi2(){
  		this.modal1 =false;
  	},
  	queding(){
  		var that = this;
  		var a = this.$refs.tree1.getCheckedKeys()
  		axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/role/' + that.list1.id  +'/update'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		        data:{
		        	"application":that.model3,
		        	"roleDesc":that.model4,
		        	"menuIds":a
		        }
		    })
	    .then(function(res){
	     
	      axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/role/getGroupRole'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		    })
		    .then(function(res){
		     
		      that.list = res.data.data
		    })
	    })
  	},
  	xinzeng(){
  		this.modal5 = true;
  	},
  	chongzhi(){
  		var that = this;
  		this.value2 = '';
  		this.value1 = '';
  		axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/role/getGroupRole'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		    })
	    .then(function(res){
	      that.list = res.data.data
	    })
  	},
  	xinzengqueding(){
  		var that = this;
  		var a =this.$refs.tree3.getCheckedKeys()
  		axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/role/add'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		        data:{
		        	"application":that.model3,
		        	"roleDesc":that.inpu1,
		        	"menuIds":a
		        }
		    })
	    .then(function(res){
	     
	      axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/role/getGroupRole'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		    })
		    .then(function(res){
		     
		      that.list = res.data.data
		    })
	    })
  	},chaxun(){
  		var that = this;
  		var a = this.value1
  		var b = this.value2
  		 axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain +  'oss/role/getByAppAndRole?appId='+a+'&roleId='+b),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		    })
	    .then(function(res){
	     
	      that.list = res.data.data
	    })
	}
  }
}
</script>
<style>
.shuu{
	margin-top:20px;
	margin-left: 50px;
	width: 80%;
	border: 1px dashed #ccc;
	height: 200px;
	overflow-y: scroll;
}
</style>
