<template>
  <div class="projects">
    <div class="group-title">项目目录结构</div>
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
      treeData: [
        {
          id: 1,
          label: "一级 1",
          edit: false,
          children: []
        },
        {
          id: 2,
          label: "一级 2",
          edit: false
        }
      ]
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
$padding-left: 12px;
$padding-top: 8px;
.projects {
  font-size: 14px;
}
.icon-btn {
  font-size: 16px;
  color: $main-color;
  margin: 0 6px;
}
.el-icon-delete {
  color: red;
}
.group-title {
  padding: $padding-top $padding-left;
  font-size: 13px;
}

.docs {
  padding: 0 12px;
}

.group-box {
  padding: 0 $padding-left $padding-top;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
}

.group-item {
  width: 50%;
  text-align: center;
  font-size: 12px;
  line-height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px;
  color: #333;
  box-sizing: border-box;

  a {
    background-color: #f4f6fc;
    display: block;
    cursor: move;
    border: 1px solid #f4f6fc;

    &:hover {
      border: 1px dashed #77bdff;
      color: #0db3a6;
    }
  }
}
</style>

