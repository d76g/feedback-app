import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import HomeView from '../views/Home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:app/feedback/',
      name: 'AppFeedback',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Feedback.vue'),
    },
  ],
})

export default router
