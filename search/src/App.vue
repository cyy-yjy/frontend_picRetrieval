<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { particles } from '@/components/particles/1.js'
//
</script>

<template>
  <div class="common-layout">
    <el-container class="mine_container">
      <!-- <Particles id="tsparticles" class="login__particles" :options="particles" /> -->
      <el-header >
        <el-menu :default-active="activeIndex2" mode="horizontal" position=fixed top=0 left=0 width=100% display=flex
          justify-content=center align-items=center background-color="#545c64" text-color="#fff"
          active-text-color="#ffd04b" @select="handleSelect" >
          <el-menu-item index="1">图片搜索</el-menu-item>
          <el-menu-item index="2" class="inRight">我的喜欢</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
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
<style scoped>
.inRight{
   position: absolute;
    right: 5px;
}
.mine_container {
  background-color: rgb(252, 253, 247);
  width:70%;
  margin: auto;
  /* 居中 */
}
.common-layout {   
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
}
</style>
<style>
#app {
  position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    display: flex;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.login__particles {
  z-index: -1;
  opacity: 0.7;
}
</style>

