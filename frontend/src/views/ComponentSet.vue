<template>
  <div class="table-box">
    <el-collapse value="1">
      <el-collapse-item title="框架" name="1">
        <div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="openDialog('framework')"
          >新增</el-button>
          <el-table :data="frameData" style="width: 100%">
            <el-table-column prop="name" label="框架名"></el-table-column>
            <el-table-column prop="version" label="版本号"></el-table-column>
            <el-table-column prop="createdAt" label="创建日期"></el-table-column>
            <el-table-column float="right" width="200" label="操作">
              <template v-slot="scope">
                <el-button @click="editData(scope.row,'framework')" size="small">编辑</el-button>
                <el-button type="danger" @click="deleteData(scope.row, 'framework')" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-collapse value="1">
      <el-collapse-item title="组件库" name="1">
        <div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="openDialog('component')"
          >新增</el-button>
          <el-table :data="comData" style="width: 100%">
            <el-table-column prop="name" label="组件库"></el-table-column>
            <el-table-column prop="depedence_id" label="框架"></el-table-column>
            <el-table-column prop="description" label="备注"></el-table-column>
            <el-table-column prop="createdAt" label="创建日期"></el-table-column>
            <el-table-column fixed="right" width="200" label="操作">
              <template v-slot="scope">
                <el-button @click="editData(scope.row,'component')" size="small">编辑</el-button>
                <el-button type="danger" @click="deleteData(scope.row, 'component')" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="新增框架" :visible.sync="dialogFrameVisible">
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
        <el-button type="primary" @click="submitForm('framework')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增组件库" :visible.sync="dialogComVisible">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogComVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitForm('component')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
const TYPE = {
  FRAMEWORK: "framework",
  GROUP: "component"
};

export default {
  data() {
    var checkFrame = (rule, value, callback) => {
      let frames = this.frames,
        isEdit = !!this.frameForm.id || this.frameForm.id === 0;

      for (let i = 0, l = frames.length; i < l; i++) {
        if (frames[i].name === value) {
          if (isEdit && this.frameForm.id === frames[i].value) {
            return callback();
          }
          return callback(new Error("框架名称不能重复"));
        }
      }
    };

    var checkCom = (rule, value, callback) => {
      let comData = this.comData,
        isEdit = !!this.comForm.id || this.comForm.id === 0;

      for (let i = 0, l = comData.length; i < l; i++) {
        if (comData[i].name === value) {
          if (isEdit && this.comForm.id === comData[i].value) {
            return callback();
          }
          return callback(new Error("组件库名称不能重复"));
        }
      }
    };
    return {
      dialogFrameVisible: false,
      dialogComVisible: false,
      frameForm: {
        id: "",
        name: "",
        version: ""
      },
      comForm: {
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
        description: [
          { min: 0, max: 50, message: "长度在 0 到 50 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      frameData: "frameWorks"
    }),
    ...mapState("group", {
      comData: "comData"
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
    ...mapActions("group", ["getGroups"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === TYPE.FRAMEWORK) {
            this.frameForm.id
              ? this.updateFrameWorks(this.frameForm)
              : this.createFrameWorks(this.frameForm);
            this.dialogFrameVisible = false;
          } else {
            this.comForm.id
              ? this.updateFraks(this.frameForm)
              : this.createDepces(this.frameForm);
            this.dialogComVisible = false;
          }
        } else {
          this.$message({
            message: "请修正错误的项",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      if (!this.$refs[formName]) {
        return;
      }

      this.$refs[formName].resetFields();
    },
    fetchData(type) {
      if (type === TYPE.FRAMEWORK) {
        this.getFrameWorks();
      } else {
        this.getGroups();
      }
    },
    editData(data, type) {
      this.resetForm(type);
      if (type === TYPE.FRAMEWORK) {
        this.dialogFrameVisible = true;
        this.$nextTick(function() {
          this.frameForm.id = data.id;
          this.frameForm.name = data.name;
          this.frameForm.version = data.version;
        });
      } else {
        this.$nextTick(function() {
          this.comForm.id = data.id;
          this.comForm.name = data.name;
          this.comForm.description = data.description;
          this.comForm.depedence_id = data.depedence_id;
        });
        this.dialogComVisible = true;
      }
    },
    openDialog(formName) {
      this.resetForm(formName);
      if (formName === TYPE.FRAMEWORK) {
        this.frameForm.id = "";
        this.dialogFrameVisible = true;
      } else {
        this.comForm.id = "";
        this.dialogComVisible = true;
      }
    },
    deleteData(data, type) {
      if (type === TYPE.FRAMEWORK) {
        this.delDependences(data.id);
      } else {
      }
    }
  },
  created() {
    this.getFrameWorks();
    this.getGroups();
  }
};
</script>

<style lang="scss" scoped>
.table-box {
  border-radius: 4px;
  padding: 12px;
  max-width: 1200px;
  margin: 20px auto 0;
}

.table-box {
  background-color: $bg-color-light;
}
</style>
