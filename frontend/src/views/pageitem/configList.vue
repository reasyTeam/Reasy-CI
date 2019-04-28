<template>
  <draggable class="cfg-list" :sortable="false" :list="cfgList" :group="group">
    <div
      class="list-item"
      v-for="element in cfgList"
      :key="element.id"
      :class="selected === element.id ? 'active':''"
      @click.stop="selectCom(element.id)"
    >
      <f-group :title="element.title" :component="element.type">
        <div class="fix-icon" v-show="selected === element.id">
          <i class="el-icon-document-copy" @click="deleteCfg(element.id)" title="复制"></i>
          <i class="el-icon-delete" @click="copyCfg(element.id)" title="删除"></i>
        </div>
      </f-group>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import fGroup from "../../components/formDemo/fgroup.vue";

let idGlobal = 0;
export default {
  data() {
    return {
      attrList: [],
      selected: -1
    };
  },
  computed: {
    idToName() {
      return this.cfgList.reduce((res, item) => {
        res[item.id] = item.name;
        return res;
      }, {});
    }
  },
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
    draggable,
    fGroup
  },
  methods: {
    selectCom(index) {
      this.selected = index;
    },
    deleteCfg() {},
    copyCfg() {}
  }
};
</script>

<style lang="scss" scope>
.cfg-list {
  min-height: 100%;
}

.list-item {
  padding: 16px;
  border-left: 5px solid transparent;

  &:hover {
    background-color: $bg-color-mid;
  }

  &.active {
    background-color: $bg-color-light;
    border-color: $bg-color-main;
  }
}

.fix-icon {
  position: absolute;
  bottom: -16px;
  right: -13px;
  z-index: 1;

  i {
    cursor: pointer;
    padding: 1px 3px;
  }

  .el-icon-document-copy {
    color: $main-color;
  }

  .el-icon-delete {
    color: red;
  }
}
</style>

