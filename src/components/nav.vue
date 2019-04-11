<template>
  <div class="navigator">
    <el-menu default-active="2" class="el-menu-vertical" active-text-color="#42b983" :router="true">
      <el-menu-item v-for="nav in navList" :key="nav.path" :index="nav.path">
        <i :class="'el-icon-'+ nav.icon"></i>
        <span slot="title">{{nav.text}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
        
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      navList: [
        {
          path: "/",
          text: "ReadMe",
          icon: "document"
        },
        {
          path: "/components",
          text: "组件管理1",
          icon: "printer"
        },
        {
          path: "/code",
          text: "代码生成",
          icon: "setting"
        },
        {
          path: "/modules",
          text: "模板管理",
          icon: "menu"
        },
        {
          path: "/others",
          text: "其它功能",
          icon: "more"
        }
      ]
    };
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #2c3e50;
}

.el-menu-item i {
  color: #2c3e50;
  font-size: 22px;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #e4f5ef;
}
</style>
