import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css';
import './firebase/init';

const app = createApp(App);
app.mount("#app");

