<template>
  <h1>home page</h1>
  <h2>{{ todisplay }}</h2>
  <h3>{{ topost }}</h3>
  <div class="upload">
    <!-- 实际上，这里只需要获取图片的name就行啦 -->
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleTest"
    >
      <img v-if="imageUrl" :src="imageUrl" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
  <div class="search">
    <!-- 用户可以输入数字，决定搜索多少张图片 -->
    <el-form-item label="搜索数量" v-bind:class="{ error: isError }">
              <el-input v-model="inputNumber" @click="clearErrorBorder" type="number" step="1" min="0"/>
          <div class="errorText">{{ errorMsg }}</div>
            </el-form-item>
    <!-- 做一个搜索框 -->
    <el-input v-model="input" style="width: 240px" placeholder="Please input" clearable :suffix-icon="Search" />
    <!-- 加一个按钮可以撤回对标签的修改 -->
    <el-tooltip content="撤销修改" effect="customized" class="box-item" placement="right">
      <el-button :icon="RefreshLeft" circle @click="withdrawTags"/>
    </el-tooltip>
    <!-- 做一些标签，可以选择是否删掉 -->
    <el-check-tag v-for="(tag, index) in tags" :key="index" :checked="tag.checked" @change="onChange(tag)" type="warning"
      :disable-transitions="false" effect="dark">
      {{ tag.name }}
    </el-check-tag>
  </div>
  <!-- 加一个按钮，可以只看喜欢 -->
  <el-button @click="onSubmit"> 搜索</el-button>
  <el-button @click="onlyLike" :class="{ 'custom-like-button': like, 'custom-dislike-button': !like }"  
      > 只看喜欢</el-button>
  <el-button> 换图片</el-button>
  <el-button> 筛选</el-button>
  <img style="width: 100px; height: 100px" :src="url2" />
  <!-- 显示当前结果数量 -->
  <div>
    当前结果数量：{{ ans_count }}
  </div>
  <!-- 构建一个有9张图的图片墙 -->
  <!-- 做一个卡片，它包括image，button -->
  <div v-for="(item, index) in list" :key="index" v-show="tagInList(item)">
    <el-card  style="max-width: 480px" shadow="hover" 
    v-show="!like ||item.isCollected">
      <!-- 它还有一个标题 -->
      <template #header>{{item.name}}</template>
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
      <el-tag type="warning" v-for="(tag,index) in item.tags"  :key="index" >{{ tag }}</el-tag>
    </el-card>
    </div>
</template>
<script setup>

import origin from '@/apis/origin'
import { ref, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
const ans_count=ref(0)
const imageUrl = ref('')
const inputNumber = ref(9)
const isError = ref(false)
const errorMsg = ref('')
const tagInList = (item) => {
  return tags.value.some(a => a.checked && item.tags.includes(a.name));
}
const withdrawTags = () => {
  console.log('撤销')
  tags.value.forEach(item => {
    item.checked = true;
  }
)
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
const list = ref([
  {
    id: 3,
    name: 'im3.jpg',
    isCollected: true,
    tags: ['tag1', 'tag2', 'tag3']
  },
  {
    id: 4,
    name: 'im4.jpg',
    isCollected: false,
    tags: ['tag2', 'tag4']
  },
  {
    id: 5,
    name: 'im5.jpg',
    isCollected: false,
    tags: ['tag2', 'tag1']
  },
  // ... 可以继续添加更多项  
]);
const like = ref(false)
const onlyLike = () => {
  like.value = !like.value
  console.log(like.value)
  getans_count()
}
const likelist = ref([])//只存name
const url2= new URL('@/assets/dataset/im2.jpg', import.meta.url).href
const input = ref()
const todisplay = ref()
const topost = ref()
const url = ref()
const handleLike = (item) => {
  item.isCollected = !item.isCollected

}
const handleTest = (newFile) => {
  console.log(newFile.name)
  let new_url = new URL(transformImagePath(newFile.name), import.meta.url).href
  console.log(new_url)
  console.log(url2)
  imageUrl.value = new_url
}
const tags = ref([])
const forever_tags=ref([])
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
const handleClose = (index) => {
  tags.value.splice(index, 1);
}
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
const handleFileChange = async (newFile) => {
  try {
    const formData = new FormData(); // 创建一个新的 FormData 实例  
    formData.append('file', newFile); // 添加文件到 FormData，键名为 'file'
    await origin.doimgUpload(formData);
    console.log('数据保存成功')
  } catch (error) {
    console.error('往后端传图片时出错：', error);
  }
}
//写一个函数用来把路径转成本地地址
function transformImagePath(path) {
  // 提取文件名（即最后一个 '/' 之后的部分）  
  const fileName = path.split('/').pop();
  // 构造新路径，使用 '@/dataset/' 作为前缀并接上文件名  
  return `../assets/dataset/${fileName}`;
}
const onSubmit = () => {
  errorMsg.value = "";
  isError.value = false;
  let inputNumberValue = parseInt(inputNumber.value, 10);
  if (isNaN(inputNumberValue) || inputNumberValue < 1 || inputNumberValue > 30) {
    errorMsg.value = "请输入范围在1到30的整数";
    isError.value = true
    return
  }
  likelist.value = [];
  //在开始请求前，要把当前的like信息传回去
  list.value.forEach(item => {
    if (item.isCollected == true)
      likelist.value.push(item.name)
  });
  console.log(likelist)
  //然后开始执行请求
  //然后更新页面
  //根据list更新srcList
  // 清空 srcList  
  srcList.value = [];
  // 遍历 list 中的每个对象  
  list.value.forEach(item => {
    // 使用 item.name 调用 transformImagePath 并创建一个新的 URL 对象  
    const url = new URL(transformImagePath(item.name), import.meta.url);
    // 将新 URL 的 href 添加到 srcList 中  
    srcList.value.push(url.href);
  });
}
const getans_count = () => {
  ans_count.value= list.value.filter(item => shouldShow(item)).length;
}
onMounted(async () => {
  inputNumber.value=9
  url.value = transformImagePath('/im2.jpg')
  console.log(url.value)
  tags.value = [
    {
      name: 'tag1',
      checked:true
    },
    {
      name: 'tag2',
      checked: true
    }
  ]
  srcList.value = [];
  // 遍历 list 中的每个对象  
  list.value.forEach(item => {
    // 使用 item.name 调用 transformImagePath 并创建一个新的 URL 对象  
    const url = new URL(transformImagePath(item.name), import.meta.url);
    // 将新 URL 的 href 添加到 srcList 中  
    srcList.value.push(url.href);
  });
  getans_count()
})

</script>

<style scoped>
.custom-like-button {  
  color: #b15fe1; /* 当喜欢时为这个颜色 */  
  /* 可以添加更多样式 */  
}  
  
.custom-dislike-button {  
  color: black; /* 当不喜欢时为这个颜色 */  
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
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.errorText{
    font-size: 10px;
    height: 0;
    width: 100%;
    color: var(--el-color-error);
    transform: translateY(-15px);
}

.error .el-input{
    --el-input-border-color:var(--el-color-error)
}
</style>