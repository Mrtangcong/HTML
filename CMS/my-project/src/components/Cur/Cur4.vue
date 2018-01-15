<template>
  <div class="asidea">
   <div class="tag-b">
      你当前位置 ：员工管理
    </div>
    <div class="height100"></div>
    <div class="Cur-r-r">
    	<!-- <router-link to="/Cur/Customer-4/Customers" active-class="Cur" class="Cur-r">部门结构</router-link> -->
        
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Cur-4',
  data () {
    return {
      
    }
  }
}
</script>
<style>
.Cur-r-r{
	margin-top: 20px;

}
.Cur-r{
	display: inline-block;
	width: 90px;
	text-align: center;
	height: 40px;
	border-radius: 5px 5px 0 0;
	line-height: 40px;
	border-bottom: 1px solid #ccc;
}
.Cur{
	border-bottom: 1px solid #0000ff;
	background: #0000ff;
	color: #fff;
}
</style>
