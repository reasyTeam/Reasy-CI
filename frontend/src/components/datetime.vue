<template>
  <el-date-picker v-model="val" align="right" type="date" placeholder="选择日期"></el-date-picker>
</template>

<script>
export default {
  props: {
    option: {
      required: true,
      type: Object
    },
    value: {
      required: true
    }
  },
  computed: {
    val: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        this.$emit("setValue", newValue);
      }
    }
  }
};
</script>

