<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="复选框 A"></el-checkbox>
    <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  props: ["checkList"]
};
</script>


