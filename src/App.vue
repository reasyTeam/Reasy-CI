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

<style>
html,
body {
  height: 100%;
}
body {
  background-color: #b4c7d0;
  font-size: 16px;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

::-webkit-scrollbar-thumb {
  background-color: #b4c7d0;
  border: 3px solid transparent;
  background-clip: padding-box;
  border-radius: 5px;
}
</style>
