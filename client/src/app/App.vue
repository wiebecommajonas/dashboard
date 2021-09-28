<template>
  <n-layout class="app">
    <n-layout-header bordered class="header">
      <AppHeader />
    </n-layout-header>
    <n-layout-content class="main">
      <router-view />
    </n-layout-content>
    <n-layout-footer bordered class="footer">
      <AppFooter />
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";

export default defineComponent({
  name: "App",
  components: { AppHeader, AppFooter },
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style scoped>
.app {
  position: absolute;
  height: 100%;
  width: 100%;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
}

.main {
  position: absolute;
  top: 120px;
  bottom: 50px;
  padding: 12px;
  left: 0;
  right: 0;
  height: 100%;
  overflow-y: auto;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
}
</style>
