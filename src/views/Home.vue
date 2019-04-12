<template>
  <div class="home">
    <el-container style="height: 100%;">
      <el-aside class="nav" style="width: 220px;">
        <div class="nav-title">
          <el-select v-model="currentFWork" class="nav-select" placeholder="请选择">
            <el-option
              v-for="item in frameWorks"
              :key="item.value"
              :label="item.text"
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
import { mapState, mapGetters } from "vuex";
import { mapMutations } from "vuex";
// @ is an alias to /src
import navBar from "@/components/nav.vue";

export default {
  name: "home",
  components: { navBar },
  data() {
    return {};
  },
  computed: {
    ...mapState(["frameWorks"]),
    ...mapGetters(["pathToTitle"]),
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
    ...mapMutations(["setFWork"])
  }
};
</script>

<style scoped>
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
  background: #bbe6d6;
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
  background-color: #e4f5ef;
}

.nav-select .el-input .el-input__inner {
  border: 0;
  background-color: #e4f5ef;
  border-radius: 30px;
}
</style>

