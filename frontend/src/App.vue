<template>
  <div id="app">
    <home>
      <router-view></router-view>
    </home>
  </div>
</template>

<script>
import Home from "@/views/Home.vue";

export default {
  name: "app",
  components: {
    Home
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
