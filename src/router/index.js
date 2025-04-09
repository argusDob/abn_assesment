import { createRouter, createWebHistory } from 'vue-router'
import ShowsListView from '../views/ShowsListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'show-list-route',
      component: ShowsListView,
    },
    {
      path: '/show/:id',
      name: 'show-details-route',
      component: () => import('../views/ShowDetailsView.vue'),
    },
  ],
})

export default router
