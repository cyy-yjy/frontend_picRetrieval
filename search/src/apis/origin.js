export default {
  // 创建一个函数
  async doimgUpload(UploadData) {
    try {
      const response = await fetch("/api/imgUpload", {
        method: "POST",
        body: UploadData,
        mode: "cors",
      });
      console.log("后端响应:", response);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
