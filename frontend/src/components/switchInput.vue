<template>
  <span class="label-wrapper">
    <i class="icon el-icon-document" v-if="!fileData.children"></i>
    <input
      type="text"
      ref="input"
      v-model="fileData.label"
      maxlength="12"
      v-show="fileData.edit"
      @blur="blur"
    >
    <label v-show="!fileData.edit">{{fileData.label}}</label>
    <i v-show="!fileData.edit" class="el-icon-edit" @click.stop="showEdit"></i>
  </span>
</template>

<script>
export default {
  props: ["fileData"],
  updated() {
    if (this.fileData.edit) {
      //   this.$nextTick(() => {
      this.$refs.input.focus();
      //   });
    }
  },
  mounted() {
    if (this.fileData.edit) {
      //   this.$nextTick(() => {
      this.$refs.input.focus();
      //   });
    }
  },
  methods: {
    showEdit() {
      this.fileData.edit = true;
    },
    blur() {
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
  left: -16px;
  top: 0;
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
