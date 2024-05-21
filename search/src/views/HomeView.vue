<template>
  <!-- 首先是标题 -->
  <h1 class="my_header1">上传图片吧！</h1>
  <el-row :gutter="24">
    <el-col :span="12" style="background-color: rgb(252, 247, 245); min-height: 360px">
      <!-- 通过span确定了这块区域占多大 -->
      <!-- 实际上，这里只需要获取图片的name就行啦 -->
      <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false" :on-change="handleTest">
        <el-image v-if="imageUrl" :src="imageUrl" class="avatar_image" fit="scale-down" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
      <el-button type="danger" plain @click="imageLike" class="recButton">
        <i class="fi fi-rr-heart" v-show="!likeThis"></i>
        <i class="fi fi-sr-heart" v-show="likeThis"></i>
      </el-button>
    </el-col>
    <el-col :span="12" style="background-color:rgb(247, 244, 251);">

      <!-- 用户可以输入数字，决定搜索多少张图片 -->
      <el-form-item label="请输入想获得的图片数量：" v-bind:class="{ error: isError }" class="input_number_class">
        <el-input-number v-model="inputNumber" @change="clearErrorBorder" :max="30" step="1" :min="1" />
        <div class="errorText">{{ errorMsg }}</div>
      </el-form-item>

      <el-form-item>
        <el-button type="success" size="large" @click="onSubmit" color="#626aef" :dark="isDark"
          style="margin-left: auto;margin-right: auto;width: 70px;"> 搜索</el-button>
      </el-form-item>
      <div class="contain"></div>
      <!-- 加一个按钮，可以只看喜欢 -->
      <el-form-item label="是否只显示你喜欢的图片" class="input_number_class">
        <el-switch v-model="like" @change="onlyLike" active-text="只看喜欢" inactive-text="都看"
          style="--el-switch-on-color: #e518bc; --el-switch-off-color: grey" />
      </el-form-item>
      <el-form-item label="这些是你可能需要的标签，你可以排除掉一些标签" class="input_number_class" style="margin-bottom: 1px;">
        <div class="withdrawTags">
          <!-- 加一个按钮可以撤回对标签的修改 -->
          <el-tooltip content="撤销修改" effect="customized" class="box-item" placement="right">
            <el-button :icon="RefreshLeft" @click="withdrawTags" style="width: 60px;" />
          </el-tooltip>
        </div>
      </el-form-item>
      <div class="choosetags" v-show="getlength()">
        <!-- 做一些标签，可以选择是否删掉 -->
        <el-check-tag v-for="(tag, index) in tags" :key="index" :checked="tag.checked" @change="onChange(tag)"
          type="warning" :disable-transitions="false" effect="dark" style="margin: 2px;">
          {{ tag.name }}
        </el-check-tag>
      </div>

    </el-col>
  </el-row>
  <div v-show="getlength()">
    <!-- 显示当前结果数量 -->
    <div class="mine-h2">
      <h2>当前结果数量：<span style="color: #e518bc;">{{ ans_count }}</span> </h2>
      <h4>点击图片可以放大查看哦！</h4>
    </div>

    <!-- 构建一个有9张图的图片墙 -->
    <!-- 做一个卡片，它包括image，button -->
    <el-row :gutter="20">
      <el-col :span="8" v-for="(item, index) in list" :key="index" v-show="tagInList(item)">
        <div>
          <el-card style="max-width: 250px;height: 330px;margin: 10px;position: relative;" shadow="hover"
            v-show="!like || item.isCollected">
            <!-- 它还有一个标题 -->
            <template #header>{{ item.name }}</template>
            <el-image style="width: 200px; height: 100px" :src="srcList[index]" :zoom-rate="1.2" :max-scale="7"
              :min-scale="0.2" :preview-src-list="srcList" :initial-index="index" fit="cover" />
            <div class="showtags">
              <span>标签：</span>
              <!-- 它还有很多个标签， -->
              <!-- 如果有一个div包裹着很多个button 我希望某个button距离div的下边界的距离固定为20px，
              应该怎么写css -->
              <el-tag type="warning" v-for="(tag, index) in item.tags" :key="index">{{ tag }}</el-tag>
            </div>
            <el-button size="large" round type="danger" plain
              style="width: 80px;position: absolute;left: 50%;transform: translateX(-50%); bottom: 20px;"
              @click="handleLike(item)">
              <i class="fi fi-rr-heart" v-show="!item.isCollected"></i>
              <i class="fi fi-sr-heart" v-show="item.isCollected"></i>
            </el-button>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>

