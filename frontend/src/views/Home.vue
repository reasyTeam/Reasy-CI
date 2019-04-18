<template>
  <div class="home">
    <el-container style="height: 100%;">
      <el-aside class="nav" style="width: 220px;">
        <div class="nav-title">
          <el-select v-model="currentFWork" @change="log" class="nav-select" placeholder="请选择">
            <el-option
              v-for="item in frames"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <nav-bar></nav-bar>
      </el-aside>
      <el-container>
        <el-header class="header">
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
import { mapGetters, mapMutations } from "vuex";
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
    ...mapGetters(["pathToTitle", "frames"]),
    currentFWork: {
      get() {
        return this.$store.state.currentFWork;
      },
      set(value) {
        this.setFWork(value);
      }
    },
    title() {
      return this.pathToTitle[this.$route.path];
    }
  },
  methods: {
    ...mapMutations({
      setFWork: types.SET_CUR_FRAMEWORK
    }),
    log() {
      console.log(this.currentFWork);
    }
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
  padding: 16px;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 32px;
  z-index: 1;
  background: $bg-color;
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

