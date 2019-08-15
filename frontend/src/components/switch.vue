<template>
  <el-switch v-model="val" active-text="是" inactive-text="否" @change="change"></el-switch>
</template>

<script>
export default {
  data() {
    return { val: this.value };
  },
  props: {
    option: {
      required: true,
      type: Object
    },
    value: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    change(val) {
      this.$emit("setValue", val);
    }
  }
};
</script>

