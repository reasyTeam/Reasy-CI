<template>
  <div class="h-100">
    <header class="clear-fix header">
      <div class="float-r tool-bar">
        <el-button plain size="small" @click="reset">重置</el-button>
        <el-button plain type="primary" size="small">预览</el-button>
        <el-button plain type="primary" size="small">保存</el-button>
      </div>
    </header>
    <div class="h-100 config">
      <div class="config-aside h-100">
        <div class="pro-title">组件列表</div>
        <com-list :group="group"></com-list>
      </div>
      <div class="config-main h-100">
        <cfg-list :cfgList="cfgList" :group="group"></cfg-list>
      </div>
      <div class="config-aside h-100">
        <pro-list></pro-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import draggable from "vuedraggable";
import comList from "./pageitem/comList.vue";
import cfgList from "./pageitem/configList.vue";
import proList from "./pageitem/propertyList.vue";

let idGlobal = 0;
export default {
  data() {
    return {
      group: "component",
      cfgList: []
    };
  },
  computed: {
    ...mapState({
      currentGroup: "currentGroup"
    })
  },
  components: {
    draggable,
    cfgList,
    comList,
    proList
  },
  methods: {
    ...mapActions("components", ["getComponents"]),
    reset() {
      this.$confirm("此操作将重置配置, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "重置成功!"
        });
        this.cfgList = [];
      });
    }
  },
  created() {
    this.getComponents({
      id: this.currentGroup
    });
  }
};
</script>

<style lang="scss" scoped>
$padding-left: 12px;
$padding-top: 8px;

.h-100 {
  background-color: #fff;
  position: relative;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.tool-bar {
  padding: 6px 24px;
}

.config {
  padding-top: 44px;
  display: flex;
  flex-wrap: nowrap;
  box-sizing: border-box;
  font-size: 14px;

  .h-100 {
    box-sizing: border-box;
  }

  .config-aside {
    width: 250px;
    overflow: auto;
  }

  .config-main {
    flex: 1;
    border: 1px solid #e0e0e0;
    border-width: 0 1px;
    overflow: auto;
  }
}
</style>

