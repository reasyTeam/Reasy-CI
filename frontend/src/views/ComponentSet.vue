<template>
  <div class="table-box">
    <framework></framework>
    <group-item></group-item>
  </div>
</template>

<script>
import GroupItem from "./pageitem/Group.vue";
import Framework from "./pageitem/Framework.vue";

export default {
  components: {
    GroupItem,
    Framework
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  border-radius: 4px;
  padding: 12px;
  max-width: 1200px;
  margin: 20px auto 0;
}

.table-box {
  background-color: $bg-color-light;
}
</style>
