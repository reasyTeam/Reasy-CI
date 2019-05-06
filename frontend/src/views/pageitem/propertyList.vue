<template>
  <div>
    <div class="pro-title">组件属性</div>
    <div class="cfg-content">
      <fgroup
        v-for="(val, key) in currentAttrs"
        :key="key+selected"
        :value="currentCfg[key]"
        :currentCfg="currentCfg"
        :option="val"
        :attr="key"
        @setValue="setValue"
      ></fgroup>
    </div>
    <fcolumn></fcolumn>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { deepClone } from "@/assets/lib.js";
import fgroup from "@/components/group.vue";
import fcolumn from "@/components/column.vue";
import * as types from "@/store/types.js";

export default {
  data() {
    this.clones = {};
    return {};
  },
  computed: {
    ...mapState("components", ["selected", "cfgList", "attrList"]),
    currentAttrs() {
      if (this.cfgList[this.selected] === undefined) {
        return {};
      }

      let name = this.cfgList[this.selected]["name"];

      if (!this.clones[name]) {
        this.clones[name] = deepClone(this.attrList[name]);
      }
      return this.clones[name];
    },
    currentCfg() {
      if (this.cfgList[this.selected] === undefined) {
        return {};
      }

      return this.cfgList[this.selected]["attrs"];
    }
  },
  watch: {
    // selected(newV, oldV) {}
  },
  methods: {
    ...mapMutations("components", [types.UPDATE_CFG_ATTR]),
    setValue(attr, value) {
      this[types.UPDATE_CFG_ATTR]({
        attr,
        value
      });
    }
  },
  components: { fgroup, fcolumn }
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

