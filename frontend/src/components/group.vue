<template>
  <section class="cfg-item" :class="{nowrap: nowrap}" v-if="!option.hidden">
    <div class="cfg-title">{{option.title}}</div>
    <div>
      <component
        :is="components[option.valueType]"
        :value="value"
        :attr="attr"
        :option="pOption"
        @setValue="setValue"
      ></component>
    </div>
  </section>
</template>

<script>
// import { mapState } from "vuex";
import finput from "./input.vue";
import fswitch from "./switch.vue";
import fselect from "./select.vue";
import farray from "./array.vue";
import fcode from "./code.vue";
import fdatetime from "./datetime.vue";

const components = {
  input: "finput",
  enum: "fselect",
  number: "finput",
  string: "finput",
  bool: "fswitch",
  regexp: "finput",
  function: "fcode",
  array: "farray",
  datetime: "fdatetime",
  object: "fcode",
  code: "fcode"
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
    currentCfg: {
      required: true
    },
    attr: {
      required: true
    },
    option: {
      required: true
    },
    value: {
      default: ""
    },
    nowrap: {
      default: false,
      required: false
    }
  },
  computed: {
    pOption() {
      if (
        this.option.valueType === "enum" &&
        typeof this.option.selectArray === "string"
      ) {
        // 修改成{text: '', value: ''}
        let arr = this.currentCfg[this.option.selectArray] || [],
          res = [];
        arr.forEach(item => {
          if (typeof item === "object") {
            for (let key in item) {
              res.push({
                text: item[key],
                value: key
              });
              return;
            }
          } else {
            res.push({
              text: item,
              value: item
            });
          }
        });
        return {
          selectArray: res,
          multiple: this.option.multiple
        };
      }
      return this.option;
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
    farray,
    fdatetime
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

.nowrap {
  display: flex;
  .cfg-title {
    width: 40%;
  }

  .cfg-item {
    flex: 1;
  }
}
</style>


