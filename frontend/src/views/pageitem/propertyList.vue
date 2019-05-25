<template>
  <div class="pro-wrapper">
    <fcolumn></fcolumn>
    <!-- <div class="pro-title">组件属性</div> -->
    <el-tabs v-model="activeName" type="card" class="title-tab">
      <el-tab-pane label="属性配置" name="property"></el-tab-pane>
      <el-tab-pane label="页面配置" name="form"></el-tab-pane>
    </el-tabs>
    <div class="cfg-content" v-show="activeName === 'property'">
      <div v-if="selected === -1" class="empty-text">请选中组件，进行属性配置</div>
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
    <div class="cfg-content" v-show="activeName !== 'property'">
      <fgroup
        :value="template"
        :currentCfg="{}"
        :option="{title: '模板配置',valueType:'code'}"
        :attr="'template'"
        @setValue="setModule"
      ></fgroup>
      <h3>模板内置配置</h3>
      <fgroup
        v-for="(val, key) in formAttrs"
        :key="key+selected"
        :value="formCfg[key]"
        :currentCfg="formCfg"
        :option="val"
        :attr="key"
        @setValue="setModule"
      ></fgroup>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { deepClone, getAttrs } from "@/assets/lib.js";
import fgroup from "@/components/group.vue";
import fcolumn from "@/components/column.vue";
import * as types from "@/store/types.js";

export default {
  data() {
    this.clones = {};
    return {
      activeName: "property",
      template: "",
      formAttrs: {},
      formCfg: {}
    };
  },
  computed: {
    ...mapState(["groupTemplate"]),
    ...mapState("modules", { mTemplate: "template" }),
    ...mapState("components", [
      "selected",
      "cfgList",
      "attrList",
      "formConfig"
    ]),
    currentAttrs() {
      if (this.selected === -1) {
        return {};
      }
      let cfgList = this.formConfig.cfgList[this.selected];
      if (cfgList === undefined) {
        return {};
      }

      let name = cfgList["name"];

      if (!this.clones[name]) {
        this.clones[name] = deepClone(this.attrList[name]);
      }
      return this.clones[name];
    },
    currentCfg() {
      let cfgList = this.formConfig.cfgList[this.selected];
      if (cfgList === undefined) {
        return {};
      }

      return cfgList["attrs"];
    }
  },
  methods: {
    ...mapMutations("components", [types.UPDATE_CFG_ATTR]),
    setValue(attr, value) {
      this[types.UPDATE_CFG_ATTR]({
        attr,
        value
      });
    },
    setModule(attr, value) {
      if (attr === "template") {
        this.template = value;
        this.setObserve();
      } else {
        this.formCfg[attr] = value;
      }
    },
    setObserve() {
      let attrs = getAttrs(this.template);
      this.$set(this, "formAttrs", attrs);
      let data = {};
      for (let key in attrs) {
        data[key] = "";
      }
      this.$set(this, "formCfg", data);
    }
  },
  watch: {
    mTemplate(val) {
      this.template = val;
      this.setObserve();
    }
  },
  components: { fgroup, fcolumn },
  mounted() {
    this.template = this.mTemplate || this.groupTemplate;
    this.setObserve();
  }
};
</script>

<style lang="scss" scoped>
$padding-left: 12px;
$padding-top: 8px;
.cfg-content {
  padding: 0 $padding-left;
  font-size: 12px;
  height: 100%;
  overflow: auto;
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

.empty-text {
  padding: 34px 14px;
  text-align: center;
  color: $font-color;
}

.pro-wrapper {
  position: relative;
  padding-top: 40px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.title-tab {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>

