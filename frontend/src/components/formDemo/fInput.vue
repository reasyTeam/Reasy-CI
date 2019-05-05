<template>
  <div class="wrapper">
    <template v-if="option.multiple">
      <label v-if="option.text">{{option.text}}</label>
      <template v-for="index in option.inputCount">
        <template v-if="index !== 1 || option.text">.</template>
        <el-input class="el-multi" :key="index" type="text" disabled></el-input>
      </template>
    </template>
    <template v-else>
      <el-input
        :type="option.type"
        :rows="option.rows"
        :placeholder="option.title"
        v-model="option.value"
        disabled
      >.</el-input>
    </template>
  </div>
</template>
<script>
export default {
  props: ["option"]
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: nowrap;
}

.el-multi {
  width: 70px;
  margin: 1px;
}
</style>



