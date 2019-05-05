<template>
  <el-upload action="tt" disabled class="upload-wrapper">
    <el-button size="small" type="primary" v-show="option.browseText">{{option.browseText}}</el-button>
    <el-button
      style="margin-left: 10px;"
      size="small"
      type="success"
      :v-show="option.uploadText"
    >{{option.uploadText}}</el-button>
    <div :v-show="option.showFileList">文件上传列表</div>
  </el-upload>
</template>
<script>
export default {
  props: ["option"]
};
</script>

<style scoped>
.upload-wrapper .el-upload {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>


