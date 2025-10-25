import HomeView from '@/views/HomeView.vue'
import Operators from '@/views/Operators.vue'
import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/operators',
      name: 'operators',
      component: Operators
    }
  ],
})

export default router
