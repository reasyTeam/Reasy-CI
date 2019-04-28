<template>
  <div class="markdown-body" v-html="html"></div>
</template>

<script>
import showdown from "showdown";
import md from "../../README.md";

export default {
  name: "home",
  data() {
    return {
      html: ""
    };
  },
  mounted() {
    let converter = new showdown.Converter();
    this.html = converter.makeHtml(md);
  }
};
</script>

<style lang="scss" scoped>
.markdown-body {
  padding: 32px;
}
</style>

