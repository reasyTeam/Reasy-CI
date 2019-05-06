<template>
  <el-dialog title="配置属性" :visible.sync="visible" width="600px">
    <div>
      <fgroup
        v-for="(val, key) in itemOption"
        :key="key"
        :value="itemConfig[key]"
        :option="val"
        :attr="key"
        @setValue="setValue"
      ></fgroup>
    </div>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="cancel">取 消</el-button> -->
      <el-button type="primary" @click="hide">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import * as types from "@/store/types.js";
import fgroup from "@/components/group.vue";

export default {
  props: ["itemOption", "itemConfig"],
  computed: {
    ...mapState("itemConfig", ["dialogVisible"]),
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this[types.SET_DIALOG_VISIBLE](val);
      }
    }
  },
  methods: {
    ...mapMutations("itemConfig", [types.SET_DIALOG_VISIBLE]),
    hide() {
      this[types.SET_DIALOG_VISIBLE](false);
    },
    setValue(attr, value) {
      this.itemConfig[attr] = value;
      this.emit("setConfig");
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
