<template>
  <div>
    <el-collapse value="1">
      <el-collapse-item title="组件库" name="1">
        <div>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="openDialog()">新增</el-button>
          <el-table :data="comData" style="width: 100%">
            <el-table-column prop="name" label="组件库"></el-table-column>
            <el-table-column prop="depedence_id" label="框架"></el-table-column>
            <el-table-column prop="description" label="备注"></el-table-column>
            <el-table-column prop="createdAt" label="创建日期"></el-table-column>
            <el-table-column fixed="right" width="200" label="操作">
              <template v-slot="scope">
                <el-button @click="editData(scope.row)" size="small">编辑</el-button>
                <el-button type="danger" @click="deleteData(scope.row)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="新增组件库" :visible.sync="dialogComVisible" class="pop-dialog">
      <el-form :model="comForm" :rules="comRules" ref="component" class="pop-form">
        <el-form-item label="框架名称" prop="name">
          <el-input v-model="comForm.name"></el-input>
        </el-form-item>
        <el-form-item label="依赖的框架" prop="depedence_id">
          <el-select v-model="comForm.depedence_id" placeholder="请选择">
            <el-option
              v-for="item in frames"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input v-model="comForm.description"></el-input>
        </el-form-item>
        <el-form-item label="配置文件" prop="file_id">
          <el-upload
            class="upload-demo"
            action="/api/upload"
            :limit="1"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <el-tag>{{comForm.file_name||'未上传'}}</el-tag>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传js文件，且不超过500kb</div>
          </el-upload>
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
      let comData = this.comData,
        isEdit = !!this.comForm.id || this.comForm.id === 0,
        reg = new RegExp("^" + value + "$", "i");

      for (let i = 0, l = comData.length; i < l; i++) {
        if (reg.test(comData[i].name)) {
          if (isEdit && this.comForm.id === comData[i].value) {
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
        id: "",
        name: "",
        file_id: "",
        file_name: "",
        depedence_id: ""
      },
      comRules: {
        name: [
          { required: true, message: "请输入框架名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          },
          { validator: checkCom, trigger: "blur" }
        ],
        depedence_id: [
          { required: true, message: "请选择依赖的框架", trigger: "change" }
        ],
        description: [
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("group", {
      comData: "comData"
    }),
    ...mapGetters(["frames"])
  },
  methods: {
    ...mapActions("group", [
      "getGroups",
      "delGroups",
      "updateGroups",
      "createGroups"
    ]),
    submitForm() {
      this.$refs[REF_FORM].validate(valid => {
        if (valid) {
          this.comForm.id
            ? this.updateGroups(this.comForm)
            : this.createGroups(this.comForm);
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
        this.comForm.id = data.id;
        this.comForm.name = data.name;
        this.comForm.description = data.description;
        this.comForm.depedence_id = data.depedence_id;
      });
      this.dialogComVisible = true;
    },
    openDialog() {
      this.resetForm();

      this.comForm.id = "";
      this.dialogComVisible = true;
    },
    deleteData(data) {
      this.delGroups({ id: data.id });
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
    this.getGroups();
  }
};
</script>
