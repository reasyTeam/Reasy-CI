<template>
  <section class="cfg-item">
    <div class="cfg-title">{{attr.title}}</div>
    <div>
      <component
        :is="components[attr.valueType]"
        :value="value"
        :option="attr"
        @setValue="setValue"
      ></component>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import finput from "./input.vue";

const components = {
  input: "finput",
  //   enum: "fselect",
  //   number: "finput-number",
  //   string: "finput",
  //   bool: "fswitch",
  enum: "finput",
  number: "finput",
  string: "finput",
  bool: "finput",
  regexp: "finput",
  function: "finput",
  array: "finput",
  object: "finput",
  sync: "finput"
};
// function：待定，代码编辑器
// array：提供可添加的组件
// sync：查找对应的字段的值
// object: 提供object输入项

export default {
  data() {
    return {
      components
    };
  },
  //   model: {
  //     prop: "value",
  //     event: "setValue"
  //   },
  props: {
    attr: {
      required: true
    },
    value: {
      default: ""
    }
  },
  methods: {
    setValue(val) {
      this.$emit("setValue", val);
    }
  },
  components: {
    finput
  }
};
</script>
<style scoped lang="scss">
.cfg-item {
  border-bottom: 1px solid $border-color;
  margin-bottom: 8px;
  padding-bottom: 8px;
}

.cfg-title {
  font-weight: bold;
  font-size: 12px;
  padding: 8px 0;
  color: #333;
}
</style>


