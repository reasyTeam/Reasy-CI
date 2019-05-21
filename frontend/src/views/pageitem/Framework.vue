<template>
  <div class>
    <el-collapse value="1">
      <el-collapse-item title="框架" name="1">
        <div>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="openDialog()">新增</el-button>
          <el-table :data="frameData" style="width: 100%">
            <el-table-column prop="name" label="框架名">
              <!-- <template slot-scope="scope">
                <div>{{ frameTypeObj[scope.row.name] }}</div>
              </template>-->
            </el-table-column>
            <el-table-column prop="version" label="版本号"></el-table-column>
            <el-table-column prop="createdAt" label="创建日期"></el-table-column>
            <el-table-column float="right" width="150" label="操作">
              <template v-slot="scope">
                <el-button @click="editData(scope.row)" type="primary" size="small">编辑</el-button>
                <el-button type="danger" @click="deleteData(scope.row)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-dialog :title="title" :visible.sync="dialogFrameVisible" class="pop-dialog">
      <el-form :model="frameForm" :rules="frameRules" ref="framework" class="pop-form">
        <el-form-item label="框架名称" prop="fileType">
          <el-select v-model="frameForm.fileType" placeholder="请选择">
            <el-option
              v-for="item in frameType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
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
      title: "",
      frameForm: {
        id: "",
        name: "",
        fileType: 1,
        version: ""
      },
      frameType: [
        { name: "Vue", value: 1 },
        { name: "jQuery", value: 2 },
        { name: "React", value: 3 }
      ],
      frameTypeObj: {
        1: "Vue",
        2: "jQuery",
        3: "React"
      },
      frameRules: {
        name: [
          { required: true, message: "请输入框架名称", trigger: "change" },
          { validator: checkFrame, trigger: "blur" }
        ],
        version: [
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("framework", {
      frameData: "frameWorks"
    }),
    ...mapGetters("framework", {
      frames: "frames"
    })
  },
  methods: {
    ...mapActions("framework", [
      "getFrameWorks",
      "delFrameWorks",
      "updateFrameWorks",
      "createFrameWorks"
    ]),
    ...mapActions(["getGroups"]),
    submitForm() {
      this.$refs[REF_FORM].validate(valid => {
        if (valid) {
          this.frameForm.name = this.frameTypeObj[this.frameForm.fileType];
          this.frameForm.id
            ? this.updateFrameWorks(this.frameForm).finally(() => {
                this.getGroups();
              })
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
      this.title = "修改框架";
      this.dialogFrameVisible = true;
      this.$nextTick(function() {
        this.frameForm.id = data.id;
        this.frameForm.name = data.name;
        this.frameForm.fileType = data.fileType;
        this.frameForm.version = data.version;
      });
    },
    openDialog() {
      this.resetForm();
      this.title = "新增框架";
      this.frameForm.id = "";
      this.dialogFrameVisible = true;
    },
    deleteData(data) {
      if (data.used > 0) {
        this.$message({
          message: "该框架正在被使用，不能被删除！",
          type: "error"
        });
        return false;
      }

      this.delFrameWorks({ id: data.id });
    }
  },
  created() {
    this.getFrameWorks();
  }
};
</script>
