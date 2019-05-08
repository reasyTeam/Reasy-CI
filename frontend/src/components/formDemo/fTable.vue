<template>
  <el-table :data="[]" style="width: 100%">
    <el-table-column type="selection" width="30" v-if="option.showCheckbox"></el-table-column>
    <el-table-column type="index" width="30" v-if="option.showIndex"></el-table-column>
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      :prop="item[option.field]"
      :label="item[option.title]"
    ></el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ["option"],
  computed: {
    columns() {
      if (this.option.columns.length > 0) {
        return this.option.columns;
      }
      return [
        {
          [this.option.field]: "示例1",
          [this.option.title]: "示例1"
        },
        {
          [this.option.field]: "示例2",
          [this.option.title]: "示例2"
        },
        {
          [this.option.field]: "示例3",
          [this.option.title]: "示例3"
        }
      ];
    }
  }
};
</script>

