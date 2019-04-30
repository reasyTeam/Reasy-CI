<template>
  <div>
    <el-input-number
      v-if="isNumber"
      v-model="val"
      @change="change"
      :min="option.min"
      :max="option.max"
    ></el-input-number>
    <el-input :placeholder="option.title" :type="option.type" v-model="val" @change="change" v-else></el-input>
  </div>
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
      required: true
    }
  },
  computed: {
    isNumber() {
      return this.option.valueType === "number";
    }
  },
  methods: {
    change(val) {
      this.$emit("setValue", val);
    }
  }
};
</script>

