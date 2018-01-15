<template>
  <div class="asidea">
   <div class="tag-b">
      你当前位置 ：菜单管理
    </div>
    <div class="height100"></div>
    <div class="height100"></div>
    <div class="shu">
    	<el-tree
		  :data="data4"
		  :props="defaultProps"
		  node-key="id"
		  default-expand-all
		  :expand-on-click-node="false"
		  :render-content="renderContent">
		</el-tree>
    </div>
    <Modal v-model="modal1" title="系统详情"  width="400px">
              <div><span class="xitong1">所属系统</span> <span class="xitong2">{{list.application}}</span></div>
              <div><span class="xitong1">菜单编号</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">父菜单</span> <span class="xitong2">{{list.menu}}</span></div>
              <div><span class="xitong1">菜单名称</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">菜单级别</span> <span class="xitong2">{{list.lever
}}</span></div>
              <div><span class="xitong1">创建时间</span> <span class="xitong2">{{list.createDate}}</span></div>
              <div><span class="xitong1">最新修改时间</span> <span class="xitong2">{{list.modifiedDate}}</span></div>
              <div><span class="xitong1">备注</span> <span class="xitong2 xitong3">{{list.id}}</span></div>
              <div slot="footer">
                <Button type="info" size="large" long @click="guanbi">关闭</Button>
              </div>
      </Modal>
      <Modal v-model="modal3" title="删除菜单" :mask-closable="false">
          <div>你确定要删除系统"{{list.label}}"?</div>
          <div>一旦删除信息无法恢复，请谨慎操作！</div>
          <div slot="footer">
            <Button type="error" size="large"  @click="guanbi2">取消</Button>
            <Button type="info" size="large"  @click="shanchu(list.id)">确定删除</Button>
          </div>
      </Modal>
      <Modal v-model="modal5" title="增加菜单" :mask-closable="false" width="500px" ok-text="确定增加" @on-ok="ok">
            <div><span class="xitong1" >父菜单</span>
            	 <span class="xitong2">{{list.label}}</span>
            </div>
            <div><span class="xitong1">菜单名称</span> <input type="text" class="xitong2" v-model="inp1"></div>
            <div><span class="xitong1">菜单地址</span> <input type="text" class="xitong2"  v-model="inp2"></div>
            <!-- <div><span class="xitong1">排序</span> <input type="text" class="xitong2"  v-model="inp3"><span class="xit"><Icon type="alert" color="#f0f"></Icon> &nbsp;选填 默认按顺序取</span></div> -->
            <div><span class="xitong1">备注</span> <input type="text" class="xitong2 xitong3" v-model="inp5"></div>
      </Modal>
      <Modal v-model="modal8" title="修改菜单" :mask-closable="false" width="500px" @on-ok="ok2" ok-text="确定修改">
      		<div><span class="xitong1">所属系统</span>
      		 <Select v-model="model9" style="width:200px">
				<Option v-for="(item,index) in cityList" :value="item.id" :key="item.index">{{ item.application }}</Option>
    		 </Select>
    		</div>
            <div><span class="xitong1">菜单编号</span> <span class="xitong2">{{list.id}}</span><span class="xit"><Icon type="alert" color="#f0f"></Icon> &nbsp;菜单编号不可修改</span></div>
            <div><span class="xitong1">父菜单</span>
            	<Select v-model="model10" style="width:200px">
					<Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    		 </Select>
            </div>
            <div><span class="xitong1">菜单名称</span> <input type="text" class="xitong2" v-model="ino1"></div>
            <div><span class="xitong1">菜单地址</span> <input type="text" class="xitong2" v-model="ino2"></div>
            <div><span class="xitong1">备注</span> <input type="text" class="xitong2 xitong3" v-model="ino3"></div>
      </Modal>
      <Modal v-model="model11" :title="this.ti21" :mask-closable="false">
          <div>你确定要{{ti21}}"{{list.id}}"?</div>
          <div slot="footer">
            <Button type="error" size="large"  @click="guanbi6">取消</Button>
            <Button type="info" size="large"  @click="shanchu1(list.id)">确定{{ti21}}</Button>
          </div>
      </Modal>
  </div>
