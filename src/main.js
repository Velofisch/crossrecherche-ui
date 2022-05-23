import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import SearchBar from '@/components/SearchBar.vue'
import './index.css'

const i18n = createI18n()

const app = createApp(App)

app.use(i18n)
app.use(router)
app.component('SearchBar', SearchBar)

app.mount('#app')
