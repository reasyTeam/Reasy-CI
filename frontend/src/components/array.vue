<template>
  <div>
    <div class="arr-item" v-if="type != 3">
      <label class="arr-label">配置项类型：</label>
      <el-select v-model="type" class="arr-select">
        <el-option label="枚举" :value="1"></el-option>
        <el-option label="健值对" :value="2"></el-option>
      </el-select>
    </div>
    <div v-if="list.length === 0">
      <div class="arr-item">
        <el-button @click="add" plain type="primary" icon="el-icon-plus" style="flex:1;">请点击添加</el-button>
        <i class="el-icon-plus arr-icon" title="添加" @click="add"></i>
      </div>
    </div>
    <draggable v-else :list="list" handle=".el-icon-rank" @end="setValue">
      <div v-for="(item, index) in list" :key="index" class="arr-item">
        <template v-if="type === 1">
          <input
            :value="item"
            @change="change(index, $event)"
            class="arr-input"
            placeholder="请输入选项"
          >
        </template>
        <template v-else-if="type === 2">
          <div class="arr-wrap" v-for="(value, key) in item" :key="key">
            value:
            <input
              :value="key"
              @change="change(index, $event)"
              class="obj-input arr-input"
              placeholder="value"
            >
            text:
            <input
              :value="value"
              @change="change(index, $event, key)"
              class="obj-input arr-input"
              placeholder="text"
            >
          </div>
        </template>
        <template v-else-if="type === 3">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            class="codebtn"
            @click="showDialog(index)"
            style="flex:1"
          >{{item[option.showOption.title]}}</el-button>
        </template>
        <i class="el-icon-rank arr-icon" title="移动"></i>
        <i class="el-icon-plus arr-icon" title="添加" @click="add"></i>
        <i class="el-icon-minus arr-icon" title="删除" @click="remove(index)"></i>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { deepClone } from "@/assets/lib.js";
import { mapState, mapMutations } from "vuex";
import * as types from "@/store/types.js";

export default {
  data() {
    return {
      list: this.value || [],
      ptype: 1,
      valueType: {
        1: "枚举",
        2: "键值对",
        3: "属性配置框" //包含itemCfg属性则直接显示该模式
      },
      columnIndex: -1
    };
  },
  props: {
    option: {
      required: true,
      type: Object
    },
    value: {
      required: true
    },
    attr: {
      required: true
    }
  },
  computed: {
    ...mapState("components/itemConfig", ""),
    type: {
      get() {
        if (this.option.itemCfg) {
          return 3;
        }
        if (this.list.length > 0) {
          return typeof this.list[0] === "object" ? 2 : 1;
        }
        return this.ptype;
      },
      set(val) {
        this.ptype = val;
        // 切换value的值
        this.list = this.list.map(item => {
          if (typeof item !== "object") {
            return this.ptype === 1 ? item : { [item]: item };
          } else {
            return this.ptype === 1 ? Object.keys(item)[0] : item;
          }
        });
      }
    },
    itemObj() {
      if (this.option.itemCfg) {
        let data = {},
          itemCfg = this.option.itemCfg;

        for (let key in itemCfg) {
          data[key] = itemCfg[key]["defaultValue"];
        }
        return data;
      }
      return {};
    }
  },
  components: {
    draggable
  },
  methods: {
    ...mapMutations("components/itemConfig", [
      types.SET_DIALOG_VISIBLE,
      types.SET_ITEM_INDEX,
      types.SET_CFG_ATTR
    ]),
    showDialog(index) {
      this[types.SET_CFG_ATTR](this.attr);
      this[types.SET_ITEM_INDEX](index);
      this[types.SET_DIALOG_VISIBLE](true);
    },
    remove(index) {
      if (this.list.length === 1) {
        this.$message({
          type: "warning",
          message: "至少保留一项"
        });
        return;
      }
      this.list.splice(index, 1);
      this.setValue();
    },

    add() {
      let data;
      if (this.type === 3) {
        data = deepClone(this.itemObj);
        data[this.option.showOption.title] = `列${this.list.length + 1}`;
      } else if (this.type === 2) {
        let text = `选项${this.list.length + 1}`;
        data = { [text]: text };
      } else {
        data = `选项${this.list.length + 1}`;
      }

      this.list.push(data);
      this.setValue();
    },

    setValue() {
      this.$emit("setValue", this.list);
    },

    change(index, event, key) {
      if (this.type === 1) {
        this.list.splice(index, 1, event.target.value);
      } else {
        if (key) {
          this.list[index][key] = event.target.value;
        } else {
          let tar = {
            [event.target.value]: Object.values(this.list[index])[0]
          };
          this.list.splice(index, 1, tar);
        }
      }
      this.setValue();
    },
    setConfig() {
      this.setValue();
    }
  }
};
</script>

<style lang="scss" scoped>
.arr-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;

  .arr-label {
    flex: 1;
    text-align: left;
  }

  .arr-select {
    width: 150px;
  }

  .arr-wrap {
    flex: 1;
  }

  .arr-input {
    flex: 1;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;

    &:focus {
      border-color: #409eff;
      outline: 0;
    }

    &.obj-input {
      padding: 6px;
      width: 70px;
    }
  }

  .arr-icon {
    font-size: 16px;
    padding: 6px 2px;
    cursor: pointer;
    font-weight: bold;
  }

  .el-icon-rank {
    cursor: move;
    color: $font-main-color;
  }

  .el-icon-minus {
    color: red;
  }

  .el-icon-plus {
    color: $font-main-color;
  }
}
</style>
