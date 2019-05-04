<template>
  <el-checkbox-group v-model="option.value" disabled>
    <el-checkbox :label="item" v-for="item in option.selectArray" :key="item">{{item}}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  props: ["option"]
};
</script>


