<template>
  <div class="navigator">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical"
      active-text-color="#42b983"
      :router="true"
    >
      <el-menu-item v-for="nav in pathList" :key="nav.path" :index="nav.path">
        <i :class="'el-icon-'+ nav.icon"></i>
        <span slot="title">{{nav.text}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
        
<script>
import { mapState } from "vuex";

export default {
  name: "navBar",
  computed: {
    ...mapState(["pathList"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.navigator {
  flex: 1;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px 0;
  box-sizing: border-box;
}

.el-menu-vertical {
  text-align: left;
}

.el-menu-item {
  font-size: 16px;
  color: $font-color;
}

.el-menu-item i {
  color: $font-color;
  font-size: 22px;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background-color: $bg-color-light;
}
</style>
