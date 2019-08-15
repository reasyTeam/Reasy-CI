<template>
  <div class="slider-wrapper">
    <el-slider :value="value" disabled></el-slider>
    <el-input v-show="!!option.showInput" :value="value" disabled></el-input>
  </div>
</template>
<script>
export default {
  props: ["option"],
  computed: {
    value() {
      return +this.option.value;
    }
  }
};
</script>
<style lang="scss" scoped>
.slider-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  .el-slider {
    width: 200px;
  }

  .el-input {
    width: 50px;
    margin-left: 12px;
  }
}
</style>

