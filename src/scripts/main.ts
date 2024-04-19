import { createApp } from 'vue'
import App from '../App.vue'
import router from '../router'
import '../css/style.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'vue-toast-notification/dist/theme-sugar.css';
import "bootstrap"

const app = createApp(App)

app.use(router)

app.mount('#app')