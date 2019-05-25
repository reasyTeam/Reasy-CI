<template>
  <div class="h-100 wrapper">
    <!-- <div class="temp-wrapper" :class="{hide:!showProject}">
      <projects></projects>
      <i class="icon el-icon-arrow-left" title="收起" v-if="showProject" @click="showProject = false"></i>
      <i class="icon el-icon-arrow-right" title="张开" v-else @click="showProject = true">张开目录结构列表</i>
    </div>-->
    <div class="cfg-wrapper">
      <header class="clear-fix header">
        <div class="float-r tool-bar">
          <el-button plain size="small" @click="reset">重置</el-button>
          <el-button plain type="primary" size="small" @click="save">保存模板</el-button>
          <el-button plain type="primary" size="small" @click="generateCode">生成代码</el-button>
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
          <pro-list ref="proList"></pro-list>
        </div>
      </div>
    </div>

    <el-dialog
      title="友情提醒"
      :visible.sync="tipVisible"
      class="pop-dialog"
      :show-close="false"
      :before-close="() => false"
    >
      <div>请先创建组件库，再进行代码配置</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goToCom()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="创建模块" :visible.sync="visible" class="pop-dialog">
      <!-- <div class="el-form-item pop-form">
        <label class="el-form-item__label">是否创建项目</label>
        <div class="el-form-item__content">
          <el-switch v-model="needProject" active-text="创建" inactive-text="不创建"></el-switch>
        </div>
      </div>-->
      <el-form :model="frameForm" :rules="frameRules" ref="modules" class="pop-form">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="frameForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="frameForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
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
import { formatCode } from "@/assets/lib.js";
const REF_FORM = "modules";

export default {
  data() {
    var checkFrame = (rule, value, callback) => {
      let modules = this.modules,
        isEdit = !!this.frameForm.id || this.frameForm.id === 0,
        reg = new RegExp("^" + value + "$", "i");

      for (let i = 0, l = modules.length; i < l; i++) {
        if (
          this.currentGroup === modules[i].group_id &&
          reg.test(modules[i].name)
        ) {
          if (isEdit && this.frameForm.id === modules[i].value) {
            return callback();
          }
          return callback(new Error("模板名称不能重复"));
        }
      }
      callback();
    };
    return {
      group: "component",
      showProject: true,
      visible: false,
      // needProject: false,
      id: -1,
      frameForm: {
        group_id: -1,
        name: "",
        description: ""
      },
      frameRules: {
        name: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          },
          { validator: checkFrame, trigger: "blur" }
        ],
        description: [
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      currentGroup: "currentGroup"
    }),
    ...mapState("modules", ["modules"]),
    ...mapState("components", ["formConfig"]),
    moduleId() {
      return this.$route.params.id;
    },
    tipVisible() {
      return this.currentGroup === -1;
    }
  },
  components: {
    cfgList,
    comList,
    projects,
    proList
  },
  methods: {
    ...mapActions("components", [
      "getComponents",
      "updateModuleConfig",
      "getModuleConfig",
      "generate"
    ]),
    ...mapActions("modules", ["getModules"]),
    ...mapMutations("components", [
      types.RESET_CFG_LIST,
      types.RESET_DEFAULT_MODULE
    ]),
    ...mapMutations("modules", [types.RESET_TEMPLATE, types.SET_TEMPLATE]),
    ...mapMutations([types.SET_CUR_GROUP]),
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
        this.$refs.configList.getFormList();
      });
    },
    save() {
      // console.log(this.formConfig);
      this.$refs.configList.saveCfg();

      if (this.formConfig.sortArray.length === 0) {
        this.$message({
          type: "warning",
          message: "无任何需要保存项!"
        });
        return;
      }

      if (this.id === "default") {
        this.visible = true;
      } else {
        this.updateConfig();
      }
    },
    generateCode() {
      this.$refs.configList.saveCfg();
      if (this.formConfig.sortArray.length === 0) {
        this.$message({
          type: "warning",
          message: "无任何配置项!"
        });
        return;
      }

      let template = formatCode(
        this.$refs.proList.template,
        this.$refs.proList.formCfg
      );
      this.generate({
        id: this.id,
        template
      });
    },
    updateConfig() {
      this.updateModuleConfig({
        id: this.id,
        template: this.$refs.proList.template
      });
    },
    goToCom() {
      this.$router.push(`/components`);
    },
    submitForm() {
      this.$refs[REF_FORM].validate(valid => {
        this.frameForm.group_id = this.currentGroup;
        if (valid) {
          this.frameForm.group_id = this.currentGroup;
          this.$http.setData("createModule", this.frameForm).then(data => {
            this.id = data.id;
            this.updateConfig();

            this.visible = false;

            this.$message({
              type: "success",
              message: "模板添加成功!"
            });
            this.$router.push(`/code/${data.id}`);
          });
        } else {
          this.$message({
            message: "请修正错误的项",
            type: "error"
          });
          return false;
        }
      });
    },
    changeRouter(firstIn) {
      this.id = this.$route.params.id;
      if (this.id !== "add") {
        this.getModuleConfig({
          id: this.id,
          success: data => {
            this.$refs.configList.getFormList();
            this[types.SET_TEMPLATE](data.template);

            if (this.currentGroup === -1) {
              return;
            }
            if (firstIn) {
              this[types.SET_CUR_GROUP](data.groupId);
              this.getComponents({
                id: data.groupId
              });

              this.getModules();
            }
          }
        });
      } else {
        this.id = "default";
        this[types.RESET_DEFAULT_MODULE]();
        this[types.RESET_TEMPLATE]();
        this.$refs.configList.getFormList();
        if (this.currentGroup === -1) {
          return;
        }

        this.getComponents({
          id: this.currentGroup
        });

        this.getModules();
      }
    }
  },
  mounted() {
    this.changeRouter(true);
  },
  watch: {
    $route: "changeRouter"
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

