<template>
  <div class="asidea">
    <div class="tag-b">
      <el-tag closable class="tag">个人中心</el-tag>
    </div>
    <div class="height100"></div>
    <div class="height100"></div>
    <div class="hhhh">
      <div class="hl">
    	<div><span class="xitong1">用户编号</span> <div type="text" class="xitong2" v-model="input1"></div></div>
    	<div><span class="xitong1">用户名</span> <div type="text" class="xitong2" v-model="input2"></div></div>
    	<div><span class="xitong1">手机号码</span> <div type="text" class="xitong2" v-model="input3"></div></div>
    	<div><span class="xitong1">职位</span> <div type="text" class="xitong2" v-model="input4"></div></div>
    	<div><span class="xitong1">部门</span> <div type="text" class="xitong2" v-model="input5"></div></div>
    	<div><span class="xitong1">所属管理组</span> <div type="text" class="xitong2" v-model="input6"></div></div>
    	<div><span class="xitong1">状态</span> <div type="text" class="xitong2" v-model="input7"></div></div>
    	<div><span class="xitong1">添加人</span> <div type="text" class="xitong2" v-model="input8"></div></div>
    	<div><span class="xitong1">登录密码</span> <div type="text" class="xitong2" v-model="input9"></div></div>
    	<div><span class="xitong1">用户编号</span> <div type="text" class="xitong2" v-model="input10"></div></div>
      </div>
      <div class="hr">
    	权限地图
    	<div class="ditu">
    		<el-tree
		  :data="data4"
		  :props="defaultProps"
		  node-key="id"
		  show-checkbox
		  default-expand-all="true"
		  :expand-on-click-node="false"
		  :default-checked-keys="[1,2,3,4,5,6,7,8,9,10]"
		  :render-content="renderContent">
			</el-tree>
    	</div>
    	
      </div>
    </div>
  </div>
</template>

<script>
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
      data4: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 2,
            label: '二级 1-1',
            children: [{
              id: 3,
              label: '三级 1-1-1'
            }, {
              id: 4,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 5,
          label: '一级 2',
          children: [{
            id: 6,
            label: '二级 2-1'
          }, {
            id: 7,
            label: '二级 2-2'
          }]
        }, {
          id: 8,
          label: '一级 3',
          children: [{
            id: 9,
            label: '二级 3-1'
          }, {
            id: 10,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
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
</style>
