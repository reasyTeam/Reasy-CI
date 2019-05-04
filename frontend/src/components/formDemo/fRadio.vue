<template>
  <el-radio-group v-model="option.value" disabled>
    <el-radio :label="item" v-for="item in option.selectArray" :key="item">备选项</el-radio>
  </el-radio-group>
</template>
<script>
export default {
  props: ["option"]
};
</script>


