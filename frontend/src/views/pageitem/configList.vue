<template>
  <draggable class="cfg-list" :sortable="false" :list="cfgList" :group="group">
    <div class="list-item" v-for="element in cfgList" :key="element.id">{{ element.title }}</div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

let idGlobal = 0;
export default {
  props: {
    cfgList: {
      type: Array,
      default: [],
      required: true
    },
    group: {
      type: String,
      required: true
    }
  },
  components: {
    draggable
  }
};
</script>

<style lang="scss" scope>
.cfg-list {
  min-height: 100%;
}

.list-item {
  padding: 5px 10px 10px;
  border-left: 5px solid transparent;

  &:hover {
    background-color: $bg-color-light;
  }

  &.active {
    background-color: $bg-color-mid;
    border-color: $main-color;
  }
}
</style>

