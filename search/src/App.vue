<script setup>
import { RouterLink, RouterView } from 'vue-router'
//
</script>

<template>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      position= fixed 
    top= 0
    left= 0
    width= 100%
    display= flex 
    justify-content=center
    align-items= center 
    background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-menu-item index="1">图片搜索</el-menu-item>
      <el-menu-item index="2">我的喜欢</el-menu-item>
    </el-menu>
    <h1 class="test">标题</h1>
    <div class="page">
  <router-view/>
  </div>
</template>
<script>
import { ref } from 'vue'
import router from '@/router/index.js'
const activeIndex2 = ref('1')
const handleSelect = (index) => {
  switch (index) {
    case '1':
      router.push({ name: 'home' });
      break;
    case '2':
      router.push({ name: 'about' });
      break;
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.page{
  margin-top: 100px;
}
</style>
