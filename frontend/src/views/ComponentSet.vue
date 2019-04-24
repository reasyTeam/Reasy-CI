<template>
  <div class="table-box">
    <framework></framework>
    <group-item></group-item>
    <component-list></component-list>
  </div>
</template>

<script>
import GroupItem from "./pageitem/Group.vue";
import Framework from "./pageitem/Framework.vue";
import ComponentList from "./pageitem/components.vue";

export default {
  components: {
    GroupItem,
    Framework,
    ComponentList
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  border-radius: 4px;
  padding: 12px;
  max-width: 1200px;
  margin: 0 auto;
}

.table-box {
  background-color: $bg-color-light;
}
</style>
