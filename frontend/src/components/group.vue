<template>
  <section class="cfg-item">
    <div class="cfg-title">{{option.title}}</div>
    <div>
      <component
        :is="components[option.valueType]"
        :value="value"
        :option="option"
        @setValue="setValue"
      ></component>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import finput from "./input.vue";
import fswitch from "./switch.vue";
import fselect from "./select.vue";
import farray from "./array.vue";
import fcode from "./code.vue";

const components = {
  input: "finput",
  enum: "fselect",
  number: "finput",
  string: "finput",
  bool: "fswitch",
  regexp: "finput",
  function: "fcode",
  array: "farray",
  object: "fcode",
  sync: "fcode"
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
  props: {
    attr: {
      required: true
    },
    option: {
      required: true
    },
    value: {
      default: ""
    }
  },
  methods: {
    setValue(val) {
      this.$emit("setValue", this.attr, val);
    }
  },
  components: {
    finput,
    fswitch,
    fselect,
    fcode,
    farray
  }
};
</script>
<style scoped lang="scss">
.cfg-item {
  border-bottom: 1px solid $border-color;
  margin-bottom: 8px;
  padding-bottom: 16px;
}

.cfg-title {
  font-weight: bold;
  font-size: 12px;
  padding: 8px 0;
  color: #333;
}
</style>


