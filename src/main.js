import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/hojas-de-estilo/main.sass'
const app = createApp(App)

app.use(router)

app.mount('#app')
