<template>
  <el-date-picker :value="option.value" disabled></el-date-picker>
</template>

<script>
export default {
  props: ["option"]
};
</script>

<style lang="scss" scoped>
.el-date-editor.el-input {
  width: 100%;
}
</style>