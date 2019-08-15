<template>
  <draggable class="dragArea" tag="ul" :list="tasks" group="component"></draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: ["tasks"],
  components: {
    draggable
  },
  name: "nested-draggable"
};
</script>
<style scoped>
.dragArea {
  height: 100%;
  border: 1px dashed;
}
</style>