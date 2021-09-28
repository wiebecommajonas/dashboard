<template>
  <n-config-provider :theme="theme">
    <App class="app" />
  </n-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { darkTheme } from "naive-ui";
import { useOsTheme } from "vooks";
import App from "./App.vue";

export default defineComponent({
  name: "AppRoot",
  components: { App },
  setup() {
    const osTheme = useOsTheme();
    const theme = computed(() => (osTheme.value === "dark" ? darkTheme : null));

    return { theme };
  },
});
</script>
