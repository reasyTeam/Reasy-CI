<template>
  <div class="table-box">
    <div>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="openDialog()">新增</el-button>
      <el-table :data="modules" style="width: 100%">
        <el-table-column prop="name" label="模板名称"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="createdAt" label="创建日期"></el-table-column>
        <el-table-column float="right" width="300" label="操作">
          <template v-slot="scope">
            <el-button type="primary" @click="editData(scope.row)" size="small">编辑</el-button>
            <el-button
              type="primary"
              @click="$router.push({path:`/code/${scope.row.id}`})"
              size="small"
            >配置</el-button>
            <el-button type="danger" @click="deleteData(scope.row)" size="small">删除</el-button>
            <el-button
              type="success"
              v-if="scope.row.zip_url"
              size="small"
              @click="download(scope.row.zip_url, scope.row.name)"
            >下载代码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFrameVisible" class="pop-dialog">
      <el-form :model="frameForm" :rules="frameRules" ref="modules" class="pop-form">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="frameForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="frameForm.description"></el-input>
        </el-form-item>
        <el-form-item label="模板" prop="template" class="codeWrapper">
          <v-code :module-code="frameForm.template" @setCode="setCode"></v-code>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFrameVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import vCode from "@/components/codeEditor.vue";

const codeModules = {
  1: [/\{\{js\}\}/i, /\{\{html\}\}/i],
  2: [/\{\{js\}\}/i],
  3: [/\{\{js\}\}/i]
};

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
          if (isEdit && this.frameForm.id === modules[i].id) {
            return callback();
          }
          return callback(new Error("模板名称不能重复"));
        }
      }
      callback();
    };
    let chekcCode = (rule, value, callback) => {
      let check = codeModules[this.dependence];
      if (check) {
        for (let i = 0, l = check.length; i < l; i++) {
          if (!check[i].test(value)) {
            return callback(
              new Error(`缺少代码插入标签{{js}}}${l === 2 ? ", {{html}}" : ""}`)
            );
          }
        }
      }
      callback();
    };

    return {
      dialogFrameVisible: false,
      title: "",
      frameForm: {
        id: "",
        group_id: -1,
        name: "",
        url: "",
        template: "",
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
        template: [
          { required: true, message: "请填写模板", trigger: "blur" },
          { validator: chekcCode }
        ],
        description: [
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState(["groupTemplate"]),
    ...mapState("modules", ["modules"]),
    ...mapState(["currentGroup", "dependence"])
  },
  methods: {
    ...mapActions("modules", [
      "getModules",
      "delModules",
      "updateModules",
      "createModules"
    ]),
    submitForm() {
      this.$refs[REF_FORM].validate(valid => {
        this.frameForm.group_id = this.currentGroup;
        if (valid) {
          this.frameForm.id
            ? this.updateModules(this.frameForm)
            : this.createModules(this.frameForm);
          this.dialogFrameVisible = false;
        } else {
          this.$message({
            message: "请修正错误的项",
            type: "error"
          });
          return false;
        }
      });
    },
    setCode(value) {
      this.frameForm.template = value;
    },
    resetForm() {
      if (!this.$refs[REF_FORM]) {
        return;
      }

      this.$refs[REF_FORM].resetFields();
    },
    editData(data) {
      this.resetForm();
      this.title = "修改模板";
      this.dialogFrameVisible = true;
      this.$nextTick(function() {
        this.frameForm.id = data.id;
        this.frameForm.name = data.name;
        this.frameForm.template = data.template;
        this.frameForm.url = data.url;
        this.frameForm.description = data.description;
      });
    },
    openDialog() {
      if (this.currentGroup === -1) {
        this.$message({
          message: "请先添加组件库",
          type: "warning"
        });
        return;
      }
      this.resetForm();
      this.title = "新增模板";
      this.frameForm.id = "";
      this.frameForm.template = this.groupTemplate;
      this.dialogFrameVisible = true;
    },
    deleteData(data) {
      this.delModules({ id: data.id });
    },
    download(url, fileName) {
      this.$http.download({ url, fileName: fileName + ".zip", type: "module" });
    }
  },
  created() {
    this.getModules({
      group_id: this.currentGroup
    });
  },
  components: {
    vCode
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  border-radius: 4px;
  padding: 12px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>

