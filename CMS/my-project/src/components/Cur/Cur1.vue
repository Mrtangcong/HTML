<template>
  <div class="asidea">
    <div class="tag-b">
      当前位置/
    </div>
    <div class="height100"></div>

    <el-button type="primary">系统名称</el-button>
     <el-select v-model="value1" placeholder="请选择">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.application"
        :value="item.id">
      </el-option>
    </el-select>
    <div class="height100"></div>
    <el-button type="primary" @click="chaxun">查询</el-button>
    <el-button type="primary" @click="chongzhi">重置</el-button>
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
            <el-button type="primary" size="mini" @click="qiting(index)">启用/停用</el-button>
            <el-button type="primary" size="mini" @click="shenyong(index)">审核</el-button>
            <el-button type="primary" size="mini" @click="shanchu(index)">删除</el-button>
            <span style="width:140px;">{{item.application}}</span>
            <span style="width:90px;" @click="xiangqing(index)">{{item.id}}</span>
            <span style="width:240px;">{{item.appAddr}}</span>
            <span style="width:90px;"><img v-if="item.appIcon != ''" :src="'http://192.168.1.109:54/'+item.appIcon" class="xianzhi" style="display:inline-block" ></span>
            <span style="width:180px;">{{item.createDate}}</span>
            <span style="width:190px;">{{item.modifiedDate}}</span>
            <span style="width:100px;">{{item.c7}}</span>
            <span style="width:100px;">{{item.status}}</span>
            <span style="width:150px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.appDesc}}</span>
          </div>
    </div>
             
      <Modal v-model="modal1" title="系统详情"  width="380px">
              <div><span class="xitong1">系统编号</span> <span class="xitong2">{{list2.id}}</span></div>
              <div><span class="xitong1">系统名称</span> <span class="xitong2">{{list2.application}}</span></div>
              <div><span class="xitong1">系统地址</span> <span class="xitong2">{{list2.appAddr}}</span></div>
              <div><span class="xitong1">系统图标</span> <img v-if="list2.appIcon != ''" :src="'http://192.168.1.109:54/'+list2.appIcon" class="xianzhi" ></div>
              <div><span class="xitong1">开发者</span> <span class="xitong2">{{list2.appAuthor}}</span></div>
              <div><span class="xitong1">联系方式</span> <span class="xitong2">{{list2.mobile}}</span></div>
              <div><span class="xitong1">备注</span> <span class="xitong2 xitong3">{{list2.appDesc}}</span></div>
              <div slot="footer">
                <Button type="info" size="large" long @click="guanbi">关闭</Button>
              </div>
      </Modal>
      <Modal v-model="modal2" title="新增系统" width="380px" :mask-closable="false">
              
              <div><span class="xitong1">系统名称 <span class="zhongyao">*</span></span> <input type="text" v-model="inp1" class="xitong2 xitong4"/></div>
              <div><span class="xitong1">系统地址 <span class="zhongyao">*</span></span> <input type="text" v-model="inp2" class="xitong2 xitong4"/></div>
              <div><span class="xitong1">系统图标</span><input class="xitong2 xitong4" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
                <img :src="'http://192.168.1.109:54/'+this.ImgUrl" class="xianzhi xianzasd" v-if="this.ImgUrl != ''">
              </div>
              <div><span class="xitong1">开发者 <span class="zhongyao">*</span></span> <input type="text" v-model="inp4" class="xitong2 xitong4"/></div>
              <div><span class="xitong1">联系方式 <span class="zhongyao">*</span></span> <input type="text" v-model="inp5" class="xitong2 xitong4"/></div>
              <div><span class="xitong1">备注</span> <input type="text" v-model="inp6" class="xitong2 xitong4 xitong3"/></div>
              <div slot="footer">
                <Button type="error" size="large"  @click="guanbi1">取消</Button>
                <Button type="info" size="large"  @click="xinzeng1">确定新增</Button>
              </div>
      </Modal>
      <Modal v-model="modal3" title="删除系统" :mask-closable="false">
          <div>你确定要删除系统"{{list2.application}}"?</div>
          <div>一旦删除信息无法恢复，请谨慎操作！</div>
          <div slot="footer">
            <Button type="error" size="large"  @click="guanbi2">取消</Button>
            <Button type="info" size="large"  @click="shanchuc">确定删除</Button>
          </div>
      </Modal>
      <Modal v-model="modal8" :title="this.qitong" :mask-closable="false" :ok-text="'确定' + this.qitong" @on-ok="ok1">
          <div>你确定要{{this.qitong}}系统"{{list2.application}}"?</div>
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
      modal8:false,
      options:[],
      list2:{},
      list3:{},
      list:{},
      inp1:'',
      inp2:'',
      inp3:'',
      inp4:'',
      inp5:'',
      inp6:'',
      value1:'',
      ImgUrl:'',
      qitong:'',
    }
  },mounted(){
    var that = this;
    axios.post('http://192.168.1.109:54/oss/project/getAll')
    .then(function(res){
      console.log(res)
      that.options = res.data.data
      that.list = res.data.data
    })
  },methods:{
    xiangqing(index){
      this.list2 = this.list[index]
      console.log(this.list2)
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
    xinzeng1(){
      var that = this;
      var a = this.inp1;
      var b = this.inp2;
      var c = this.inp3;
      var d = this.inp4;
      var e = this.inp5;
      var f = this.inp6;
      axios.post('http://192.168.1.109:54/oss/project/add',{"application":a,"appAddr":b,"appIcon":that.ImgUrl,"appAuthor":d,"mobile":e,"appDesc":f})
      .then(function(res){
        console.log(res)
        if(res.data.success == true){
          that.modal2 = false
          that.$Message.success('上传成功')

          axios.post('http://192.168.1.109:54/oss/project/getAll')
          .then(function(res){
            console.log(res)
            that.options = res.data.data
            that.list = res.data.data
          })
        }else{
          this.$Message.error('上传失败，请重新上传')
        }
      })
      // this.$Message.success('新增请求成功')
      
    },
    ok1(){
      var that = this;
      axios.post('http://192.168.1.109:54/oss/project/' +that.list2.id  + '/startStop/'+that.list2.oppStatusValue)
      .then(function(res){
        console.log(res)
        that.$Message.success('成功');
        axios.post('http://192.168.1.109:54/oss/project/getAll')
      .then(function(res){
        console.log(res)
        that.options = res.data.data
        that.list = res.data.data

      })
      })
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
    },
    chongzhi(){
      var that = this;
      this.value1 = '';
      axios.post('http://192.168.1.109:54/oss/project/getAll')
      .then(function(res){
        console.log(res)
        that.options = res.data.data
        that.list = res.data.data
      })
    },
    qiting(index){
      this.modal8 = true;
      this.list2 = this.list[index]
      if(this.list2.oppStatusValue == 1 ){
        this.qitong = '停用'
      }else if(this.list2.oppStatusValue == 0){
        this.qitong = '启用'
      }
    },
    chaxun(){
      var that = this;
      axios.post('http://192.168.1.109:54/oss/project/getAll')
      .then(function(res){
        console.log(res)
        that.list = res.data.data
        var a = parseInt(that.value1);
        console.log(a)
        var c = that.list
        console.log(c)
        console.log(c[a])
        that.list = [];
        that.list.push(c)
      })

    },shanchuc(){
      var that = this;
      var a = that.list2.id
      axios.post('http://192.168.1.109:54/oss/project/'+ a  + '/delete')
      .then(function(res){
        if(res.data.success == true){
            that.modal3 = false;
            that.$Message.success('删除成功');
            axios.post('http://192.168.1.109:54/oss/project/getAll')
            .then(function(res){
              console.log(res)
              that.options = res.data.data
              that.list = res.data.data
            })
        }
      })
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
    axios.post('http://192.168.1.109:54/oss/project/uploadIcon', param , config)
        .then(response => {
          console.log(response)
          if (response.data.success === true){
            this.$Message.success('图片上传成功');
            self.ImgUrl = response.data.data
          }else{
            this.$Message.error('请重新上传图片');
          }
          
        })
    }
  }
}
</script>
<style>
.xianzhi{
  width: 50%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.xianzasd{
  display: block;
  margin: 0 auto;
}
</style>
