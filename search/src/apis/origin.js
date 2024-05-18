export default {
  // 创建一个函数
  async testPost(postData) {
    try {
      const response = await fetch("/api/testPost", {
        method: "POST",
        body: postData,
        mode: "cors"
      });
    
    const data = await response.json();
      console.log("后端响应:", data);
      return data;
    }
    catch (error) {
      throw error;
    }
  },
  async doimgUpload(UploadData) {
    try {
      const response = await fetch("/api/imgUpload", {
        method: "POST",
        body: UploadData,
        mode: "cors",
      });
     if (!response.ok) {
       throw new Error("网络请求错误");
     }
     if (response.redirected) {
       // 处理重定向
       console.log("发生重定向，重定向地址:", response.url);
     } else {
       const data = await response.json();
       console.log("后端响应:", data);
       return data;
     }
    } catch (error) {
      throw error;
    }
  },
};
