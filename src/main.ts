import App from "./App.vue";
import router from "./router";
import initFont from "./helper/initFont";
import "uno.css";
import "./assets/css/global.scss";

initFont();

createApp(App).use(router).use(createPinia()).mount("#app");