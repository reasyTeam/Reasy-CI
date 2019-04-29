<template>
  <draggable class="cfg-list" :sortable="false" :list="formList" :group="group">
    <div
      class="list-item"
      v-for="element in formList"
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
    ...mapState("components", ["selected", "idGlobal", "hasReset"]),
    idToName() {
      return this.cfgList.reduce((res, item) => {
        res[item.id] = item.name;
        return res;
      }, {});
    }
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
      types.SET_SELECTED
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

