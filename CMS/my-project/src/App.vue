<template>
  <div id="app">
    <div class="nav">
      <div class="logo"></div>
      <div class="logo-c"></div>
      <div class="rout" >
        <router-link to="/Cur" active-class="lv">系统管理</router-link>
        <router-link to="/transaction" active-class="lv">交易</router-link>
        <router-link to="/Finance" active-class="lv">财务</router-link>
        <router-link to="/Risk" active-class="lv">风控</router-link>
        <router-link to="/collection" active-class="lv">催收</router-link>
        <router-link to="/Statistics" active-class="lv">统计</router-link>
<!--           <div style="float:right">
            <span>
                <a>
                  {{lock}}
                </a>
            </span>
            <router-link to="/login" style="padding:18px 8px 18px"><Icon type="person-stalker" size="25"></Icon></router-link>
            <a  style="padding:18px 8px 18px" @click="dengchu"><Icon type="log-out" size="25"></Icon></a>

          </div> -->
        </div>
        
    </div>
    <div class="routc"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body,#app{
  height: 100%;
}
  h1,h2,h3,h4,div,b,i,p,body{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
  }
  a{
    text-decoration: none;
  }
  .logo{
    width: 17%;
    height: 63px;
    border-right:1px solid #000;
    display: inline-block;
    background: url('../static/logo.jpg') no-repeat 10px 6px ;
    background-size:80%;
    vertical-align: top;
    position: fixed;
    top:0;
    left: 0;
  }
  .logo-c{
    width: 17%;
    height: 63px;
    display: inline-block;
    vertical-align: top;
  }
  .rout{
    position: fixed;
    top:0;
    padding-left:40px;
    width: 79%;
    display: inline-block;
  }
  .routc{
    width: 100%;
    display: inline-block;
    height: 63px;
  }
  .rout a{
    display: inline-block;
    padding: 18px 20px 18px;
    text-decoration: none;
    color: #495060;
    font-size: 18px;
  }
  .lv{
    color: #2d8cf0;
    border-bottom: 2px solid #2d8cf0;
  }
  .nav{
    width: 100%;
    position: fixed;
    z-index: 10;
    top:0;
    border-bottom:1px solid #000;
    background: #fff;
  }
  .height100{
    height: 100px;
  }
  .height50{
    height: 50px;
  }
  .aside{
  width: 17%;
  height: 100%;
  position: fixed;
  background: #000;
  top: 63px;
  left:0;

}
.asidee{
  width: 17%;
  vertical-align: top;
  display: inline-block;
}
.title{
  text-align: center;
  color: #fff;
  line-height: 63px;
  font-size: 20px;
  background: #495060;
}
.asied-C{
  padding: 14px 24px;
  text-align: center;
  display: block;
  line-height: 53px;
  color: #fff;
}
.asidea{
  display: inline-block;
  width: 82%;
}
.tag{
  margin-top: 10px;
  margin-left: 10px;
  padding:6px 10px;
  font-size: 18px;
  line-height: 0;
  height: auto;
  font-size: 12px;
  color: #000;
}
.input1{
  width: 200px;
  margin-left: 20px;
}
.btitle{
   text-align: left;
  height: 40px;
  background: #f2f4f7;
  line-height: 40px;
  width: 1550px;
}
.liebiao span{
  text-align: center;
  display: inline-block;
  color: #000;
}
.tr{
  height: 50px;
  line-height: 50px;
  width: 1550px;
}
.liebiao{
  overflow-x: scroll;
}
.xitong1{
  display: inline-block;
  padding: 8px 0 12px 0;
  text-align: right;
  width: 85px;
  margin-right: 20px;
}
.xitong2{
  vertical-align: middle;
  margin: 5px 0 12px 0;
  display: inline-block;
  width: 200px;
  border-radius: 3px;
  height: 30px;
  border:1px solid #ccc;
  text-align: center;
  color: #ccc;
}
.xitong3{
  height: 60px;
  text-align: left;
}
.xitong4{
  color: #000;
}
.zhongyao{
  color: #f0f;
}
</style>
