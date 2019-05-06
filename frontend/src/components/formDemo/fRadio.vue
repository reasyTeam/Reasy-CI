<template>
  <el-radio-group v-model="option.value" disabled>
    <template v-if="option.isButton">
      <el-radio-button :label="item.text" v-for="(item, index) in selectArray" :key="index"></el-radio-button>
    </template>
    <template v-else>
      <el-radio :label="item.text" v-for="(item, index) in selectArray" :key="index"></el-radio>
    </template>
  </el-radio-group>
</template>
<script>
export default {
  props: ["option"],
  computed: {
    selectArray() {
      if (this.option.selectArray && this.option.selectArray.length > 0) {
        let res = [];
        this.option.selectArray.forEach(item => {
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
        return res;
      }
      return [
        {
          text: "示例1",
          value: 1
        },
        {
          text: "示例2",
          value: 2
        },
        {
          text: "示例3",
          value: 3
        }
      ];
    }
  }
};
</script>


