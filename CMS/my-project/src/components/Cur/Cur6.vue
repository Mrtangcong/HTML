<template>
  <div>
    <div class="height100">
    	<div class="titl111">
    		<div>
    			部门名称
    		</div>
    		<div>
    			人数（人）
    		</div>
    	</div>
    </div>
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
      <Modal v-model="modal3" title="删除部门" :mask-closable="false" @on-ok="ok" ok-text="确定删除">
          <div>你确定要删除"{{list.label}}"部门名称?</div>
          <div>一旦删除信息无法恢复，请谨慎操作！</div>
      </Modal>
      <Modal v-model="modal5" title="增加菜单" :mask-closable="false" width="500px" @on-ok="ok1" ok-text="确定添加">
      	  	<div><span class="xitong1">所属上级</span>
      		 <Select v-model="model6" style="width:200px">
			   <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
    		 </Select>
    		</div>
    		<div><span class="xitong1">部门名称</span> <input type="text" class="xitong2" v-model="input2">
    			<span class="xit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="alert" color="#f00"></Icon> &nbsp;最长20个字</span>
    		</div>
      </Modal>
      <Modal v-model="modal6" title="编辑菜单" :mask-closable="false" width="500px" @on-ok="ok2" ok-text="确定修改">
      	  	<div><span class="xitong1">所属上级</span>
      		 <Select v-model="model6" style="width:200px">
			   <Option v-for="item in cityList5" :value="item.value" :key="item.value" >{{ item.label }}</Option>
    		 </Select>
    		</div>
    		<div><span class="xitong1">部门名称</span> <input type="text" class="xitong2" v-model="input2">
    			<span class="xit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="alert" color="#f00"></Icon> &nbsp;最长20个字</span>
    		</div>
      </Modal>
  </div>
</template>

<script>
let id = 1000;
export default {

  name: 'Cur-2',
  data () {
    return {
    	 modal3:false,
    	 modal5:false,
    	 modal6:false,
    	 model6:'',
    	 input2:'',
    	 list:{},
 		 data4: [{
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
        },cityList4:[
      		{
                value: 'New York1',
                label: 'New York1'
            },
            {
                value: 'New York2',
                label: 'New York2'
            },
            {
                value: 'New York3',
                label: 'New York3'
            },
      ],cityList5:[
      		{
                value: 'New York1',
                label: 'New York1'
            },
            {
                value: 'New York2',
                label: 'New York2'
            },
            {
                value: 'New York3',
                label: 'New York3'
            },
      ],
    }
  },methods:{ 
  	ok(){

  	},
  	ok1(){

  	},
  	ok2(){

  	},
  	remove(index){
  		this.list = index;
  		this.modal3 = true;
  	},
  	add(index){
  		this.list = index;
  		this.modal5 = true;
  	},
  	append(index){
  		this.list = index;
  		this.modal6 = true;
  	},
  	renderContent(h, { node, data, store }) {
        return (
          	<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>

              <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>
              		<i class="el-icon-edit"></i>
              </el-button>
               <el-button style="font-size: 12px;" type="text" on-click={ () => this.add(data) }>
               		<i class="el-icon-plus"></i>
               </el-button>
               <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>
              		<i class="el-icon-delete"></i>
              </el-button>
            </span>
          </span>);
      }
  }
}
</script>
<style>
.titl111{
	background:#ccc;
}
.titl111 div{
	display:inline-block;
	padding:10px 0;
	margin-left:150px;
}
.shu{
	margin-left:120px;
	width:600px;
}
</style>
