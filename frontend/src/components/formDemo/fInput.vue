<template>
  <div class="input-wrap" :class="{'input-max':option.multiple||option.type==='textarea'}">
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
.input-wrap {
  display: flex;
  width: 200px;
  align-items: center;
  flex-wrap: nowrap;

  &.input-max {
    width: 100%;
  }
}

.el-multi {
  width: 70px;
  margin: 1px;
}
</style>



