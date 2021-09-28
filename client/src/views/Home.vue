<template>
  <n-grid style="position: absolute; height: 100%">
    <n-gi span="5">
      <WeatherWidget />
    </n-gi>
    <n-gi>
      <n-text><p>Hallo</p></n-text>
    </n-gi>
    <n-gi span="2"></n-gi>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import WeatherWidget from "@/views/widgets/Weather.vue";

export default defineComponent({
  name: "Home",
  components: { WeatherWidget },
  setup() {
    return {};
  },
});
</script>
