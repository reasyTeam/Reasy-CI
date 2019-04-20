<template>
  <div class>
    <el-collapse value="1">
      <el-collapse-item title="框架" name="1">
        <div>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="openDialog()">新增</el-button>
          <el-table :data="frameData" style="width: 100%">
            <el-table-column prop="name" label="框架名"></el-table-column>
            <el-table-column prop="version" label="版本号"></el-table-column>
            <el-table-column prop="createdAt" label="创建日期"></el-table-column>
            <el-table-column float="right" width="200" label="操作">
              <template v-slot="scope">
                <el-button @click="editData(scope.row)" size="small">编辑</el-button>
                <el-button type="danger" @click="deleteData(scope.row)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="新增框架" :visible.sync="dialogFrameVisible" class="pop-dialog">
      <el-form :model="frameForm" :rules="frameRules" ref="framework" class="pop-form">
        <el-form-item label="框架名称" prop="name">
          <el-input v-model="frameForm.name"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="frameForm.version"></el-input>
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

const REF_FORM = "framework";

export default {
  data() {
    var checkFrame = (rule, value, callback) => {
      let frames = this.frames,
        isEdit = !!this.frameForm.id || this.frameForm.id === 0,
        reg = new RegExp("^" + value + "$", "i");

      for (let i = 0, l = frames.length; i < l; i++) {
        if (reg.test(frames[i].name)) {
          if (isEdit && this.frameForm.id === frames[i].value) {
            return callback();
          }
          return callback(new Error("框架名称不能重复"));
        }
      }
      callback();
    };

    return {
      dialogFrameVisible: false,
      frameForm: {
        id: "",
        name: "",
        version: ""
      },
      frameRules: {
        name: [
          { required: true, message: "请输入框架名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          },
          { validator: checkFrame, trigger: "blur" }
        ],
        version: [
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      frameData: "frameWorks"
    }),
    ...mapGetters(["frames"])
  },
  methods: {
    ...mapActions([
      "getFrameWorks",
      "delFrameWorks",
      "updateFrameWorks",
      "createFrameWorks"
    ]),
    submitForm() {
      this.$refs[REF_FORM].validate(valid => {
        if (valid) {
          this.frameForm.id
            ? this.updateFrameWorks(this.frameForm)
            : this.createFrameWorks(this.frameForm);
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
    resetForm() {
      if (!this.$refs[REF_FORM]) {
        return;
      }

      this.$refs[REF_FORM].resetFields();
    },
    editData(data) {
      this.resetForm();
      this.dialogFrameVisible = true;
      this.$nextTick(function() {
        this.frameForm.id = data.id;
        this.frameForm.name = data.name;
        this.frameForm.version = data.version;
      });
    },
    openDialog() {
      this.resetForm();
      this.frameForm.id = "";
      this.dialogFrameVisible = true;
    },
    deleteData(data) {
      this.delFrameWorks({ id: data.id });
    }
  },
  created() {
    this.getFrameWorks();
  }
};
</script>
