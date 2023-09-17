import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/photo/:id',
      name: 'PhotoPage',
      component: () => import('../views/PhotoPage.vue')
    },
    {
      path: '/saved',
      name: 'SavedPhoto',
      component: () => import('../views/LikedPhoto.vue')
    }

  ]
})

export default router
