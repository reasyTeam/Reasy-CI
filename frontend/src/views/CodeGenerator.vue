<template>
  <div class="h-100">
    <el-row class="h-100">
      <el-col :span="6" class="grid-content bg-purple h-100">
        <div>选择当前的组建库，比如说Vue下面有Element-UI，reasy-team/reasy-ui-vue库可供选择</div>
        <div>组件选择栏</div>
      </el-col>
      <el-col :span="12" class="grid-content bg-purple-light h-100">
        <div>配置内容栏</div>
      </el-col>
      <el-col :span="6" class="grid-content bg-purple h-100">
        <div>属性配置栏</div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.grid-content {
  padding: 12px;
  overflow: auto;
}
.bg-purple-light {
  background-color: $bg-color-mid;
}
</style>