import origin from '@/apis/origin'
import { ref, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
const ans_count = ref(0)
const imageUrl = ref('')
const inputNumber = ref(9)
const isError = ref(false)
const errorMsg = ref('')
const likeThis = ref(false)
const tagInList = (item) => {
  return tags.value.some(a => a.checked && item.tags.includes(a.name));
}
const clearErrorBorder = () => {
  isError.value = false
  errorMsg.value = ''
}
const withdrawTags = () => {
  console.log('撤销')
  tags.value.forEach(item => {
    item.checked = true;
  }
  )
}
const getlength = () => {
  if (tags.value.length > 0)
    return true
  else
    return false
}
const onChange = (item) => {
  item.checked = !item.checked
  getans_count()
}
const shouldShow = (item) => {
  if (tagInList(item) == false)
    return false;
  return !like.value || item.isCollected
}
const list = ref([]);
const like = ref(false)
const onlyLike = () => {
  console.log(like.value)
  getans_count()
}
const url2 = new URL('@/assets/dataset/im2.jpg', import.meta.url).href
const todisplay = ref()
const topost = ref()
const url = ref()
const handleLike = async (item) => {
  item.isCollected = !item.isCollected
  //向后端传递请求
  try {
    const formData = {
      info: {
        filename: item.name,
        like: item.isCollected ? 1 : 0
      }
    }
    console.log("like=", formData.info.like)
    const newdata = await origin.likeImage(formData);
    console.log('数据保存成功,msg为' + newdata)
  } catch (error) {
    console.error('点赞时出错：', error);
  }
}
import { ElMessage } from 'element-plus'
const imageLike = async () => {
  if (!uploadImg.value) {
    ElMessage({
      message: '你还没有上传图片哦',
      type: 'warning',
    })
    return
  }
  likeThis.value = !likeThis.value
  //向后端传递请求
  try {
    const formData = {
      info: {
        filename: uploadImg.value,
        like: likeThis.value ? 1 : 0
      }
    }
    const newdata = await origin.likeImage(formData);
    console.log('数据保存成功,msg为' + newdata)
  } catch (error) {
    console.error('点赞时出错：', error);
  }
}
const uploadImg = ref()
const handleTest = (newFile) => {
  console.log(newFile.name)
  uploadImg.value = newFile.name
  let new_url = new URL(transformImagePath(newFile.name), import.meta.url).href
  console.log(new_url)
  console.log(url2)
  imageUrl.value = new_url
}
const tags = ref([])
const srcList = ref([
])
const getTestData = async () => {
  try {
    const response = await fetch('/api/test');
    const responseData = await response.json();
    todisplay.value = responseData.msg
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const postTest = async () => {
  try {
    const formData = new FormData();
    formData.append('age', 1);
    const response = await origin.testPost(formData)
    topost.value = response.msg
    console.log('数据发送成功');
  } catch (error) {
    console.error('往后端传数据时出错：', error);
  }
};
//写一个函数用来把路径转成本地地址
function transformImagePath(path) {
  // 提取文件名（即最后一个 '/' 之后的部分）  
  const fileName = path.split('/').pop();
  // 构造新路径，使用 '@/dataset/' 作为前缀并接上文件名  
  return `../assets/dataset/${fileName}`;
}
const onSubmit = async () => {
  errorMsg.value = "";
  isError.value = false;
  let inputNumberValue = parseInt(inputNumber.value, 10);
  if (isNaN(inputNumberValue) || inputNumberValue < 1 || inputNumberValue > 30) {
    errorMsg.value = "请输入范围在1到30的整数";
    isError.value = true
    return
  }
  if (!uploadImg.value) {
    ElMessage({
      message: '你还没有上传图片哦',
      type: 'warning',
    })
    return
  }
  //然后开始执行请求
  try {
    const formData = {
      info: {
        filename: uploadImg.value,
        queryNumber: inputNumberValue
      }
    }
    console.log(inputNumberValue)
    const newdata = await origin.doimgUpload(formData);
    //console.log(newdata.like)
    likeThis.value = newdata.like
    tags.value = newdata.tags.map(item => ({
      name: item,
      checked: true
    }))
    list.value = newdata.list.map(item => ({
      name: item.filename,
      isCollected: item.isCollected,
      tags: item.tags
    }))
    console.log(list)
    console.log('数据保存成功')
  } catch (error) {
    console.error('往后端传图片时出错：', error);
  }
  //然后更新页面
  //根据list更新srcList
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
  getans_count()
}
const getans_count = () => {
  ans_count.value = list.value.filter(item => shouldShow(item)).length;
}
onMounted(() => {
  inputNumber.value = 9
  url.value = transformImagePath('/im2.jpg')
  console.log(url.value)
  tags.value = []
  srcList.value = [];
  list.value = []
  ans_count.value = 0
})

</script>

<style scoped>
.choosetags {
  margin-bottom: 20px;
}

.mine-h2 {
  margin-top: 30px;
  margin-bottom: 10px;
}

.contain {
  /* 占位 */
  height: 40px;
}

.withdrawTags {
  margin-top: 0px;
}

.recButton {
  margin-bottom: 40px;
  width: 300px
}

.input_number_class {
  margin: 20px;
}

.color_light {
  background-color: rgb(252, 245, 246);
  min-height: 360px
}



.avatar-uploader {
  width: 400px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  display: flex;
}

.avatar_image {
  width: 360px;
  height: 270px;
}

.custom-like-button {
  color: #b15fe1;
  /* 当喜欢时为这个颜色 */
  /* 可以添加更多样式 */
}

.custom-dislike-button {
  color: black;
  /* 当不喜欢时为这个颜色 */
  /* 可以添加更多样式 */
}

.search {
  margin-top: 50px
}

.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}

.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
<style>
.showtags {
  margin: 10px;
}

.my_header1 {
  padding-top: 10px;
  margin-bottom: 30px;
  font-size: xx-large;
}

.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 80px;
  color: #8c939d;
  width: 360px;
  height: 270px;
  text-align: center;
}

.errorText {
  font-size: 10px;
  color: var(--el-color-error);
  transform: translateY(-15px);
  margin-right: 100px;
  margin-top: 10px;
  white-space: nowrap;
  /* 不自动换行 */
}

.error .el-input {
  --el-input-border-color: var(--el-color-error)
}
</style>