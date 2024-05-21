<template>
    <div style="padding-top: 10px;font-size: xx-large;">这些是您喜欢的图片
        您喜欢的图片有：<span style="color: #e518bc;">{{ ans_count }}</span>&nbsp; 张
    </div>
    <h2 style="margin-bottom: 10px;">点击图片可以&nbsp; <span style="color: #216ce6;">放大</span>&nbsp; 查看哦！ </h2>
    <el-button @click="refreshLike" class="mine-refresh" size="large" round color="#626aef" :dark="isDark">
        &nbsp;刷新&nbsp;</el-button>
    <div style="height: 80px;"></div>
    <!-- 用一个标签显示目前有多少个喜欢的图片 -->
    <el-row :gutter="20" class="my-row">
        <!-- 做一个卡片，它包括image，button -->
        <div v-for="(item, index) in list" :key="index">
            <el-col :span="8" style="max-width: 480px" shadow="hover">
                <el-card style="max-width: 250px;height: 330px;margin: 10px;position: relative;"
                 shadow="hover">
                <!-- 它还有一个标题 -->
                <template #header>{{ item.name }}</template>
                <el-image style="width: 200px; height: 100px" :src="srcList[index]" :zoom-rate="1.2" :max-scale="7"
                    :min-scale="0.2" :preview-src-list="srcList" :initial-index="index" fit="cover" />
                <div class="showtags">
                  <span>标签：</span>
                  <el-tag type="warning" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</el-tag>
                </div>
                    <el-button size="large" round type="danger" plain 
                style="width: 80px;position: absolute;left: 50%;transform: translateX(-50%); bottom: 20px;" @click="handleLike(item)">
                    <i class="fi fi-rr-heart" v-show="!item.isCollected"></i>
                    <i class="fi fi-sr-heart" v-show="item.isCollected"></i>
                </el-button>
                </el-card>
            </el-col>
        </div>
    </el-row>
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
        const formData = {
            info: {
                filename: item.name,
                like: item.isCollected ? 1 : 0
            }
        }
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
onMounted(async () => {
    try {
        const newdata = await origin.getAllLikes();
        list.value = newdata.list.map(item => ({
            name: item.filename,
            isCollected: item.isCollected,
            tags: item.tags
        }))
        console.log('刷新成功,msg为' + newdata)
    } catch (error) {
        console.error('获取点赞列表时出错：', error);
    }
    updateSrc()
})
</script>

<style scoped>
.mine-refresh {
    margin-bottom: 20px;
    float: right;
    margin-right: 20px;
}

.my-row {
    float: center
}
</style>
