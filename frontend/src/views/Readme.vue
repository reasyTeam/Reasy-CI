<template>
  <div class="markdown-body" v-html="html"></div>
</template>

<script>
import md from "../../README.md";

export default {
  name: "home",
  data() {
    return {
      html: ""
    };
  },
  mounted() {
    this.html = md;
  }
};
</script>

<style lang="scss" scoped>
.markdown-body {
  padding: 32px;
}
</style>

