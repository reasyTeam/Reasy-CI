<template>
  <div>
    <div class="arr-item">
      <label class="arr-label">配置项类型：</label>
      <el-select v-model="type" class="arr-select">
        <el-option v-for="(text, key) in valueType" :label="text" :value="key" :key="key"></el-option>
      </el-select>
    </div>
    <div v-if="list.length === 0">
      <div class="arr-item">
        <el-input value="请点击添加按钮进行添加" disabled style="flex:1;"></el-input>
        <i class="el-icon-plus arr-icon" title="添加" @click="add"></i>
      </div>
    </div>
    <draggable v-else :list="list" handle=".el-icon-rank" @end="setValue">
      <template v-if="type === 1">
        <div v-for="(item, index) in list" :key="index" class="arr-item">
          <input
            :value="item"
            @change="change(index, $event)"
            class="arr-input"
            placeholder="请输入选项"
          >
          <i class="el-icon-rank arr-icon" title="移动"></i>
          <i class="el-icon-plus arr-icon" title="添加" @click="add"></i>
          <i class="el-icon-minus arr-icon" title="删除" @click="remove(index)"></i>
        </div>
      </template>
      <template v-else>
        <div v-for="(item, index) in list" :key="index" class="arr-item">
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
          <i class="el-icon-rank arr-icon" title="移动"></i>
          <i class="el-icon-plus arr-icon" title="添加" @click="add"></i>
          <i class="el-icon-minus arr-icon" title="删除" @click="remove(index)"></i>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  data() {
    return {
      list: this.value || [],
      ptype: 1,
      valueType: {
        1: "枚举",
        2: "键值对",
        3: "属性配置框"
      }
    };
  },
  props: {
    option: {
      required: true,
      type: Object
    },
    value: {
      required: true
    }
  },
  computed: {
    type: {
      get() {
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
    }
  },
  components: {
    draggable
  },
  methods: {
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
      let text = `选项${this.list.length + 1}`;
      text = this.type === 1 ? text : { [text]: text };
      this.list.push(text);
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
