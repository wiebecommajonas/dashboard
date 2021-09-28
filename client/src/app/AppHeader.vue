<template>
  <n-h1>Dashboard</n-h1>
  <n-space>
    <n-menu mode="horizontal" :options="menuOptions" />
  </n-space>
</template>

<script lang="ts">
import { h } from "vue";
import { defineComponent } from "@vue/runtime-core";
import { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const menuOptions: MenuOption[] = [
      { key: 0, label: () => h(RouterLink, { to: "/" }, "Home") },
      { key: 1, label: () => h(RouterLink, { to: "/about" }, "About") },
    ];

    return { menuOptions };
  },
});
</script>
