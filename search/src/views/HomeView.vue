<template>
  <h1>home page</h1>
  <h2>{{ todisplay }}</h2>
  <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
      @change="handleFileChange"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
</template>
<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import origin from '@/apis/origin'
import { ref, onMounted } from 'vue'
const todisplay = ref()
const files = ref()
// files是数组
const getTestData = async () => {
  try {
    const response = await fetch('/api/test');
    const responseData = await response.json();
    todisplay.value = responseData.msg
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const handleFileChange = async (newFile) => {
  files.append('file',newFile)
  await uploadImage();
}
const uploadImage= async () => {
  try {
    await origin.doimgUpload({
      files:files.value
    });
    console.log('数据保存成功');
  } catch (error) {
    console.error('往后端传图片时出错：', error);
  }
};
onMounted(async () => {
  await getTestData()
})

</script>