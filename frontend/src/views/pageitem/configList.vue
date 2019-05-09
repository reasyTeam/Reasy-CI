<template>
  <draggable
    class="cfg-list"
    handle=".drag-box"
    :list="formList"
    :group="group"
    @click.stop="selectCom(-1)"
  >
    <div
      class="list-item drag-box"
      v-for="(element,index) in formList"
      :key="element.id"
      :class="selected === element.id ? 'active':''"
      @click.stop="selectCom(element.id)"
    >
      <f-group :option="element">
        <div class="fix-icon" v-show="selected === element.id">
          <i class="el-icon-document-copy" @click="copyCfg(index)" title="复制"></i>
          <i class="el-icon-delete" @click="deleteCfg(index)" title="删除"></i>
        </div>
      </f-group>
    </div>
  </draggable>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import draggable from "vuedraggable";
import fGroup from "@/components/formDemo/fgroup.vue";
import * as types from "@/store/types.js";
import { deepClone } from "@/assets/lib.js";

export default {
  data() {
    return {
      formList: []
    };
  },
  computed: {
    ...mapState("components", ["selected", "idGlobal", "hasReset"])
  },
  props: {
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
    ...mapMutations("components", [
      types.REMOVE_CFG,
      types.ADD_CFG,
      types.SET_SELECTED,
      types.SET_SORT_LIST
    ]),
    selectCom(index) {
      this[types.SET_SELECTED](index);
    },
    deleteCfg(index) {
      let data = this.formList[index];
      this[types.REMOVE_CFG](data.id);

      this.formList.splice(index, 1);
    },
    copyCfg(index) {
      let data = deepClone(this.formList[index]);
      data.id = this.idGlobal;
      this[types.ADD_CFG](data);
      this.formList.push(data);
    },
    saveCfg() {
      let list = this.formList.map(item => item.id);
      this[types.SET_SORT_LIST](list);
    }
  },
  watch: {
    hasReset(val) {
      if (val) {
        this.formList = [];
      }
    }
  }
};
</script>

<style lang="scss" scope>
.cfg-list {
  min-height: 100%;
  padding-top: 2px;
  box-sizing: border-box;
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
    font-size: 16px;
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