</template>

<script>
let id = 1000;
import axios from 'axios'
import apidomain from '../../router/luyou.js'
export default {

  name: 'Cur-2',
  data () {
    return {
    	modal1:false,
    	modal3:false,
 		modal4:false,
 		modal5:false,
 		model6:'',
 		model7:'',
 		modal8:false,
 		model9:'',
 		model10:'',
 		model11:false,
 		model12:false,
 		inp1:'',
 		inp2:'',
 		inp3:'',
 		inp4:'',
 		inp5:'',
 		ino1:'',
 		ino2:'',
 		ino3:'',
 		ti21:'',
 		list:{},
 		 data4: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        cityList: [],
        cityList1: [],
        username:'',
        token:'',
    }
  },mounted(){
  	var a = localStorage.getItem("token")
  	var b = localStorage.getItem("tokens")
  	console.log(a)
  	if(a === null){
  		console.log(a)
  		if(b === null){
  			this.$router.push('/login')
  		}
  	}
	  	this.$Message.config({
	    top: 50,
	    duration: 3
	});
    var that = this;
    that.username=localStorage.getItem("token")
    that.token=localStorage.getItem("tokens")
    axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/menu/getAll'),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
    .then(function(res){

		that.data4 = res.data.data
    })
    axios({
        method:'POST',
        baseURL:(apidomain.apidomain + 'oss/project/getAll'),
        headers:{"sso_token":that.token,"sso_loginname":that.username},
    })
    .then(function(res){

      that.cityList = res.data.data

    })
  },methods:{
  	guanbi(){
  		this.modal1  = false
  	},
  	guanbi2(){
  		this.modal3 = false
  	},
  	guanbi3(){
  		this.model12 = false
  	},
  	guanbi6(){
  		this.model11 =false
  	},
  	append(data) {
  		var that = this
  		var a = parseInt(data.id)
  		if(data.id != null){
  			axios({
	        method:'POST',
	        baseURL:(apidomain.apidomain + 'oss/menu/' + a),
	        headers:{"sso_token":that.token,"sso_loginname":that.username},
	    	})
	  		.then((res)=>{
	  			that.list = res.data.data;
	  			that.model6 = res.data.data.id
	  			that.modal1 =  true;
	  		})
	  		
	  		}else{
	  			that.$Message.warning('无法查看根系统');
	  		}

    },
    remove(node, data) {
    	var that = this;
    	this.list = data;
    	if(data.lever != 0){
    		if(data.children.length < 1){
    		this.modal3 = true;
    		}else{
  			that.$Message.warning('含有子菜单，不允许删除');
  		}
  	}else{
  			that.$Message.warning('不能删除根节点菜单');
  	}
    	
        
    },
    shanchu(data){
    	var that = this
  		var a = parseInt(that.list.id)
  			axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/menu/' + a + '/delete'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
	    	})
	  		.then((res)=>{
			  if(res.data.success == true){
	            that.modal3 = false;
	            that.$Message.success('删除成功');
	            axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/menu/getAll'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
	    	})
	            .then(function(res){
	               that.data4 = res.data.data
	               that.inp1=''
 				   that.inp2=''
	            })
	          }else{
	          	that.$Message.error('删除失败');
	          }
	  		})
  		
  		
  		
    },
    shanchu1(){
    	var b;
    	var that = this;
    	if(this.list.status == 0){
    		b = 1
    	}else{
    		b = 0
    	}
    	var a = this.list.id
    	axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/menu/' + a + '/startStop/' +  b),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
	    	})
  		.then((res)=>{
  			that.model11 = false;
  			 that.$Message.success(that.ti21+'成功');
  			 axios({
	        	method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/menu/getAll'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		    })
		    .then(function(res){

				that.data4 = res.data.data
		    })

  		})
    },
    ok(){
    	var that  = this;
    	var a = that.model6;
    	var b = that.list.id;
    	var c = that.inp1;
    	var d = that.inp2;
    	var e = that.list.lever + 1;
    	var g = that.inp5;

    	if(e <= 4){
    		axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/menu/add'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		        data:{
		        	"application":a,
		        	"parentId":b,
		        	"menu":c,
		        	"menuUrl":d,
		        	"menuDesc":g,
		        	"level":e
		        }
	    	})
	  		.then((res)=>{
  			  if(res.data.success == true){
	            that.modal5 = false;
	            that.$Message.success('添加成功');
	            axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain +'oss/menu/getAll'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
	    		})
	            .then(function(res){
	               that.data4 = res.data.data

	            })
	         }
	  		})
    	}else{
    		that.$Message.error('添加失败，菜单等级超过上限')
    	}
    	
    },
    add(data){
    	this.list = data;
    	this.model6 = this.list.appId
    	this.modal5 = true;
    },
    xiugai(data){
    	var that = this;
    	var a = data.id;
    	if(data.id !=null){
    		axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/menu/' + a),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
	    		})
  			.then((res)=>{
  				that.list = res.data.data;
  				that.ino1 = that.list.menu
  				that.ino2 = that.list.menuUrl
  				that.ino3 = that.list.menuDesc
  				that.modal8= true;
  			})
    	}else{
    		that.$Message.error('无法修改根系统')
    	}
    
    	
    },
    ok2(){
    	
    	var that = this;
    	var a  = that.ino1;
    	var b = that.ino2;
    	var c = that.ino3;
    	var d = that.list.id
    	var abc = that.list.application;
    	var cc = that.list.parentId;
    	var dd = that.list.level;
    	axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/menu/'+ d + '/update'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
		        data:{"application":abc,
		        "parentId":cc,
		        "menu":a,
		        "menuUrl":b,
		        "menuDesc":c,
		        "level":dd
		    }
	    })
  		.then((res)=>{		
  			that.modal8= false;
  			axios({
		        method:'POST',
		        baseURL:(apidomain.apidomain + 'oss/menu/getAll'),
		        headers:{"sso_token":that.token,"sso_loginname":that.username},
	    		})
	            .then(function(res){
	               that.data4 = res.data.data

	        })
  		})
    },
    qiyong(data){
    	this.list = data;
    	if(this.list.children <= 0){
    		if(this.list.status == 0){
	    		this.ti21 = '停用菜单'
		    	}else{
		    		this.ti21 = '启用菜单'
		    	}
		    	this.model11 = true;
		    }else{
		    	this.$Message.error('无法操作根系统')
		    }
    	
    },
	yiji(){
		this.modal4 = !this.modal4
	}, renderContent(h, { node, data, store }) {
        return (
          	<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span >&nbsp;&nbsp;&nbsp;{node.label}</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>
              		<i class="el-icon-view"></i>
              </el-button>
               <el-button style="font-size: 12px;" type="text" on-click={ () => this.add(data) }>
               		<i class="el-icon-plus"></i>
               </el-button>
               <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>
              		<i class="el-icon-delete"></i>
              </el-button>
               <el-button style="font-size: 12px;" type="text" on-click={ () => this.xiugai(data) }>
               		<i class="el-icon-edit"></i>
               </el-button>

               <el-button style="font-size: 12px;" type="text" on-click={ () => this.qiyong(data) }>
               		<i class="el-icon-success"></i>
               </el-button>
            </span>
          </span>);
      }
  }
}
</script>
<style>
.shu{
	width: 600px;
	margin-left: 100px;
}
.xit{
	margin-left:20px;
	color:#ccc;
}
</style>
