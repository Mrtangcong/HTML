<template>
  <div class="asidea">
    <div class="tag-b">
      <el-tag closable class="tag">角色管理</el-tag>
    </div>
    <div class="height100"></div>
    <el-button type="primary">所属系统</el-button>
    <el-button type="primary">角色</el-button>
   <div class="height100"></div>
    <el-button type="primary">查询</el-button>
    <el-button type="primary">重置</el-button>
    <el-button type="primary" @click="xinzeng">新增</el-button>
    <div class="liebiao" style="overflow:auto">
          <div class="btitle" style="width:auto">
            <span style="width:130px;border-right:1px dashed #ccc">操作</span>
            <span style="width:140px;border-right:1px dashed #ccc">所属系统</span>
            <span style="width:140px;border-right:1px dashed #ccc">角色</span>
            <span style="width:140px">人数(人)</span>
          </div>
          <div class="tr" v-for="(item,index) in list" style="width:auto">
          	<el-button type="primary" size="mini" @click="shanchu(index)">删除</el-button>
            <el-button type="primary" size="mini" @click="bianji(index)">编辑</el-button>
            
            <span style="width:140px">{{item.c1}}</span>
            <span style="width:140px">{{item.c2}}</span>
            <span style="width:140px">{{item.c3}}</span>
          </div>
    </div>
    <Modal v-model="modal1" title="删除菜单" :mask-closable="false">
          <div>你确定要删除系统"{{list1.c3}}"?</div>
          <div>一旦删除信息无法恢复，请谨慎操作！</div>
          <div slot="footer">
            <Button type="error" size="large"  @click="guanbi2">取消</Button>
            <Button type="info" size="large"  @click="shanchu(list.id)">确定删除</Button>
          </div>
    </Modal>
    <Modal v-model="modal2" title="编辑角色" :mask-closable="false" @on-ok="queding">
         	<div>
         		<span class="xitong1">所属系统</span>
         		<Select v-model="model3" style="width:200px">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    		</Select>
         	</div>
          	<div>
         		<span class="xitong1">角色</span>
         		<input type="text" class="xitong2"><span class="xit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="alert" color="#f00"></Icon> &nbsp;最长20个字</span>
         	</div>
         	<div class="height100"></div>
         	<div>菜单权限地图</div>
         	<div class="shuu">
         		<el-tree
				  :data="data2"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree"
				  highlight-current
				  :props="defaultProps">
				</el-tree>
         	</div>
    </Modal>
    <Modal v-model="modal5" title="编辑角色" :mask-closable="false" @on-ok="xinzengqueding">
         	<div>
         		<span class="xitong1">所属系统</span>
         		<Select v-model="model6" style="width:200px">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    		</Select>
         	</div>
          	<div>
         		<span class="xitong1">角色</span>
         		<input type="text" class="xitong2"><span class="xit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="alert" color="#f0f"></Icon> &nbsp;&nbsp;最长20个字</span>
         	</div>
         	<div class="height100"></div>
         	<div>菜单权限地图</div>
         	<div class="shu">
         		<el-tree
				  :data="data2"
				  show-checkbox
				  default-expand-all
				  node-key="id"
				  ref="tree3"
				  highlight-current
				  :props="defaultProps">
				</el-tree>
         	</div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
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
      cityList:[
      	{
            value: 'New York',
            label: 'New York'
        },
        {
            value: 'London',
            label: 'London'
        }
      ],data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
  },mounted(){
  	var that = this;
  	axios.post('http://192.168.1.109:54/oss/role/getAll')
    .then(function(res){
      console.log(res)
      that.list = res.data.data
    })
  },
  methods:{
  	shanchu(index){
  		this.modal1 = true;

  		this.list1 = this.list[index]

  	},
  	bianji(index){
  		this.modal2 = true;
  		this.list1 = this.list[index]
  	},
  	guanbi2(){
  		this.modal1 =false;
  	},
  	queding(){
  		console.log(this.$refs.tree.getCheckedKeys())
  	},
  	xinzeng(){
  		this.modal5 = true;
  	},
  	xinzengqueding(){
  		console.log(this.$refs.tree3.getCheckedKeys())
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
