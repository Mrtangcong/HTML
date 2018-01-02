<template>
  <div>
  	<div class="navimg"></div>
  	<div class="height50"></div>
  	<div>
  		<Button type="ghost" style="margin-right:-5px;vertical-align: top;">部门</Button>
  		<Select v-model="model1" style="width:150px;margin-right:45px;">
	        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    </Select>
	    <Button type="ghost" style="margin-right:-5px;vertical-align: top;">角色</Button>
  		<Select v-model="model2" style="width:150px;margin-right:45px;">
	        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    </Select>
	    <Button type="ghost" style="margin-right:-5px;vertical-align: top;">所属管理组</Button>
  		<Select v-model="model3" style="width:150px;margin-right:45px;">
	        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    </Select>
	    <Button type="ghost" style="margin-right:-5px;vertical-align: top;">状态</Button>
  		<Select v-model="model4" style="width:150px;margin-right:45px;" >
	        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
	    </Select>
	    <input  name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
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
        <span style="width:245px">操作</span>
        <span style="width:100px">用户名</span>
        <span style="width:90px">姓名</span>
        <span style="width:180px">手机号码</span>
        <span style="width:240px">身份证号</span>
        <span style="width:100px">角色</span>
        <span style="width:100px">部门</span>
        <span style="width:100px">所属管理组</span>
        <span style="width:100px">状态</span>
        <span style="width:200px">备注</span>
      </div>
      <div class="tr" v-for="(item,index) in list">
        <el-button type="primary" size="mini" @click="zhuxiao(index)">注销</el-button>
        <el-button type="primary" size="mini" @click="shenyong(index)">冻结|解冻</el-button>
        <el-button type="primary" size="mini" @click="chongzhimima(index)">重置密码</el-button>
        <span style="width:100px">{{item.c1}}</span>
        <span style="width:90px" @click="xiangqing(index)">{{item.c2}}</span>
        <span style="width:180px">{{item.c3}}</span>
        <span style="width:240px">{{item.c4}}</span>
        <span style="width:100px">{{item.c5}}</span>
        <span style="width:100px">{{item.c6}}</span>
        <span style="width:100px">{{item.c7}}</span>
        <span style="width:100px">{{item.c8}}</span>
        <span style="width:200px">{{item.c9}}</span>
      </div>
    </div>
    <Modal v-model="chongzh" title="重置密码" :mask-closable="false">
          <div>你确定要冻结员工"{{list1.c3}}"的帐号</div>
          <RadioGroup v-model="vertical" vertical>
		        <Radio label="apple" >
		            <span >设为默认</span>
		            <span>默认密码为【juncheng123】</span>
		        </Radio>
		        <Radio label="android" >
		            <span>手动输入</span>
		            <Input v-model="value3" style="width: 150px;"></Input>
		        </Radio>
		    </RadioGroup>
    </Modal>
    <Modal v-model="dongjie" title="冻结帐号" :mask-closable="false">
          <div>你正在重置员工"{{list1.c3}}"的账户登录密码?</div>
    </Modal>
    <Modal v-model="jiedong" title="解冻帐号" :mask-closable="false">
          <div>你正在重置员工"{{list1.c3}}"的账户登录密码?</div>
    </Modal>
    <Modal v-model="zhuxiaoyuangong" title="注销帐号" :mask-closable="false" ok-text="确定注销" @on-ok="ok">
          <div>你确定要注销员工"{{list1.c2}}"的帐号?</div>
    </Modal>
    <Modal v-model="xinzenghaoyou" title="新增员工" :mask-closable="false" ok-text="确定注销" @on-ok="ok">
    	  	<div class="tuoshan"><Icon type="android-alert" color="#f00"></Icon>请妥善保管好员工的密码</div>
          	<div><span class="xitong1">部门</span>
      		 <Select v-model="model6" style="width:200px">
				<Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
    		 </Select>
    		</div>
    		<div><span class="xitong1">角色</span>
      		 <Select v-model="model8" style="width:200px">
				<Option v-for="item in cityList5" :value="item.value" :key="item.value">{{ item.label }}</Option>
    		 </Select>
    		</div>
    		<div><span class="xitong1">所属管理组</span>
      		 <Select v-model="model7" style="width:200px">
				<Option v-for="item in cityList6" :value="item.value" :key="item.value">{{ item.label }}</Option>
    		 </Select>
    		</div>
            <div><span class="xitong1">用户名</span> <input type="text" class="xitong2" v-model="input1"></div>
            <div><span class="xitong1">菜单名称</span> <input type="text" class="xitong2" v-model="input1"></div>
            <div><span class="xitong1">菜单地址</span> <input type="text" class="xitong2" v-model="input1"></div>
            <div><span class="xitong1">排序</span> <input type="text" class="xitong2"><span class="xit"><Icon type="alert" color="#f0f"></Icon> &nbsp;选填 默认按顺序取</span></div>
            <div><span class="xitong1">菜单图标</span> <input type="text" class="xitong2"></div>
            <div><span class="xitong1">备注</span> <input type="text" class="xitong2 xitong3"></div>
    </Modal>
  </div>
</template>	

<script>
import axios from 'axios'
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
      model6:'',
      model7:'',
      model8:'',

      vertical:'apple',
      chongzh:false,
      dongjie:false,
      jiedong:false,
      xinzenghaoyou:false,
      xinzenghaoyou:false,
      cityList:[
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
      cityList1:[
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
      cityList2:[
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
      cityList4:[
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
      cityList5:[
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
      cityList6:[
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
      list:[
        {
          c1:"Ln123",
          c2:"张三",
          c3:"18842872661",
          c4:"210282199602112110",
          c5:"催收人员",
          c6:"催收部",
          c7:"催收组",
          c8:"正常",
          c9:""
        },
        {
          c1:"Ln123",
          c2:"张三",
          c3:"18842872661",
          c4:"210282199602112110",
          c5:"催收人员",
          c6:"催收部",
          c7:"催收组",
          c8:"正常",
          c9:""
        },
        {
          c1:"Ln123",
          c2:"张三",
          c3:"18842872661",
          c4:"210282199602112110",
          c5:"催收人员",
          c6:"催收部",
          c7:"催收组",
          c8:"正常",
          c9:""
        },
      ],
      list1:{}
    }
  },methods:{
  	chongzhimima(index){
  		this.list1 = this.list[index]
  		this.chongzh = true;
  	},ok(index){

  	},
  	chaxun(){

  	},
  	chongzhi(){
  	  this.model1='';
      this.model2='';
      this.model3='';
      this.model4='';
      this.value1='';
      this.value2='';
      this.value3='';
  	},
  	xinzeng(){
  		this.xinzenghaoyou = true;
  	},
  	zhuxiao(index){
  		this.list1 = this.list[index]
  		this.zhuxiaoyuangong = true;
  	},update (e) {   // 上传照片
      var self = this
      let file = e.target.files[0]
      /* eslint-disable no-undef */
      let param = new FormData()  // 创建form对象
      param.append('file', file)  // 通过append向form对象添加数据
      param.append('wenzi',{application:'123'}) // 添加form表单中其他数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      

     // 添加请求头
    axios.post('http://192.168.1.109:54/oss/project/add', param , config)
        .then(response => {
          if (response.data.code === 0) {
            self.ImgUrl = response.data.data
          }
          console.log(response.data)
        })
        .catch(res=>{
        	console.log(res)
        })
    }
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
</style>
