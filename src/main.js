import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/main.css";
import "./firebase/init";

const app = createApp(App);
app.use(router);
app.mount("#app");
