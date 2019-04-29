<template>
  <div>
    <el-input-number
      v-if="isnumber"
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
    },
    isnumber: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change(val) {
      this.$emit("setValue", val);
    }
  }
};
</script>

