<template>
  <el-dialog title="配置属性" :visible.sync="visible" width="600px">
    <div>
      <fgroup
        v-for="(val, key) in itemOption"
        :key="key"
        :value="itemConfig[key]"
        :option="val"
        :currentCfg="itemConfig"
        :attr="key"
        :nowrap="true"
        @setValue="setValue"
      ></fgroup>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import * as types from "@/store/types.js";
import fgroup from "@/components/group.vue";
import { deepClone } from "@/assets/lib.js";

export default {
  data() {
    return {
      itemConfig: {},
      hasInit: false
    };
  },
  computed: {
    ...mapState("components/itemConfig", [
      "dialogVisible",
      "cfgAttr",
      "cfgIndex"
    ]),
    ...mapGetters("components/itemConfig", ["itemOption", "itemConfigs"]),
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this[types.SET_DIALOG_VISIBLE](val);
      }
    }
  },
  watch: {
    cfgIndex(newValue) {
      if (newValue !== -1) {
        let data = deepClone(this.itemConfigs[this.cfgIndex]);
        if (this.hasInit) {
          Object.assign(this.itemConfig, data);
        } else {
          this.hasInit = true;
          for (let key in data) {
            this.$set(this.itemConfig, key, data[key]);
          }
        }
      }
    }
  },
  methods: {
    ...mapMutations("components/itemConfig", [types.SET_DIALOG_VISIBLE]),
    ...mapMutations("components", [types.UPDATE_CFG_ATTR]),
    setValue(attr, value) {
      this.itemConfig[attr] = value;
    },
    hide() {
      this[types.SET_DIALOG_VISIBLE](false);
    },
    submit() {
      this.itemConfigs.splice(this.cfgIndex, 1, this.itemConfig);
      this[types.UPDATE_CFG_ATTR]({
        attr: this.cfgAttr,
        value: this.itemConfigs
      });
      this.hide();
    }
  },
  components: {
    fgroup
  }
};
</script>

<style lang="scss" scoped>
//
</style>
