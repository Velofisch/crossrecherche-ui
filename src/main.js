import { createApp } from 'vue'
// import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import SearchBar from '@/components/SearchBar.vue'
import SearchResult from '@/components/SearchResult.vue'
import SearchResults from '@/components/SearchResults.vue'
import Tab from '@/components/Tab.vue'
import TabContent from '@/components/TabContent.vue'
import './index.css'

// const i18n = createI18n()

const app = createApp(App)

// app.use(i18n)
app.use(router)
app.component('SearchBar', SearchBar)
    .component('SearchResult', SearchResult)
    .component('SearchResults', SearchResults)
    .component('Tab', Tab)
    .component('TabContent', TabContent)

app.mount('#app')

