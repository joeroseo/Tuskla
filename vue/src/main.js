import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import router from "./router"
import store from "./store"
import '@fortawesome/fontawesome-free/css/all.css'

createApp(App).use(router).use(store).mount('#app')