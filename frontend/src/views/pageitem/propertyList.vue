<template>
  <div>
    <div class="pro-title">组件属性</div>
    <div class="cfg-content">
      <section class="cfg-item">
        <div class="cfg-title">标题</div>
        <div>内容部分</div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { deepClone } from "@/assets/lib.js";

export default {
  data() {
    return {
      attrs: {}
    };
  },
  clones: {},
  computed: {
    ...mapState("components", { selected: "selected", cfgList: "cfgList" }),
    ...mapGetters("components", { attrList: "attrList" }),
    currentAttr() {
      let name = this.cfgList[this.selected]["id"];

      if (!this.clones[name]) {
        this.attrs[name] = deepClone(this.attrList[name]);
      }
      return this.clones[name];
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
$padding-left: 12px;
$padding-top: 8px;
.cfg-content {
  padding: 0 $padding-left;
  font-size: 12px;
}

.cfg-item {
  border-bottom: 1px solid $border-color;
  margin-bottom: $padding-top;
  padding-bottom: $padding-top;
}

.cfg-title {
  font-weight: bold;
  font-size: 12px;
  padding: $padding-top 0;
}
</style>

