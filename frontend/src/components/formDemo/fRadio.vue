<template>
  <el-radio-group v-model="option.value" disabled>
    <template v-if="option.isButton">
      <el-radio-button :label="item" v-for="item in option.selectArray" :key="item"></el-radio-button>
    </template>
    <template v-else>
      <el-radio :label="item" v-for="item in option.selectArray" :key="item"></el-radio>
    </template>
  </el-radio-group>
</template>
<script>
export default {
  props: ["option"]
};
</script>


