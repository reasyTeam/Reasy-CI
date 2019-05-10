<template>
  <div class="h-100 wrapper">
    <div class="temp-wrapper" :class="{hide:!showProject}">
      <projects></projects>
      <i class="icon el-icon-arrow-left" title="收起" v-if="showProject" @click="showProject = false"></i>
      <i class="icon el-icon-arrow-right" title="张开" v-else @click="showProject = true">张开目录结构列表</i>
    </div>
    <div class="cfg-wrapper">
      <header class="clear-fix header">
        <div class="float-r tool-bar">
          <el-button plain size="small" @click="reset">重置</el-button>
          <!-- <el-button plain type="primary" size="small">预览</el-button> -->
          <el-button plain type="primary" size="small" @click="save">保存模板</el-button>
        </div>
      </header>
      <div class="h-100 config">
        <div class="config-aside h-100">
          <div class="pro-title">组件列表</div>
          <com-list :group="group"></com-list>
        </div>
        <div class="config-main h-100">
          <cfg-list :group="group" ref="configList"></cfg-list>
        </div>
        <div class="config-aside right h-100">
          <pro-list></pro-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
// import draggable from "vuedraggable";
import comList from "./pageitem/comList.vue";
import cfgList from "./pageitem/configList.vue";
import proList from "./pageitem/propertyList.vue";
import projects from "./pageitem/projects.vue";
import * as types from "@/store/types.js";

export default {
  data() {
    return {
      group: "component",
      showProject: true
    };
  },
  computed: {
    ...mapState({
      currentGroup: "currentGroup"
    }),
    ...mapState("components", ["cfgList"]),
    moduleId() {
      return this.$route.params.id;
    }
  },
  components: {
    cfgList,
    comList,
    projects,
    proList
  },
  methods: {
    ...mapActions("components", ["getComponents"]),
    ...mapMutations("components", [types.RESET_CFG_LIST]),
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
        this[types.RESET_CFG_LIST]();
      });
    },
    save() {
      // console.log(this.cfgList);
      this.$refs.configList.saveCfg();
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

.wrapper {
  display: flex;
  flex-wrap: nowrap;

  .temp-wrapper {
    width: 280px;
    position: relative;
    border-right: 1px solid $border-color;
    transition: width 0.4s;

    &.hide {
      width: 0px;
    }

    .icon {
      position: absolute;
      top: -1px;
      right: -1px;
      z-index: 4;
      width: 20px;
      border: 1px solid $border-color;
      padding: 6px 0;
      font-size: 14px;
      text-align: center;
      border-radius: 2px;
      background-color: #fff;
      cursor: pointer;
    }

    .el-icon-arrow-right {
      transform: translateX(100%);
    }
  }

  .cfg-wrapper {
    flex: 1;
    position: relative;
  }
}

.h-100 {
  background-color: #fff;
  position: relative;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  // box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid $border-color;
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

    &.right {
      width: 300px;
    }
  }

  .config-main {
    flex: 1;
    border: 1px solid $border-color;
    border-width: 0 1px;
    overflow: auto;
  }
}
</style>

