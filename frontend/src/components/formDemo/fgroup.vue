<template>
  <el-row class="wrapper">
    <template v-if="option.noTitle">
      <component :is="curComponent" :option="propData"></component>
    </template>
    <template v-else>
      <el-col :span="propData.title ? 6 : 0">
        <div class="f-title">{{propData.title}}</div>
      </el-col>
      <el-col :span="propData.title ? 18 : 24">
        <component :is="curComponent" :option="propData"></component>
      </el-col>
    </template>
    <slot></slot>
  </el-row>
</template>
<script>
import fInput from "./fInput.vue";
import fTable from "./fTable.vue";
import fSelect from "./fSelect.vue";
import fSwitch from "./fSwitch.vue";
import fCheckbox from "./fCheckbox.vue";
import fSlider from "./fSlider.vue";
import fRadio from "./fRadio.vue";
import fDatetime from "./fDatetime.vue";
import fLabel from "./fLabel.vue";
import fUpload from "./fUpload.vue";
import fTitle from "./fTitle.vue";
// import fLayout from "./fLayout.vue";

export default {
  props: ["option"],
  computed: {
    curComponent() {
      return `f-${this.option.showType}`;
    },
    propData() {
      let obj = {};
      for (let key in this.option.showOption) {
        let val = this.option.attrs[this.option.showOption[key]];
        obj[key] =
          val === null || val === undefined ? this.option.showOption[key] : val;
      }
      return obj;
    }
  },
  components: {
    fInput,
    fSelect,
    fSwitch,
    fCheckbox,
    fSlider,
    fRadio,
    fDatetime,
    fLabel,
    fUpload,
    fTitle,
    fLayout: () => import("./fLayout.vue"),
    fTable
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;

  .el-input,
  .el-select,
  .el-slider {
    width: 200px;
  }
}

.f-title {
  display: flex;
  line-height: 20px;
}
</style>


