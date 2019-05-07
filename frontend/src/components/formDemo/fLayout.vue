<template>
  <div style="width:100%;">
    <!-- <el-row v-for="row in option.rows" :key="row"> -->
    <el-row :gutter="2">
      <el-col :span="spans[index]" v-for="(col, index) in option.cols" :key="col">
        <div class="drag-item">
          <!-- <nested-draggable :tasks="formList[index]"/> -->
          <draggable
            class="dragArea"
            tag="div"
            :list="formList[index]"
            group="component"
            @change="log"
          >
            <f-group
              v-for="(item,i) in formList[index]"
              :key="item.id"
              :option="item"
              @click.stop.native="selectCom(item.id)"
            >
              <div class="fix-icon" v-show="selected === item.id">
                <!-- <i class="el-icon-document-copy" @click="copyCfg(element.id)" title="复制"></i> -->
                <i class="el-icon-delete" @click="deleteCfg(index, i)" title="删除"></i>
              </div>
            </f-group>
          </draggable>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import nestedDraggable from "./nested";
import draggable from "vuedraggable";
import fGroup from "./fgroup.vue";
import { mapState, mapMutations } from "vuex";
import * as types from "@/store/types.js";

export default {
  data() {
    return {
      formList: []
    };
  },
  props: ["option"],
  computed: {
    ...mapState("components", ["selected"]),
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
  methods: {
    ...mapMutations("components", [types.REMOVE_CFG, types.SET_SELECTED]),
    log: function(evt) {
      console.log(evt);
    },
    selectCom(index) {
      this[types.SET_SELECTED](index);
    },
    deleteCfg(index, i) {
      let data = this.formList[index][i];
      this[types.REMOVE_CFG](data.id);

      this.formList[index].splice(i, 1);
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
}
</style>



