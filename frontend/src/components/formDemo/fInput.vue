<template>
  <el-input type="text" :placeholder="option.title" v-model="option.value" disabled></el-input>
</template>
<script>
export default {
  props: ["option"]
};
</script>


