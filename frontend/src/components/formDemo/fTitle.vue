<template>
  <h3 :class="['h-header', {border: option.hasBorder}]">{{option.title}}</h3>
</template>
<script>
export default {
  props: ["option"]
};
</script>

<style lang="scss" scoped>
.h-header {
  font-size: 20px;
  // margin: 15px 0 10px;
  margin: 0;
  height: 24px;
  padding-bottom: 10px;
  font-weight: 400;
  color: #1f2f3d;
  width: 100%;
  border: 1px solid transparent;

  &.border {
    border-bottom-color: $border-color;
  }
}
</style>


