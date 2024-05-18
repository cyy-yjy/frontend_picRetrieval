<template>
    <h1>This is an about page</h1>
    <el-button> 刷新</el-button>
    <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="pageNum" />
</template>
<script>
import { ref, onMounted } from 'vue'
const pageNum = ref(1)
</script>

<style scoped></style>
