<template>
    <h1>这里展示您收藏过的图片</h1>
    <el-button @click="refreshLike"> 刷新</el-button>
    <!-- 用一个标签显示目前有多少个喜欢的图片 -->
    <div>
        你喜欢的图片有：{{ ans_count }} 张
      </div>
      <!-- 做一个卡片，它包括image，button -->
      <div v-for="(item, index) in list" :key="index">
        <el-card  style="max-width: 480px" shadow="hover" >
          <!-- 它还有一个标题 -->
          <template #header>{{ item.name }}</template>
          <el-image style="width: 100px; height: 100px" :src="srcList[index]"
          :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="srcList"
            :initial-index="index"
            fit="cover" />
          <el-button round type="danger" plain @click="handleLike(item)">
            <i class="fi fi-rr-heart" v-show="!item.isCollected"></i>
            <i class="fi fi-sr-heart" v-show="item.isCollected"></i>
          </el-button>
          <!-- 它还有很多个标签， -->
          <el-tag type="warning" v-for="(tag, index) in item.tags"  :key="index" >{{ tag }}</el-tag>
        </el-card>
        </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import origin from '@/apis/origin'
const ans_count = ref(0)
const list = ref([])
const srcList = ref([])
//写一个函数用来把路径转成本地地址
function transformImagePath(path) {
    // 提取文件名（即最后一个 '/' 之后的部分）  
    const fileName = path.split('/').pop();
    // 构造新路径，使用 '@/dataset/' 作为前缀并接上文件名  
    return `../assets/dataset/${fileName}`;
}
const updateSrc = () => {
        ans_count.value = list.value.length
    // 清空 srcList  
    srcList.value = [];
    // 遍历 list 中的每个对象  
    list.value.forEach(item => {
        // 使用 item.name 调用 transformImagePath 并创建一个新的 URL 对象  
        const url = new URL(transformImagePath(item.name), import.meta.url);
        console.log(url.href)
        // 将新 URL 的 href 添加到 srcList 中  
        srcList.value.push(url.href);
    });

}
const handleLike = async (item) => {
    item.isCollected = !item.isCollected
    if (item.isCollected)
        ans_count.value++;
    else
        ans_count.value--;
    //向后端传递请求
    try {
        const formData = new FormData(); // 创建一个新的 FormData 实例  
        formData.append('filename', item.name);
        formData.append('like', item.isCollected ? 1 : 0);
        const newdata = await origin.likeImage(formData);
        console.log('修改点赞状态成功,msg为' + newdata)
    } catch (error) {
        console.error('点赞时出错：', error);
    }
}
const refreshLike = async () => {
    //向后端传递请求
    try {
        const newdata = await origin.getAllLikes();
        list.value = newdata.list.map(item => ({
            name: item.filename,
            isCollected: item.isCollected,
            tags: item.tags
        }))
        console.log('刷新成功,msg为' + newdata)
    } catch (error) {
        console.error('点赞时出错：', error);
    }
    updateSrc()
}
onMounted(async() => {
    try {
        const newdata = await origin.getAllLikes();
        list.value = newdata.list.map(item => ({
            name: item.filename,
            isCollected: item.isCollected,
            tags: item.tags
        }))
        console.log('刷新成功,msg为' + newdata)
    } catch (error) {
        console.error('点赞时出错：', error);
    }
    updateSrc()
})
</script>

<style scoped></style>
