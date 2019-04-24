<template>
  <div>
    <el-collapse value="1" v-show="!!currentGroup || currentGroup === 0">
      <el-collapse-item title="组件实例" name="1">
        <div>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="openDialog()">新增</el-button>
          <el-table :data="components" style="width: 100%">
            <el-table-column prop="name" label="组件"></el-table-column>
            <el-table-column prop="title" label="组件名称"></el-table-column>
            <el-table-column prop="title" label="备注"></el-table-column>
            <el-table-column prop="isContainer" label="容器组件"></el-table-column>
            <el-table-column fixed="right" width="150" label="操作">
              <template v-slot="scope">
                <el-button @click="editData(scope.row)" size="small">编辑</el-button>
                <el-button type="danger" @click="deleteData(scope.row)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="新增组件" :visible.sync="dialogComVisible" class="pop-dialog">
      <el-form :model="comForm" :rules="comRules" ref="component" class="pop-form">
        <el-form-item label="组件" prop="name">
          <el-input v-model="comForm.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="组件名称" prop="title">
          <el-input v-model="comForm.title"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogComVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

const REF_FORM = "component";

export default {
  data() {
    let checkCom = (rule, value, callback) => {
      let components = this.components,
        isEdit = !!this.comForm.id || this.comForm.id === 0,
        reg = new RegExp("^" + value + "$", "i");

      for (let i = 0, l = components.length; i < l; i++) {
        if (reg.test(components[i].name)) {
          if (isEdit && this.comForm.id === components[i].id) {
            return callback();
          }
          return callback(new Error("组件库名称不能重复"));
        }
      }
      callback();
    };

    return {
      dialogComVisible: false,
      comForm: {
        name: "",
        title: ""
      },
      comRules: {
        title: [
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("components", {
      components: "components"
    }),
    ...mapState({
      currentGroup: "currentGroup"
    })
  },
  methods: {
    ...mapActions("components", [
      "getComponents",
      "delComponents",
      "updateComponents",
      "createComponents"
    ]),
    submitForm() {
      this.$refs[REF_FORM].validate(valid => {
        if (valid) {
          this.comForm.id
            ? this.updateComponents(this.comForm).finally(() => {
                this.getFrameWorks();
              })
            : this.createComponents(this.comForm).finally(() => {
                this.getFrameWorks();
              });
          this.dialogComVisible = false;
        } else {
          this.$message({
            message: "请修正错误的项",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm() {
      if (!this.$refs[REF_FORM]) {
        return;
      }

      this.$refs[REF_FORM].resetFields();
    },
    editData(data) {
      this.resetForm();
      this.$nextTick(function() {
        this.comForm.name = data.name;
        this.comForm.title = data.title;
      });
      this.dialogComVisible = true;
    },
    openDialog() {
      this.resetForm();
      this.comForm.name = "";
      this.dialogComVisible = true;
    },
    deleteData(data) {
      this.delComponents({ id: data.id }).finally(() => {
        this.getFrameWorks();
      });
    },
    handleAvatarSuccess(res) {
      this.comForm.file_id = res.filePath;
      this.comForm.file_name = res.fileName;
    },
    beforeAvatarUpload(file) {
      const isJS = file.type === "text/javascript";
      const isLess = file.size / 1024 < 500;

      if (!isJS) {
        this.$message.error("上传配置文件只能是 JS 格式!");
      }
      if (!isLess) {
        this.$message.error("上传配置文件大小不能超过 500kb!");
      }
      return isJS && isLess;
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
.el-upload {
  .el-input {
    width: 200px;
    margin-right: 22px;
  }
}
</style>
