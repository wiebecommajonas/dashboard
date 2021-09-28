import { createApp } from "vue";
import AppRoot from "./app/AppRoot.vue";
import naive from "./plugins/native-ui";
import router from "@/router";

createApp(AppRoot).use(naive).use(router).mount("#app");
