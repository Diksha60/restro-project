import { createApp } from 'vue'
import Router from './routes'
import App from './App.vue'
import store from './store'

createApp(App).use(store).use(Router).mount('#app')
