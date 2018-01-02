<template>
  <div style="height:100%">
    <div class="asidee"></div>
  	<div class="aside">
  		<div class="title">
        系统设置  
      </div>
      <div>
        <router-link to="/Cur/Customer-1" active-class="asied-ccc" class="asied-C asied-Cc">系统管理</router-link>
        <router-link to="/Cur/Customer-2" active-class="asied-ccc" class="asied-C asied-Cc">菜单管理</router-link>
        <router-link to="/Cur/Customer-3" active-class="asied-ccc" class="asied-C asied-Cc">角色管理</router-link>
        <router-link to="/Cur/Customer-4" active-class="asied-ccc" class="asied-C asied-Cc">组织结构</router-link>
        <router-link to="/Cur/Customer-5" active-class="asied-ccc" class="asied-C asied-Cc">个人中心</router-link>

      </div>
  	</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Cur',
  data () {
    return {
      
    }
  }
}
</script>
<style>

</style>
