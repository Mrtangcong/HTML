<template>
  <div class="asidea">
    <div class="tag-b">
      <el-tag closable class="tag">菜单管理</el-tag>
    </div>
    <div class="height100"></div>
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
              <div><span class="xitong1">所属系统</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">菜单编号</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">父菜单</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">菜单名称</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">排序</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">菜单图标</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">菜单级别</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">创建时间</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">最新修改时间</span> <span class="xitong2">{{list.id}}</span></div>
              <div><span class="xitong1">备注</span> <span class="xitong2 xitong3">{{list.id}}</span></div>
              <div slot="footer">
                <Button type="info" size="large" long @click="guanbi">关闭</Button>
              </div>
      </Modal>
      <Modal v-model="modal3" title="删除菜单" :mask-closable="false">
          <div>你确定要删除系统"{{list.id}}"?</div>
          <div>一旦删除信息无法恢复，请谨慎操作！</div>
          <div slot="footer">
            <Button type="error" size="large"  @click="guanbi2">取消</Button>
            <Button type="info" size="large"  @click="shanchu(list.id)">确定删除</Button>
          </div>
      </Modal>
      <Modal v-model="modal5" title="增加菜单" :mask-closable="false" width="500px">
      		<div><span class="xitong1">所属系统</span>
      		 <Select v-model="model6" style="width:200px">
				<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    		 </Select>
    		</div>
            <div><span class="xitong1">菜单编号</span> <span class="xitong2">{{list.id}}</span></div>
            <div><span class="xitong1">父菜单</span>
            	<Select v-model="model7" style="width:200px">
					<Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    		 </Select>
            </div>
            <div><span class="xitong1">菜单名称</span> <input type="text" class="xitong2"></div>
            <div><span class="xitong1">菜单地址</span> <input type="text" class="xitong2"></div>
            <div><span class="xitong1">排序</span> <input type="text" class="xitong2"><span class="xit"><Icon type="alert" color="#f0f"></Icon> &nbsp;选填 默认按顺序取</span></div>
            <div><span class="xitong1">菜单图标</span> <input type="text" class="xitong2"></div>
            <div><span class="xitong1">备注</span> <input type="text" class="xitong2 xitong3"></div>
      </Modal>
      <Modal v-model="modal8" title="修改菜单" :mask-closable="false" width="500px">
      		<div><span class="xitong1">所属系统</span>
      		 <Select v-model="model9" style="width:200px">
				<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    		 </Select>
    		</div>
            <div><span class="xitong1">菜单编号</span> <span class="xitong2">{{list.id}}</span><span class="xit"><Icon type="alert" color="#f0f"></Icon> &nbsp;菜单编号不可修改</span></div>
            <div><span class="xitong1">父菜单</span>
            	<Select v-model="model10" style="width:200px">
					<Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    		 </Select>
            </div>
            <div><span class="xitong1">菜单名称</span> <input type="text" class="xitong2"></div>
            <div><span class="xitong1">菜单地址</span> <input type="text" class="xitong2"></div>
            <div><span class="xitong1">排序</span> <input type="text" class="xitong2"><span class="xit"><Icon type="alert" color="#f0f"></Icon> &nbsp;选填 默认按顺序取</span></div>
            <div><span class="xitong1">菜单图标</span> <input type="text" class="xitong2"></div>
            <div><span class="xitong1">备注</span> <input type="text" class="xitong2 xitong3"></div>
      </Modal>
      <Modal v-model="model11" title="启用菜单" :mask-closable="false">
          <div>你确定要启用菜单"{{list.id}}"?</div>
          <div>注：相关的子菜单不会一并启用</div>
          <div slot="footer">
            <Button type="error" size="large"  @click="guanbi6">取消</Button>
            <Button type="info" size="large"  @click="shanchu(list.id)">确定停用</Button>
          </div>
      </Modal>
      <Modal v-model="model12" title="停用菜单" :mask-closable="false">
          <div>你确定要停用菜单"{{list.id}}"?</div>
          <div>注：相关的子菜单一并停用</div>
          <div slot="footer">
            <Button type="error" size="large"  @click="guanbi3">取消</Button>
            <Button type="info" size="large"  @click="shanchu(list.id)">确定停用</Button>
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
        },
        cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    }
        ],
        cityList1: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    }
        ]
    }
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
  		this.list = data;
  		this.modal1 =  true;
    },
    remove(node, data) {
    	this.list = data;
        this.modal3 = true;
    },
    shanchu(data){
    	// axios
    },
    add(data){
    	this.list = data;
    	this.modal5 = true;
    },
    xiugai(data){
    	this.list = data;
    	this.modal8= true;
    },
    qiyong(data){
    	this.list = data;
    	this.model11 = true;
    },
    tingyong(data){
    	this.list = data;
    	this.model12 = true;
    },
	yiji(){
		this.modal4 = !this.modal4
	}, renderContent(h, { node, data, store }) {
        return (
          	<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
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
               		<i class="el-icon-outline"></i>
               </el-button>

               <el-button style="font-size: 12px;" type="text" on-click={ () => this.qiyong(data) }>
               		<i class="el-icon-success"></i>
               </el-button>
               <el-button style="font-size: 12px;" type="text" on-click={ () => this.tingyong(data) }>
               		<i class="el-icon-error"></i>
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
