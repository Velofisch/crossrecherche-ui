import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ImpressumView from "../views/ImpressumView.vue"
import DatenschutzView from "../views/DatenschutzView.vue"
import SearchResultsView from '../views/SearchResultsView.vue'
// import { getStartingLocale } from '@/i18n'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/impressum',
      name: 'impressum',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ImpressumView
    },
    {
      path: '/datenschutz',
      name: 'datenschutz',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DatenschutzView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchResultsView,
      props: true
    }
  ]
})

export default router
