<template>
  <div class="projects">
    <h5 class="pro-title">项目目录结构</h5>
    <section class="docs">
      <el-button type="text" icon="el-icon-document-add" @click.stop="append(1)">添加文件</el-button>
      <el-button type="text" icon="el-icon-folder-add" @click.stop="append(2)">添加文件夹</el-button>
      <el-tree :data="treeData" node-key="id" expand-on-click-node highlight-current>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <s-input :fileData="data"></s-input>
          <span>
            <template v-if="data.children">
              <i
                class="icon-btn el-icon-document-add"
                title="添加文件"
                @click.stop="() => append(1, data)"
              ></i>
              <i
                class="icon-btn el-icon-folder-add"
                title="添加文件夹"
                @click.stop="() => append(2, data)"
              ></i>
            </template>
            <i class="icon-btn el-icon-delete" title="删除" @click.stop="() => remove(node, data)"></i>
          </span>
        </span>
      </el-tree>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import * as types from "@/store/types.js";
import sInput from "@/components/switchInput.vue";

export default {
  data() {
    return {
      treeData: []
    };
  },
  computed: {},
  components: { sInput },
  methods: {
    append(type, data) {
      if (data) {
        data = data.children;
      } else {
        data = this.treeData;
      }

      const newChild = {
        id: new Date().getTime() + "",
        edit: true
      };

      if (type === 1) {
        newChild.label = "file";
      } else {
        newChild.label = "folder";
        newChild.children = [];
      }

      data.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    showEdit(data) {
      data.edit = true;
    },
    blur(data) {
      data.edit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.projects {
  font-size: 14px;
  min-width: 250px;
}

.pro-title {
  text-align: left;
  margin: 0;
}

.icon-btn {
  font-size: 16px;
  color: $main-color;
  margin: 0 6px;
}

.el-icon-delete {
  color: red;
}

.docs {
  padding: 0 0 12px 12px;
}
</style>

