<template>
  <div class="asidea">
    <div class="tag-b">
      <el-tag closable class="tag">系统管理</el-tag>
    </div>
    <div class="height100"></div>
    <el-button type="primary">系统名称</el-button>
    <!--  <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option> -->
    <!-- </el-select> -->
    <div class="height100"></div>
    <el-button type="primary">查询</el-button>
    <el-button type="primary">重置</el-button>
    <el-button type="primary" @click="xinzeng">新增</el-button>
    <div class="height100"></div>
    <div class="liebiao">
          <div class="btitle">
            <span style="width:220px">操作</span>
            <span style="width:140px">系统名称</span>
            <span style="width:90px">系统编号</span>
            <span style="width:240px">系统地址</span>
            <span style="width:90px">系统图标</span>
            <span style="width:180px">创建时间</span>
            <span style="width:190px">最新修改时间</span>
            <span style="width:100px">审核标识</span>
            <span style="width:100px">状态</span>
            <span style="width:150px">描述</span>
          </div>
          <div class="tr" v-for="(item,index) in list">
            <el-button type="primary" size="mini">启用/停用</el-button>
            <el-button type="primary" size="mini" @click="shenyong(index)">审核</el-button>
            <el-button type="primary" size="mini" @click="shanchu(index)">删除</el-button>
            <span style="width:140px">{{item.application}}</span>
            <span style="width:90px" @click="xiangqing(index)">{{item.c2}}</span>
            <span style="width:240px">{{item.c3}}</span>
            <span style="width:90px">{{item.c4}}</span>
            <span style="width:180px">{{item.createDate}}</span>
            <span style="width:190px">{{item.modifiedDate}}</span>
            <span style="width:100px">{{item.c7}}</span>
            <span style="width:100px">{{item.c8}}</span>
            <span style="width:150px">{{item.appDesc}}</span>
          </div>
    </div>
             
      <Modal v-model="modal1" title="系统详情"  width="380px">
              <div><span class="xitong1">系统编号</span> <span class="xitong2">{{list2.c2}}</span></div>
              <div><span class="xitong1">系统名称</span> <span class="xitong2">{{list2.c2}}</span></div>
              <div><span class="xitong1">系统地址</span> <span class="xitong2">{{list2.c2}}</span></div>
              <div><span class="xitong1">系统图标</span> <span class="xitong2">{{list2.c2}}</span></div>
              <div><span class="xitong1">开发者</span> <span class="xitong2">{{list2.c2}}</span></div>
              <div><span class="xitong1">联系方式</span> <span class="xitong2">{{list2.c2}}</span></div>
              <div><span class="xitong1">备注</span> <span class="xitong2 xitong3">{{list2.c2}}</span></div>
              <div slot="footer">
                <Button type="info" size="large" long @click="guanbi">关闭</Button>
              </div>
      </Modal>
      <Modal v-model="modal2" title="新增系统" width="380px" :mask-closable="false">
              
              <div><span class="xitong1">系统名称 <span class="zhongyao">*</span></span> <input type="text" v-model="inp1" class="xitong2 xitong4"/></div>
              <div><span class="xitong1">系统地址 <span class="zhongyao">*</span></span> <input type="text" v-model="inp2" class="xitong2 xitong4"/></div>
              <div><span class="xitong1">系统图标</span> <input type="text" v-model="inp3" class="xitong2 xitong4"/></div>
              <div><span class="xitong1">开发者 <span class="zhongyao">*</span></span> <input type="text" v-model="inp4" class="xitong2 xitong4"/></div>
              <div><span class="xitong1">联系方式 <span class="zhongyao">*</span></span> <input type="text" v-model="inp5" class="xitong2 xitong4"/></div>
              <div><span class="xitong1">备注</span> <input type="text" v-model="inp6" class="xitong2 xitong4 xitong3"/></div>
              <div slot="footer">
                <Button type="error" size="large"  @click="guanbi1">取消</Button>
                <Button type="info" size="large"  @click="xinzeng">确定新增</Button>
              </div>
      </Modal>
      <Modal v-model="modal3" title="删除系统" :mask-closable="false">
          <div>你确定要删除系统"{{list2.c2}}"?</div>
          <div>一旦删除信息无法恢复，请谨慎操作！</div>
          <div slot="footer">
            <Button type="error" size="large"  @click="guanbi2">取消</Button>
            <Button type="info" size="large"  @click="xinzeng">确定新增</Button>
          </div>
      </Modal>
      <Modal v-model="modal4" title="系统审核"  width="380px">
        <div><span class="xitong1">系统编号</span> <span class="xitong2">{{list2.c2}}</span></div>
        <div><span class="xitong1">系统名称</span> <span class="xitong2">{{list2.c2}}</span></div>
        <div><span class="xitong1">系统地址</span> <span class="xitong2">{{list2.c2}}</span></div>
        <div><span class="xitong1">系统图标</span> <span class="xitong2">{{list2.c2}}</span></div>
        <div><span class="xitong1">开发者</span> <span class="xitong2">{{list2.c2}}</span></div>
        <div><span class="xitong1">联系方式</span> <span class="xitong2">{{list2.c2}}</span></div>
        <div><span class="xitong1">备注</span> <span class="xitong2 xitong3">{{list2.c2}}</span></div>
        <div slot="footer">
          <Button type="info" size="large" @click="guanbi3">取消</Button>
          <Button type="info" size="large" @click="shenheju">审核拒绝</Button>
          <Button type="info" size="large" @click="shenhetong">审核通过</Button>
        </div>
      </Modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Cur-1',
  data () {
    return {
      modal1:false,
      modal2:false,
      modal3:false,
      modal4:false,
      list2:{},
      list3:{},
      list:[],
      inp1:'',
      inp2:'',
      inp3:'',
      inp4:'',
      inp5:'',
      inp6:'',
    }
  },mounted(){
    var that = this;
    axios.post('http://192.168.1.109:54/oss/project/getAll')
    .then(function(res){
      that.list = res.data.data
    })
  },methods:{
    xiangqing(index){
      this.list2 = this.list[index]
      this.modal1 = true;
    },
    guanbi(){
      this.modal1 = false;
    },
    guanbi1(){
      this.modal2 = false;
    },
    guanbi2(){
      this.modal3 = false;
    },
    guanbi3(){
      this.modal4 = false;
    },
    shenheju(){
      this.modal4 = false;

      // this.$Message.error('审核通过');
    },
    shenhetong(){
      this.modal4 = false;
      // this.$Message.success('审核拒绝')
    },
    xinzeng(){
      // axios
      // this.$Message.success('新增请求成功')
      // this.$Message.error('新增请求失败');
    },
    xinzeng(){
      this.modal2 = true;
    },
    shanchu(index){
      this.list2 = this.list[index]
      this.modal3 = true;
    },
    shenyong(index){
      this.list2 = this.list[index]
      this.modal4 = true;
    }
  }
}
</script>
<style>

</style>
