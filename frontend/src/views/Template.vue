<template>
  <div class="h-100 wrapper">
    <div class="config-aside h-100">
      <div class="pro-title">模块列表</div>
    </div>
    <div class="config-main h-100"></div>
    <div class="config-aside right h-100"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
}
.config-aside {
  width: 250px;
  overflow: auto;

  &.right {
    width: 300px;
  }
}
</style>
