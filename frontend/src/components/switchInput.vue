<template>
  <span class="label-wrapper">
    <i class="icon el-icon-document" v-if="!fileData.children"></i>
    <i class="icon el-icon-caret-right" v-else-if="fileData.children.length === 0"></i>
    <input
      type="text"
      ref="input"
      v-model="fileData.label"
      maxlength="12"
      v-show="fileData.edit"
      @blur="blur"
      @keyup.enter="blur"
    >
    <label v-show="!fileData.edit">{{fileData.label}}</label>
    <i v-show="!fileData.edit" class="el-icon-edit" @click.stop="showEdit"></i>
  </span>
</template>

<script>
export default {
  props: ["fileData"],
  computed: {
    defaultData() {
      return this.fileData.children ? "folder" : "file";
    }
  },
  updated() {
    if (this.fileData.edit) {
      this.$refs.input.focus();
      this.$refs.input.select();
    }
  },
  mounted() {
    if (this.fileData.edit) {
      this.$refs.input.focus();
      this.$refs.input.select();
    }
  },
  methods: {
    showEdit() {
      this.fileData.edit = true;
    },
    blur() {
      if (this.fileData.label === "") {
        this.fileData.label = this.defaultData;
      }

      this.fileData.edit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.label-wrapper {
  position: relative;
}

.icon {
  position: absolute;
  left: -18px;
  font-size: 12px;
  top: 1px;
  color: #c0c4cc;
}

input {
  width: 80px;
  border: 0;
}
i {
  margin-right: 12px;
  color: $main-color;
}
</style>
