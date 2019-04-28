<template>
  <el-row class="wrapper">
    <el-col :span="title ? 6:0">
      <div class="f-title">{{title}}</div>
    </el-col>
    <el-col :span="title?18:24">
      <component :is="curComponent"></component>
    </el-col>
  </el-row>
</template>
<script>
import fInput from "./fInput.vue";
import fTable from "./fTable.vue";
import fSelect from "./fSelect";
import fSwitch from "./fSwitch";
import fCheckbox from "./fCheckbox";
import fSlider from "./fSlider";
import fRadio from "./fRadio";
import fDatepicker from "./fDatepicker";
import fLabel from "./fLabel";
import fUpload from "./fUpload";

export default {
  props: ["title", "component"],
  computed: {
    curComponent() {
      return `f-${this.component}`;
    }
  },
  components: {
    fInput,
    fSelect,
    fSwitch,
    fCheckbox,
    fSlider,
    fRadio,
    fDatepicker,
    fLabel,
    fUpload,
    fTable
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .el-input,
  .el-slider {
    width: 200px;
  }
}

.f-title {
  height: 40px;
  line-height: 40px;
}
</style>


