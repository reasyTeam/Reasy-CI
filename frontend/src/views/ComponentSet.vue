<template>
  <div class="table-box">
    <el-collapse value="1">
      <el-collapse-item title="框架" name="1">
        <div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="dialogFrameVisible=true"
          >新增</el-button>
          <el-table :data="frameData" style="width: 100%">
            <el-table-column prop="name" label="框架名" width="280"></el-table-column>
            <el-table-column prop="version" label="版本号" width="280"></el-table-column>
            <el-table-column prop="date" label="日期" width="280"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
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
            @click="dialogComVisible=true"
          >新增</el-button>
          <el-table :data="comData" style="width: 100%">
            <el-table-column prop="name" label="组件库" width="280"></el-table-column>
            <el-table-column prop="dependence" label="框架" width="280"></el-table-column>
            <el-table-column prop="date" label="日期" width="280"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="新增框架" :visible.sync="dialogFrameVisible" width="40%">
      <el-form :model="frameForm" :rules="frameRules" ref="frameForm" label-width="100px">
        <el-form-item label="框架名称" prop="name">
          <el-input v-model="frameForm.name"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="name">
          <el-input v-model="frameForm.version"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('frameForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('frameForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增组件库" :visible.sync="dialogComVisible" width="40%">
      <el-form :model="comForm" :rules="comRules" ref="comForm" label-width="100px">
        <el-form-item label="框架名称" prop="name">
          <el-input v-model="comForm.name"></el-input>
        </el-form-item>
        <el-form-item label="依赖的框架" prop="name">
          <el-input v-model="comForm.version"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('comForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('comForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFrameVisible: false,
      dialogComVisible: false,
      frameData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "Vue",
          version: "V2.6.10"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "jQuery",
          version: "V1.13.10"
        }
      ],
      comData: [
        {
          id: 1,
          date: "2016-05-04",
          name: "Reasy-UI",
          dependence: "jQuery",
          version: "V1.1.0"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "Reasy-UI-Vue",
          dependence: "Vue",
          version: "V1.1.0"
        }
      ],
      frameForm: {
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
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ]
      },
      comRules: {
        name: [
          { required: true, message: "请输入框架名称", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFrameVisible = false;
      this.dialogComVisible = false;
    }
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
