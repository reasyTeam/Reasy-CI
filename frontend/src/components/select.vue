<template>
  <el-select v-model="val" :multiple="option.multiple" placeholder="请选择" @change="change">
    <el-option
      v-for="(item,index) in option.selectArray"
      :key="item.value + '-' + index"
      :label="item.text"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return { val: this.value };
  },
  props: ["option", "value"],
  methods: {
    change(val) {
      this.$emit("setValue", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>


