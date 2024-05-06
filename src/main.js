import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import './assets/css/main.css';
import './firebase/init';

const app = createApp(App);
app.use(store);
app.mount("#app");

