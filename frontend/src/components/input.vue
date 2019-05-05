<template>
  <div>
    <el-input-number v-if="isNumber" v-model="val" :min="option.min" :max="option.max"></el-input-number>
    <el-input :placeholder="option.title" :type="option.type" v-model="val" v-else></el-input>
  </div>
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
    },
    isNumber() {
      return this.option.valueType === "number";
    }
  }
};
</script>

