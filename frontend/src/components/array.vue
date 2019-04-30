<template>
  <div>
    <div class="arr-item" v-if="list.length === 0">
      <el-input value="请点击添加按钮进行添加" disabled style="flex:1;"></el-input>
      <i class="el-icon-plus arr-icon" title="添加" @click="add"></i>
    </div>
    <draggable v-else :list="list" handle=".el-icon-rank" @end="setValue">
      <div v-for="(item, index) in list" :key="index" class="arr-item">
        <input :value="item" @change="change(index, $event)" class="arr-input">
        <i class="el-icon-rank arr-icon" title="移动"></i>
        <i class="el-icon-plus arr-icon" title="添加" @click="add"></i>
        <i class="el-icon-minus arr-icon" title="删除" @click="remove(index)"></i>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  data() {
    return {
      list: this.value || []
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
      this.list.push(`选项${this.list.length + 1}`);
      this.setValue();
    },
    setValue() {
      this.$emit("setValue", this.list);
    },
    change(index, event) {
      this.list[index] = event.target.value;
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
