<template>
  <div style="width:100%;">
    <label v-if="option.title">{{option.title}}</label>
    <el-row :gutter="2">
      <el-col :span="spans[index]" v-for="(col, index) in (option.cols||1)" :key="col">
        <div class="drag-item">
          <draggable class="dragArea" tag="div" :list="formList[index]" group="component">
            <template v-if="!formList[index] || formList[index].length === 0">
              <div class="drag-text">将组件拖拽至此区域</div>
            </template>
            <template v-else>
              <div
                v-for="(item,i) in formList[index]"
                :key="item.id"
                :class="{active: (selected === item.id)}"
                class="col-box"
                @click.stop="selectCom(item.id)"
              >
                <template v-if="item.noTitle">
                  <f-group :option="item"></f-group>
                </template>
                <template v-else>
                  <label class="col-title">{{item.name+'/'+item.attrs[item.showOption.title]}}</label>
                </template>
                <div class="fix-icon" v-show="selected === item.id">
                  <i class="el-icon-close" @click="deleteCfg(index, i)" title="删除"></i>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import nestedDraggable from "./nested";
import draggable from "vuedraggable";
import { mapState, mapGetters, mapMutations } from "vuex";
import * as types from "@/store/types.js";
import fGroup from "./fgroup.vue";
import { deepClone } from "@/assets/lib.js";

export default {
  data() {
    return {
      formList: []
    };
  },
  props: ["option"],
  computed: {
    ...mapState("components", ["selected"]),
    ...mapGetters("components", ["curPageCfg"]),
    spans() {
      let cols = this.option.cols,
        t = Math.floor(24 / cols),
        sum = 24,
        res = [];

      for (let i = 1, l = cols; i <= l; i++) {
        if (i === l) {
          res.push(sum - t * (l - 1));
        } else {
          res.push(t);
        }
      }

      if (cols > this.formList.length) {
        while (this.formList.length < cols) {
          this.formList.push([]);
        }
      } else {
        while (this.formList.length > cols) {
          this.formList.pop();
        }
      }
      return res;
    }
  },
  components: {
    // nestedDraggable,
    draggable,
    fGroup
  },
  watch: {
    formList(newVal) {
      let list = newVal.map(item => item.map(t => t.id));

      this[types.UPDATE_CFG_ATTR]({
        id: this.option.id,
        attr: this.option.showOption.formList,
        value: list
      });
    }
  },
  methods: {
    ...mapMutations("components", [
      types.REMOVE_CFG,
      types.SET_SELECTED,
      types.UPDATE_CFG_ATTR
    ]),
    selectCom(index) {
      this[types.SET_SELECTED](index);
    },
    deleteCfg(index, i) {
      let data = this.formList[index][i];
      this[types.REMOVE_CFG](data.id);

      // 删除当前选中的组件，重置selected
      if (data.id === this.selected) {
        this[types.SET_SELECTED](-1);
      }

      this.formList[index].splice(i, 1);
    },
    getFormList() {
      // 好像不需要在这设置
      // function check(cfg){
      //   while(cfg.isContainer){
      //     let data = cfg.attrs[cfg.showOption.formList];
      //   }
      // }
    }
  },
  created() {
    let formList = this.option.formList;
    if (formList && formList.length > 0) {
      let list = [];
      formList.forEach(index => {
        let { cfgList } = this.curPageCfg;
        let itemCfg = deepClone(cfgList[index]);
        list.push(itemCfg);
      });
      this.formList = list;
    }
  }
};
</script>

<style lang="scss" scoped>
.drag-item {
  background-color: $bg-color-light;
  position: relative;
}

.active .drag-item {
  background-color: #fff;
}
.dragArea {
  min-height: 60px;
  border: 1px dashed;
  box-sizing: border-box;
  padding: 5px;
}

.col-box {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  position: relative;

  .col-title {
    width: 100%;
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &.active .col-title {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
  .fix-icon {
    position: absolute;
    left: 0px;
    right: auto;
    bottom: auto;
    width: 16px;
    height: 16px;
    text-align: center;
    top: 7px;
    background-color: red;
    border-radius: 50%;
    color: #fff;
    transform: translateY(-50%);

    i {
      color: #fff;
      padding: 0;
      font-size: 12px;
    }
  }
}

.drag-text {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  height: 50px;
}
</style>



