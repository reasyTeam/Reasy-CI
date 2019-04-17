<template>
  <div id="app">
    <home>
      <router-view></router-view>
    </home>
  </div>
</template>

<script>
import Home from "@/views/Home.vue";
import { mapMutations } from "vuex";

export default {
  name: "app",
  components: {
    Home
  },
  methods: {
    ...mapMutations(["setFWorks"]),
    fetchData() {
      this.$http.getData("", "getDependences").then(data => {
        data = data.map(item => {
          return { value: item.id, text: item.name };
        });
        this.setFWorks(data);
      });
    }
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: $font-color;
  height: 100%;
}
</style>
