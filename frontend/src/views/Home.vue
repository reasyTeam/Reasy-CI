<template>
  <div class="home">
    <el-container style="height: 100%;">
      <el-aside class="nav" style="width: 220px;">
        <div class="nav-title">
          <el-select
            v-model="currentGroup"
            @change="changeGroup"
            class="nav-select"
            placeholder="请添加组件库"
          >
            <el-option
              v-for="item in groupNames"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <nav-bar></nav-bar>
      </el-aside>
      <el-container>
        <el-header class="header" height="68px">
          <div class="title">{{title}}</div>
        </el-header>
        <el-main class="content">
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import * as types from "@/store/types.js";

// @ is an alias to /src
import navBar from "@/components/nav.vue";

export default {
  name: "home",
  components: { navBar },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["pathToTitle", "groupNames"]),
    currentGroup: {
      get() {
        return this.$store.state.currentGroup;
      },
      set(value) {
        this.setCurGroup(value);
      }
    },
    title() {
      let path = this.$route.path;
      if (/\/code\//g.test(path)) {
        path = "/code/add";
      }
      return this.pathToTitle[path];
    }
  },
  methods: {
    ...mapMutations({
      setCurGroup: types.SET_CUR_GROUP
    }),
    changeGroup() {
      // 重新获取组件列表
      // this.getComponents({ id: this.currentGroup });
    },
    ...mapActions(["getGroups"]),
    ...mapActions("components", ["getComponents"])
  },
  watch: {
    currentGroup() {
      this.getComponents({ id: this.currentGroup });
    }
  },
  created() {
    this.getGroups();
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}

.nav {
  background: #fff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
}
.header {
  padding: 16px 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  z-index: 1;
  color: #1989fa;
  border-bottom: 1px solid $border-color;
}

.header .title {
  font-size: 28px;
  font-weight: lighter;
}

.nav-title {
  font-size: 16px;
  font-weight: lighter;
  padding: 0 16px;
  line-height: 60px;
  height: 60px;
  box-sizing: border-box;
}

.content {
  background-color: $bg-color;
  padding: 0;
}

.nav-select .el-input .el-input__inner {
  border: 0;
  background-color: $bg-color-light;
  border-radius: 30px;
}
</style>

